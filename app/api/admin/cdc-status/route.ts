import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Disposition type → final status mapping
const DISPOSITION_MAP: Record<string, string> = {
  reallocate: 'reallocated',
  donate: 'donated',
  dispose: 'disposed',
  void: 'voided',
}

const VALID_STATUSES = ['pending_evaluation', 'reallocated', 'donated', 'disposed', 'voided']

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const { id, status, dispositionType, conditionOverride, notes } = body as {
      id?: string
      status?: string
      dispositionType?: string
      conditionOverride?: string
      notes?: string
    }

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing donation id' }, { status: 400 })
    }

    // Accept either a raw status or a dispositionType (preferred new flow)
    let finalStatus: string | null = null
    if (dispositionType) {
      finalStatus = DISPOSITION_MAP[dispositionType]
      if (!finalStatus) {
        return NextResponse.json(
          { success: false, error: `Invalid dispositionType. Must be one of: ${Object.keys(DISPOSITION_MAP).join(', ')}` },
          { status: 400 }
        )
      }
    } else if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return NextResponse.json(
          { success: false, error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` },
          { status: 400 }
        )
      }
      finalStatus = status
    } else {
      return NextResponse.json({ success: false, error: 'Missing status or dispositionType' }, { status: 400 })
    }

    const authHeader = request.headers.get('Authorization')

    const baseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })

    const adminClient = supabaseServiceKey
      ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false, autoRefreshToken: false } })
      : null

    // Authenticate user
    let userId: string | null = null
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      try {
        const { data } = await baseClient.auth.getUser(token)
        userId = data?.user?.id || null
      } catch {
        // ignore
      }
    }

    if (!userId && !adminClient) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    // Verify IT Asset Manager status
    const checkClient = adminClient || baseClient
    if (userId) {
      const { data: userRow, error: userErr } = await checkClient
        .from('users')
        .select('id, is_admin')
        .eq('id', userId)
        .maybeSingle()

      if (userErr) {
        console.error('[cdc-status] user lookup error', userErr)
        return NextResponse.json({ success: false, error: 'Unable to verify user' }, { status: 500 })
      }

      if (!userRow || !userRow.is_admin) {
        return NextResponse.json({ success: false, error: 'IT Asset Manager access required' }, { status: 403 })
      }
    }

    // Build update payload
    const queryClient = adminClient || checkClient
    const { data: targetDonation, error: targetDonationError } = await queryClient
      .from('donations')
      .select('id, device_type')
      .eq('id', id)
      .single()

    if (targetDonationError || !targetDonation) {
      return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 })
    }

    if (targetDonation.device_type === 'hazardous-consumables' && finalStatus !== 'disposed') {
      return NextResponse.json(
        { success: false, error: 'Hazardous submissions are locked to Dispose workflow' },
        { status: 400 }
      )
    }

    const updatePayload: Record<string, any> = {
      status: finalStatus,
      updated_at: new Date().toISOString(),
    }

    if (dispositionType) updatePayload.disposition_type = dispositionType
    if (notes) updatePayload.disposition_notes = notes
    if (conditionOverride && ['working', 'defective'].includes(conditionOverride)) {
      updatePayload.condition = conditionOverride === 'defective' ? 'broken' : 'working'
    }
    if (userId) {
      updatePayload.evaluated_by = userId
      updatePayload.evaluated_at = new Date().toISOString()
    }

    const { data, error } = await queryClient
      .from('donations')
      .update(updatePayload)
      .eq('id', id)
      .eq('is_cdc_asset', true)
      .select()
      .single()

    if (error) {
      console.error('[cdc-status] update error', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 })
    }

    // Recalculate eco stats — count reallocated + donated as "positive" dispositions
    if (data.user_id) {
      const { data: positiveDonations } = await queryClient
        .from('donations')
        .select('eco_points_earned, co2_saved')
        .eq('user_id', data.user_id)
        .in('status', ['reallocated', 'donated'])

      const totalEcoPoints = (positiveDonations || []).reduce((sum: number, d: any) => sum + (d.eco_points_earned || 0), 0)
      const totalCo2 = (positiveDonations || []).reduce((sum: number, d: any) => sum + (d.co2_saved || 0), 0)
      const totalDonations = (positiveDonations || []).length

      await queryClient
        .from('users')
        .update({
          eco_points: totalEcoPoints,
          total_co2_saved: Math.round(totalCo2 * 100) / 100,
          total_donations: totalDonations,
          updated_at: new Date().toISOString(),
        })
        .eq('id', data.user_id)

      console.log(`[cdc-status] Updated user ${data.user_id} eco_points to ${totalEcoPoints}`)
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    console.error('[cdc-status] unexpected error', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
