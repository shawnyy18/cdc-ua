import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}))

    // Create base client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Get auth header if present and build an authenticated client
    const authHeader = request.headers.get('Authorization')
    let authedClient = null
    let userId: string | null = null

    if (authHeader && authHeader.startsWith('Bearer ')) {
      authedClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: authHeader } }
      })

      // Try to fetch user
      try {
        const { data } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
        userId = (data as any)?.user?.id || null
      } catch (e) {
        // ignore
      }
    }

    // If body provides userId override, use it
    if (!userId && body?.userId) userId = body.userId

    // Collect diagnostics
    const diagnostics: any = { userId: userId || null }

    // Fetch follow rows for this user (if userId)
    if (userId) {
      const client = authedClient || supabase
      const { data: follows, error: followsErr } = await client
        .from('follows')
        .select('follower_id, following_id')
        .eq('follower_id', userId)
        .limit(100)

      diagnostics.follows = follows || []
      if (followsErr) diagnostics.followsError = String(followsErr)
    }

    // Call the RPC get_posts_with_like_details using the authed client if available
    try {
      const client = authedClient || supabase
      const { data: rpcPosts, error: rpcErr } = await client.rpc('get_posts_with_like_details')
      diagnostics.rpcError = rpcErr ? String(rpcErr) : null
      diagnostics.rpcSample = Array.isArray(rpcPosts) ? (rpcPosts as any[]).slice(0, 20).map(p => ({ id: p.id, author_id: p.author_id, created_at: p.created_at })) : rpcPosts
    } catch (e) {
      diagnostics.rpcError = String(e)
    }

    // Also fetch raw community_posts for comparison (only active)
    try {
      const { data: rawPosts, error: rawErr } = await supabase
        .from('community_posts')
        .select('id, user_id, created_at, is_active')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(50)

      diagnostics.rawPostsSample = rawPosts || []
      if (rawErr) diagnostics.rawPostsError = String(rawErr)
    } catch (e) {
      diagnostics.rawPostsError = String(e)
    }

    return NextResponse.json({ success: true, diagnostics })
  } catch (e) {
    console.error('[feed-check] Unexpected error', e)
    return NextResponse.json({ success: false, error: 'unexpected_error' }, { status: 500 })
  }
}
