import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('Auth handler called with method:', req.method)
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error', success: false }),
        { 
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

    let requestBody
    try {
      const bodyText = await req.text()
      console.log('Raw request body:', bodyText)
      
      if (!bodyText || bodyText.trim() === '') {
        console.error('Empty request body')
        return new Response(
          JSON.stringify({ error: 'Request body is required', success: false }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
      }
      
      requestBody = JSON.parse(bodyText)
      console.log('Parsed request body:', requestBody)
    } catch (parseError) {
      console.error('JSON parsing error:', parseError)
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body', success: false }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!requestBody || typeof requestBody !== 'object') {
      console.error('Invalid request body structure:', requestBody)
      return new Response(
        JSON.stringify({ error: 'Request body must be a valid JSON object', success: false }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    if (!requestBody.action) {
      console.error('Missing action in request:', requestBody)
      return new Response(
        JSON.stringify({ error: 'Action parameter is required', success: false }),
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const { action, email, password, fullName, username, phone } = requestBody
    console.log('Processing action:', action, 'for email:', email)

    switch (action) {
      case 'register':
        try {
          console.log('Starting registration process...')
          
          // Validate required fields
          if (!email || !password || !fullName || !username) {
            console.error('Missing required registration fields')
            return new Response(
              JSON.stringify({ error: 'All fields are required', success: false }),
              { 
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }

          // Check if username already exists
          const { data: existingUsername } = await supabaseClient
            .from('users')
            .select('username')
            .eq('username', username.trim())
            .single()

          if (existingUsername) {
            console.log('Username already exists:', username)
            return new Response(
              JSON.stringify({ error: 'Username already exists. Please choose a different username.', success: false }),
              { 
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }

          // Sign up user
          console.log('Attempting to sign up user...')
          const { data: signUpData, error: signUpError } = await supabaseClient.auth.signUp({
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
            console.error('Signup error:', signUpError)
            return new Response(
              JSON.stringify({ error: signUpError.message, success: false }),
              { 
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }

          if (!signUpData.user) {
            console.error('No user returned from signup')
            return new Response(
              JSON.stringify({ error: 'Failed to create user account', success: false }),
              { 
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }

          console.log('User signed up successfully:', signUpData.user.id)

          // Create user profile in database
          const userProfileData = {
            id: signUpData.user.id,
            email: signUpData.user.email,
            full_name: fullName.trim(),
            username: username.trim(),
            phone: phone?.trim() || '',
            bio: '',
            location: '',
            interests: [],
            profile_image_url: '',
            is_public: true,
            eco_points: 0,
            total_donations: 0,
            co2_saved: 0,
            is_active: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }

          try {
            const { error: profileError } = await supabaseClient
              .from('users')
              .insert(userProfileData)

            if (profileError) {
              console.error('Profile creation error:', profileError)
              // Don't fail registration if profile creation fails
            } else {
              console.log('User profile created successfully')
            }
          } catch (profileErr) {
            console.error('Profile creation exception:', profileErr)
          }

          return new Response(
            JSON.stringify({ 
              success: true, 
              message: 'Registration successful! Please check your email to verify your account.',
              user: signUpData.user 
            }),
            { 
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )

        } catch (registerError) {
          console.error('Registration exception:', registerError)
          return new Response(
            JSON.stringify({ error: 'Registration failed. Please try again.', success: false }),
            { 
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

      case 'login':
        try {
          console.log('Starting login process for:', email)
          
          if (!email || !password) {
            console.error('Missing email or password')
            return new Response(
              JSON.stringify({ error: 'Email and password are required', success: false }),
              { 
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }

          console.log('Attempting sign in...')
          const { data: signInData, error: signInError } = await supabaseClient.auth.signInWithPassword({
            email: email.trim(),
            password: password
          })

          if (signInError) {
            console.error('Login error:', signInError)
            return new Response(
              JSON.stringify({ error: signInError.message, success: false }),
              { 
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }

          if (!signInData.user || !signInData.session) {
            console.error('No user or session returned from login')
            return new Response(
              JSON.stringify({ error: 'Login failed - no session created', success: false }),
              { 
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }

          console.log('Login successful, user ID:', signInData.user.id)

          // Ensure user profile exists
          try {
            const { data: existingUser } = await supabaseClient
              .from('users')
              .select('id')
              .eq('id', signInData.user.id)
              .single()

            if (!existingUser) {
              console.log('Creating missing user profile...')
              // Create profile if missing
              await supabaseClient
                .from('users')
                .insert({
                  id: signInData.user.id,
                  email: signInData.user.email,
                  full_name: signInData.user.user_metadata?.full_name || '',
                  username: signInData.user.user_metadata?.username || signInData.user.email?.split('@')[0] || 'user',
                  phone: signInData.user.user_metadata?.phone || '',
                  bio: '',
                  location: '',
                  interests: [],
                  profile_image_url: signInData.user.user_metadata?.avatar_url || '',
                  is_public: true,
                  eco_points: 0,
                  total_donations: 0,
                  co2_saved: 0,
                  is_active: true,
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                })
              console.log('User profile created')
            } else {
              console.log('User profile already exists')
            }
          } catch (profileErr) {
            console.error('Profile check/creation error:', profileErr)
            // Don't fail login if profile operations fail
          }

          console.log('Returning successful login response')
          return new Response(
            JSON.stringify({ 
              success: true, 
              message: 'Login successful!',
              user: signInData.user,
              session: signInData.session
            }),
            { 
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )

        } catch (loginError) {
          console.error('Login exception:', loginError)
          return new Response(
            JSON.stringify({ error: 'Login failed. Please try again.', success: false }),
            { 
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

      case 'forgot-password':
        try {
          console.log('Processing forgot password for:', email)
          
          if (!email) {
            return new Response(
              JSON.stringify({ error: 'Email is required', success: false }),
              { 
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }

          const { error: resetError } = await supabaseClient.auth.resetPasswordForEmail(email.trim(), {
            redirectTo: `${req.headers.get('origin') || 'http://localhost:3000'}/reset-password`
          })

          if (resetError) {
            console.error('Password reset error:', resetError)
            return new Response(
              JSON.stringify({ error: resetError.message, success: false }),
              { 
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }

          return new Response(
            JSON.stringify({ 
              success: true, 
              message: 'Password reset email sent! Please check your inbox.'
            }),
            { 
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )

        } catch (resetError) {
          console.error('Password reset exception:', resetError)
          return new Response(
            JSON.stringify({ error: 'Failed to send reset email. Please try again.', success: false }),
            { 
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

      case 'social-login':
        try {
          console.log('Processing social login for provider:', requestBody.provider)
          
          if (!requestBody.provider) {
            return new Response(
              JSON.stringify({ error: 'Provider is required for social login', success: false }),
              { 
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }

          const { data, error } = await supabaseClient.auth.signInWithOAuth({
            provider: requestBody.provider,
            options: {
              redirectTo: `${req.headers.get('origin') || 'http://localhost:3000'}/dashboard`
            }
          })

          if (error) {
            console.error('Social login error:', error)
            return new Response(
              JSON.stringify({ error: error.message, success: false }),
              { 
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
              }
            )
          }

          return new Response(
            JSON.stringify({ 
              success: true,
              url: data.url
            }),
            { 
              status: 200,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )

        } catch (socialError) {
          console.error('Social login exception:', socialError)
          return new Response(
            JSON.stringify({ error: 'Social login failed. Please try again.', success: false }),
            { 
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          )
        }

      default:
        console.error('Invalid action provided:', action)
        return new Response(
          JSON.stringify({ error: 'Invalid action specified', success: false }),
          { 
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        )
    }
  } catch (error) {
    console.error('Unexpected server error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error', success: false, details: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})