import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, email, password, fullName, username, phone, provider } = body

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    switch (action) {
      case 'register':
        console.log('📝 Registration attempt:', { email, username, fullName })
        
        if (!email || !password || !fullName || !username) {
          console.log('❌ Missing required fields')
          return NextResponse.json(
            { error: 'All fields are required', success: false },
            { status: 400 }
          )
        }

        // Check if username already exists
        console.log('🔍 Checking if username exists:', username)
        const { data: existingUsername, error: usernameCheckError } = await supabase
          .from('users')
          .select('username')
          .eq('username', username.trim())
          .single()

        if (usernameCheckError && usernameCheckError.code !== 'PGRST116') {
          // PGRST116 means no rows found, which is good
          console.error('Error checking username:', usernameCheckError)
        }

        if (existingUsername) {
          console.log('❌ Username already exists')
          return NextResponse.json(
            { error: 'Username already exists. Please choose a different username.', success: false },
            { status: 400 }
          )
        }

        // Sign up user
        console.log('🔐 Creating auth user...')
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password: password,
          options: {
            data: {
              full_name: fullName.trim(),
              username: username.trim(),
              phone: phone?.trim() || ''
            }
          }
        })

        if (signUpError) {
          console.error('❌ Auth signup error:', signUpError)
          return NextResponse.json(
            { error: signUpError.message, success: false },
            { status: 400 }
          )
        }

        if (!signUpData.user) {
          console.error('❌ No user returned from signup')
          return NextResponse.json(
            { error: 'Failed to create user account', success: false },
            { status: 400 }
          )
        }

        console.log('✅ Auth user created:', signUpData.user.id)

        // Wait a moment for the database trigger to create the user profile
        await new Promise(resolve => setTimeout(resolve, 500))

        // Always ensure user profile exists, using admin client if needed
        let userProfile = null
        let profileCheckError = null
        try {
          const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', signUpData.user.id)
            .maybeSingle()
          userProfile = data
          profileCheckError = error
        } catch (err) {
          profileCheckError = err
        }

        if (!userProfile && supabaseServiceKey) {
          // Use admin client to create profile if missing
          const adminClient = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
              autoRefreshToken: false,
              persistSession: false
            }
          })
          const userProfileData = {
            id: signUpData.user.id,
            email: signUpData.user.email,
            full_name: fullName.trim(),
            username: username.trim(),
            phone: phone?.trim() || null,
            bio: '',
            location: '',
            interests: [],
            profile_image_url: '',
            is_public: true,
            is_seller: false,
            is_active: true,
            eco_points: 0,
            total_donations: 0,
            total_co2_saved: 0,
            donated_devices: 0,
            recycled_devices: 0
          }
          const { data: insertData, error: insertError } = await adminClient
            .from('users')
            .insert(userProfileData)
            .select()
            .maybeSingle()
          if (!insertError && insertData) {
            userProfile = insertData
            console.log('✅ User profile created manually:', insertData.id)
          }
        }
        if (userProfile) {
          console.log('✅ User profile exists:', userProfile.id)
        } else {
          console.error('❌ User profile creation failed:', profileCheckError)
        }
        
        return NextResponse.json({
          success: true,
          message: 'Registration successful! Please check your email to verify your account.',
          user: signUpData.user,
          profile: userProfile
        })

      case 'login':
        if (!email || !password) {
          return NextResponse.json(
            { error: 'Email and password are required', success: false },
            { status: 400 }
          )
        }

        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password
        })

        if (signInError) {
          return NextResponse.json(
            { error: signInError.message, success: false },
            { status: 400 }
          )
        }

        if (!signInData.user || !signInData.session) {
          return NextResponse.json(
            { error: 'Login failed - no session created', success: false },
            { status: 400 }
          )
        }

        // Ensure user profile exists, using admin client if needed
        let existingUser = null
        try {
          const { data } = await supabase
            .from('users')
            .select('id')
            .eq('id', signInData.user.id)
            .maybeSingle()
          existingUser = data
        } catch {}
        if (!existingUser && supabaseServiceKey) {
          const adminClient = createClient(supabaseUrl, supabaseServiceKey, {
            auth: {
              autoRefreshToken: false,
              persistSession: false
            }
          })
          await adminClient.from('users').insert({
            id: signInData.user.id,
            email: signInData.user.email,
            full_name: signInData.user.user_metadata?.full_name || '',
            username: signInData.user.user_metadata?.username || signInData.user.email?.split('@')[0] || 'user',
            phone: signInData.user.user_metadata?.phone || '',
            bio: '',
            location: '',
            interests: [],
            profile_image_url: '',
            is_public: true,
            eco_points: 0,
            total_donations: 0,
            total_co2_saved: 0,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
        }

        return NextResponse.json({
          success: true,
          message: 'Login successful!',
          user: signInData.user,
          session: signInData.session
        })

      case 'forgot-password':
        if (!email) {
          return NextResponse.json(
            { error: 'Email is required', success: false },
            { status: 400 }
          )
        }

        const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${request.headers.get('origin') || 'http://localhost:3000'}/reset-password`
        })

        if (resetError) {
          return NextResponse.json(
            { error: resetError.message, success: false },
            { status: 400 }
          )
        }

        return NextResponse.json({
          success: true,
          message: 'Password reset email sent! Please check your inbox.'
        })

      case 'social-login':
        if (!provider) {
          return NextResponse.json(
            { error: 'Provider is required for social login', success: false },
            { status: 400 }
          )
        }

        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: provider,
          options: {
            redirectTo: `${request.headers.get('origin') || 'http://localhost:3000'}/dashboard`
          }
        })

        if (error) {
          return NextResponse.json(
            { error: error.message, success: false },
            { status: 400 }
          )
        }

        return NextResponse.json({
          success: true,
          url: data.url
        })

      default:
        return NextResponse.json(
          { error: 'Invalid action specified', success: false },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Auth handler error:', error)
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 }
    )
  }
}
