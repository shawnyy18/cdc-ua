import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))
    const authHeader = request.headers.get('Authorization')

    const baseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    })

    let authedClient = null as any
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.replace('Bearer ', '')
      authedClient = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { headers: { Authorization: `Bearer ${token}` } }
      })
    }

    const adminClient = supabaseServiceKey
      ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false, autoRefreshToken: false } })
      : null

    const checkClient = authedClient || adminClient || baseClient

    let userId: string | null = null
    if (authedClient) {
      try {
        const { data } = await baseClient.auth.getUser(authHeader!.replace('Bearer ', ''))
        userId = data?.user?.id || null
      } catch {
        // ignore
      }
    }

    if (!userId && !adminClient) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    // Verify admin
    let scopeBarangayId: string | null = null
    if (userId) {
      const { data: userRow, error: userErr } = await checkClient
        .from('users')
        .select('id, is_admin, barangay_id, barangays(id, name, municipality)')
        .eq('id', userId)
        .maybeSingle()

      if (userErr) {
        console.error('[inventory-by-category] user lookup error', userErr)
        return NextResponse.json({ success: false, error: 'Unable to verify user' }, { status: 500 })
      }

      if (!userRow || !userRow.is_admin) {
        return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 })
      }

      // If the admin has a department (barangay_id in DB), restrict scope
      scopeBarangayId = userRow.barangay_id || null
    }

    const queryClient = adminClient || checkClient

    // Fetch donations minimally and aggregate in JS. We intentionally select only needed columns for performance.
    let donationsQuery = queryClient.from('donations').select('id, device_type, barangay_id, status')

    // If caller provided explicit department in the body (admin page filters), respect it only for IT Asset Managers
    if (body?.barangayId && !scopeBarangayId) {
      donationsQuery = donationsQuery.eq('barangay_id', body.barangayId)
    }

    // For department-scoped admin, enforce their department
    if (scopeBarangayId) donationsQuery = donationsQuery.eq('barangay_id', scopeBarangayId)

    const { data: donations, error } = await donationsQuery

    if (error) {
      console.error('[inventory-by-category] fetch donations error', error)
      return NextResponse.json({ success: false, error: 'Failed to load donations' }, { status: 500 })
    }

    // Aggregate: per-department -> device_type -> count; also overall totals
    const departmentMap: Record<string, any> = {}
    const totals: Record<string, number> = {}

    ;(donations || []).forEach((d: any) => {
      const bid = d.barangay_id || 'unknown'
      const dtype = String(d.device_type || 'unknown')

      if (!departmentMap[bid]) {
        departmentMap[bid] = { id: bid, categories: {}, total: 0 }
      }

      const b = departmentMap[bid]
      b.categories[dtype] = (b.categories[dtype] || 0) + 1
      b.total += 1

      totals[dtype] = (totals[dtype] || 0) + 1
    })

    // If IT Asset Manager (no department scope) enrich department names
    if (!scopeBarangayId) {
      const departmentIds = Object.keys(departmentMap).filter((id) => id !== 'unknown')
      if (departmentIds.length > 0) {
        const { data: departments, error: bErr } = await queryClient.from('barangays').select('id, name, municipality').in('id', departmentIds)
        if (!bErr && Array.isArray(departments)) {
          departments.forEach((b: any) => {
            if (departmentMap[b.id]) {
              departmentMap[b.id].name = b.name
              departmentMap[b.id].municipality = b.municipality
            }
          })
        }
      }
    } else {
      // For local admin, try to include department name from user's row
      try {
        const { data: bRow } = await queryClient.from('barangays').select('id, name, municipality').eq('id', scopeBarangayId).maybeSingle()
        if (bRow && departmentMap[scopeBarangayId]) {
          departmentMap[scopeBarangayId].name = bRow.name
          departmentMap[scopeBarangayId].municipality = bRow.municipality
        }
      } catch (e) {
        // ignore
      }
    }

    // Prepare response
    const departments = Object.values(departmentMap)

    // If local admin return only one department object to keep client simple
    if (scopeBarangayId) {
      return NextResponse.json({ success: true, department: departments[0] || { id: scopeBarangayId, categories: {}, total: 0 }, totals })
    }

    return NextResponse.json({ success: true, departments, totals })
  } catch (err) {
    console.error('[inventory-by-category] unexpected error', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
