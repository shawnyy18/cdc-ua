import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
        global: {
          headers: {
            cookie: cookieStore.toString(),
          },
        },
      }
    )

    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { points, reason, moduleId } = await request.json()

    if (!points || typeof points !== 'number') {
      return NextResponse.json(
        { error: 'Invalid points value' },
        { status: 400 }
      )
    }

    // Get current user data
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('eco_points')
      .eq('id', user.id)
      .single()

    if (userError) {
      console.error('Error fetching user:', userError)
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      )
    }

    const currentPoints = userData?.eco_points || 0
    const newPoints = currentPoints + points

    // Update user points
    const { error: updateError } = await supabase
      .from('users')
      .update({ eco_points: newPoints })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating points:', updateError)
      return NextResponse.json(
        { error: 'Failed to update points' },
        { status: 500 }
      )
    }

    // Log the activity (optional, but good for tracking)
    // You might want to create a separate table for point history if you haven't already
    
    return NextResponse.json({ 
      success: true, 
      newPoints,
      message: `Successfully added ${points} points` 
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
