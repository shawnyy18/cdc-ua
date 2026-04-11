import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Server runtime
export const runtime = 'nodejs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// POST handler: returns aggregated department metrics for admin users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))

    const authHeader = request.headers.get('Authorization')

    // Lightweight base client used to validate token
    const baseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: { persistSession: false, autoRefreshToken: false }
    })

    // Prepare optional clients
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

    // Determine a client to check admin status (prefer authed client so RLS honors auth.uid())
    const checkClient = authedClient || adminClient || baseClient

    // Get current user id from token if provided (best-effort)
    let userId: string | null = null
    if (authedClient) {
      try {
        const { data } = await baseClient.auth.getUser(authHeader!.replace('Bearer ', ''))
        userId = data?.user?.id || null
      } catch {
        // ignore
      }
    }

    // If no explicit user, still allow adminClient to run (service role), but require admin checking when possible
    if (!userId && !adminClient) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 })
    }

    // If we can check an actual user, verify they are admin
    if (userId) {
      const { data: userRow, error: userErr } = await checkClient
        .from('users')
        .select('id, is_admin')
        .eq('id', userId)
        .maybeSingle()

      if (userErr) {
        console.error('[department-leaderboard] user lookup error', userErr)
        return NextResponse.json({ success: false, error: 'Unable to verify user' }, { status: 500 })
      }

      if (!userRow || !userRow.is_admin) {
        return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 })
      }
    }

    // Use adminClient (service role) for the aggregation query when available so RLS won't block
    const queryClient = adminClient || checkClient

    // Fetch users joined to departments (stored in barangays table). Aggregate in JS.
    const { data: users, error } = await queryClient
      .from('users')
      .select('id, eco_points, total_donations, total_co2_saved, donated_devices, recycled_devices, barangay_id, barangays(id, name, municipality, is_active)')
      .eq('is_active', true)

    if (error) {
      console.error('[department-leaderboard] fetch users error', error)
      return NextResponse.json({ success: false, error: 'Failed to load data' }, { status: 500 })
    }

    // Group by department
    const groups: Record<string, any> = {}
    ;(users || []).forEach((u: any) => {
      const b = u.barangays
      if (!b || !b.id || !b.is_active) return
      const bid = b.id
      if (!groups[bid]) {
        groups[bid] = {
          id: bid,
          name: b.name,
          municipality: b.municipality || '',
          eco_points: 0,
          total_donations: 0,
          total_co2_saved: 0,
          donated_devices: 0,
          recycled_devices: 0,
          contributors: 0
        }
      }

      groups[bid].eco_points += Number(u.eco_points || 0)
      groups[bid].total_donations += Number(u.total_donations || 0)
      groups[bid].total_co2_saved += Number(u.total_co2_saved || 0)
      groups[bid].donated_devices += Number(u.donated_devices || 0)
      groups[bid].recycled_devices += Number(u.recycled_devices || 0)
      groups[bid].contributors += 1
    })

    const list = Object.values(groups)

    // Sort by eco_points desc (primary), then total_donations
    list.sort((a: any, b: any) => {
      if (b.eco_points !== a.eco_points) return b.eco_points - a.eco_points
      return b.total_donations - a.total_donations
    })

    // Limit to 6 departments (CDC departments)
    const top = list.slice(0, 6)

    // Compute relative percentages for UI (0-100)
    const maxPoints = top.reduce((m: number, x: any) => Math.max(m, x.eco_points || 0), 0) || 1
    const payload = top.map((x: any, i: number) => ({
      rank: i + 1,
      id: x.id,
      name: x.name,
      municipality: x.municipality,
      eco_points: x.eco_points,
      total_donations: x.total_donations,
      total_co2_saved: x.total_co2_saved,
      donated_devices: x.donated_devices,
      recycled_devices: x.recycled_devices,
      contributors: x.contributors,
      scorePercent: Math.round(((x.eco_points || 0) / maxPoints) * 100)
    }))

    return NextResponse.json({ success: true, leaderboard: payload })
  } catch (err) {
    console.error('[department-leaderboard] unexpected error', err)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
