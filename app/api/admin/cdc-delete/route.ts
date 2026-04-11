import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json().catch(() => ({ id: null }))

    if (!id) {
      return NextResponse.json({ success: false, error: 'Missing donation id' }, { status: 400 })
    }

    const authHeader = request.headers.get('Authorization')

    const baseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
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

    // Verify admin status
    const checkClient = adminClient || baseClient
    if (userId) {
      const { data: userRow, error: userErr } = await checkClient
        .from('users')
        .select('id, is_admin')
        .eq('id', userId)
        .maybeSingle()

      if (userErr) {
        console.error('[cdc-delete] user lookup error', userErr)
        return NextResponse.json({ success: false, error: 'Unable to verify user' }, { status: 500 })
      }

      if (!userRow || !userRow.is_admin) {
        return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 })
      }
    }

    // Use service role client to bypass RLS for delete
    const queryClient = adminClient || checkClient
    const { error, count } = await queryClient
      .from('donations')
      .delete({ count: 'exact' })
      .eq('id', id)
      .eq('is_cdc_asset', true)

    if (error) {
      console.error('[cdc-delete] delete error', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    if (count === 0) {
      return NextResponse.json({ success: false, error: 'Record not found or already deleted' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[cdc-delete] unexpected error', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
