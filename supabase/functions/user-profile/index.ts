import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-user-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

const getAuthenticatedUser = async (supabaseClient: any, req: Request) => {
  try {
    const authHeader = req.headers.get('Authorization')
    const userIdHeader = req.headers.get('x-user-id')
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.replace('Bearer ', '')
        const anonClient = createClient(
          Deno.env.get('SUPABASE_URL')!,
          Deno.env.get('SUPABASE_ANON_KEY')!
        )
        
        const { data: { user }, error: userError } = await anonClient.auth.getUser(token)
        
        if (user && !userError) {
          return { user, error: null }
        }
      } catch (tokenError) {
        console.log('Token validation failed:', tokenError)
      }
    }
    
    if (userIdHeader) {
      try {
        const { data: userData, error: lookupError } = await supabaseClient
          .from('users')
          .select('*')
          .eq('id', userIdHeader)
          .single()
        
        if (userData && !lookupError) {
          return { 
            user: {
              id: userData.id,
              email: userData.email,
              user_metadata: {
                full_name: userData.full_name,
                username: userData.username,
                avatar_url: userData.profile_image_url
              }
            }, 
            error: null 
          }
        }
      } catch (lookupError) {
        console.log('User lookup failed:', lookupError)
      }
    }
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.replace('Bearer ', '')
        const payload = JSON.parse(atob(token.split('.')[1]))
        
        if (payload.sub) {
          const { data: userData, error: lookupError } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', payload.sub)
            .single()
          
          if (userData && !lookupError) {
            return { 
              user: {
                id: userData.id,
                email: userData.email,
                user_metadata: {
                  full_name: userData.full_name,
                  username: userData.username,
                  avatar_url: userData.profile_image_url
                }
              }, 
              error: null 
            }
          }
        }
      } catch (payloadError) {
        console.log('Token payload extraction failed:', payloadError)
      }
    }
    
    return { user: null, error: 'Authentication failed' }
    
  } catch (error) {
    console.error('Authentication error:', error)
    return { user: null, error: 'Authentication error' }
  }
}

const generateAchievements = (userStats: any) => {
  const achievements = []
  
  achievements.push({
    id: 'first-donation',
    title: 'First Steps',
    description: 'Made your first donation',
    icon: 'gift',
    earned: (userStats.total_donations || 0) >= 1,
    progress: (userStats.total_donations || 0) >= 1 ? 100 : 0,
    category: 'donation'
  })

  achievements.push({
    id: 'eco-warrior',
    title: 'Eco Warrior',
    description: 'Earned 100 eco points',
    icon: 'leaf',
    earned: (userStats.eco_points || 0) >= 100,
    progress: Math.min(((userStats.eco_points || 0) / 100) * 100, 100),
    category: 'points'
  })

  achievements.push({
    id: 'eco-champion',
    title: 'Eco Champion',
    description: 'Earned 500 eco points',
    icon: 'trophy',
    earned: (userStats.eco_points || 0) >= 500,
    progress: Math.min(((userStats.eco_points || 0) / 500) * 100, 100),
    category: 'points'
  })

  achievements.push({
    id: 'generous-giver',
    title: 'Generous Giver',
    description: 'Made 5 donations',
    icon: 'heart',
    earned: (userStats.total_donations || 0) >= 5,
    progress: Math.min(((userStats.total_donations || 0) / 5) * 100, 100),
    category: 'donation'
  })

  achievements.push({
    id: 'donation-hero',
    title: 'Donation Hero',
    description: 'Made 10 donations',
    icon: 'crown',
    earned: (userStats.total_donations || 0) >= 10,
    progress: Math.min(((userStats.total_donations || 0) / 10) * 100, 100),
    category: 'donation'
  })

  achievements.push({
    id: 'carbon-saver',
    title: 'Carbon Saver',
    description: 'Saved 50kg of CO₂',
    icon: 'cloud',
    earned: (userStats.total_co2_saved || 0) >= 50,
    progress: Math.min(((userStats.total_co2_saved || 0) / 50) * 100, 100),
    category: 'environment'
  })

  achievements.push({
    id: 'climate-protector',
    title: 'Climate Protector',
    description: 'Saved 100kg of CO₂',
    icon: 'shield',
    earned: (userStats.total_co2_saved || 0) >= 100,
    progress: Math.min(((userStats.total_co2_saved || 0) / 100) * 100, 100),
    category: 'environment'
  })

  achievements.push({
    id: 'tech-recycler',
    title: 'Tech Recycler',
    description: 'Recycled broken devices',
    icon: 'recycle',
    earned: (userStats.recycled_devices || 0) >= 1,
    progress: (userStats.recycled_devices || 0) >= 1 ? 100 : 0,
    category: 'device'
  })

  return achievements
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error', success: false }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

    let requestBody
    try {
      const bodyText = await req.text()
      if (!bodyText || bodyText.trim() === '') {
        return new Response(
          JSON.stringify({ error: 'Request body is required', success: false }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
      requestBody = JSON.parse(bodyText)
    } catch (parseError) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body', success: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { action } = requestBody

    switch (action) {
      case 'get-profile':
        try {
          const { user, error: authError } = await getAuthenticatedUser(supabaseClient, req)
          
          if (!user || authError) {
            return new Response(
              JSON.stringify({ 
                error: 'Authentication required', 
                success: false,
                requiresAuth: true
              }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // First check what columns exist in the users table
          const { data: userProfile, error: profileError } = await supabaseClient
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single()

          if (profileError && profileError.code !== 'PGRST116') {
            console.error('Profile fetch error:', profileError)
            
            // If user doesn't exist, create with basic data
            if (profileError.code === 'PGRST116') {
              const newUserData = {
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
                username: user.user_metadata?.username || user.email?.split('@')[0] || 'user',
                profile_image_url: user.user_metadata?.avatar_url || '',
                is_public: true,
                is_active: true,
                created_at: new Date().toISOString()
              }

              try {
                await supabaseClient.from('users').insert(newUserData)
                const userData = { ...newUserData, eco_points: 0, total_donations: 0, total_co2_saved: 0, donated_devices: 0, recycled_devices: 0 }
                return new Response(
                  JSON.stringify({
                    success: true,
                    user: userData,
                    achievements: generateAchievements(userData)
                  }),
                  { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                )
              } catch (insertError) {
                console.error('User creation error:', insertError)
              }
            }
            
            return new Response(
              JSON.stringify({ 
                error: 'Failed to fetch user profile', 
                success: false 
              }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Use real user data
          const userData = {
            id: userProfile.id,
            email: userProfile.email,
            full_name: userProfile.full_name || user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
            username: userProfile.username || user.user_metadata?.username || user.email?.split('@')[0] || 'user',
            phone: userProfile.phone || '',
            bio: userProfile.bio || '',
            location: userProfile.location || '',
            interests: userProfile.interests || [],
            profile_image_url: userProfile.profile_image_url || user.user_metadata?.avatar_url || '',
            is_public: userProfile.is_public !== false,
            is_seller: userProfile.is_seller || false,
            eco_points: userProfile.eco_points || 0,
            total_donations: userProfile.total_donations || 0,
            total_co2_saved: userProfile.total_co2_saved || userProfile.co2_saved || 0,
            donated_devices: userProfile.donated_devices || 0,
            recycled_devices: userProfile.recycled_devices || 0,
            is_active: userProfile.is_active !== false,
            created_at: userProfile.created_at || new Date().toISOString(),
            updated_at: userProfile.updated_at || new Date().toISOString()
          }

          const achievements = generateAchievements(userData)

          return new Response(
            JSON.stringify({
              success: true,
              user: userData,
              achievements: achievements
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )

        } catch (error) {
          console.error('Get profile error:', error)
          return new Response(
            JSON.stringify({ 
              error: 'Failed to retrieve user profile', 
              success: false 
            }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'get-leaderboard':
        try {
          // Get top users with only existing columns
          const { data: topUsers, error: leaderboardError } = await supabaseClient
            .from('users')
            .select('id, full_name, username, profile_image_url, eco_points, total_donations, total_co2_saved')
            .not('eco_points', 'is', null)
            .order('eco_points', { ascending: false })
            .limit(10)

          if (leaderboardError) {
            console.error('Leaderboard fetch error:', leaderboardError)
            return new Response(
              JSON.stringify({ 
                success: true,
                leaderboard: []
              }),
              { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          const leaderboard = (topUsers || []).map((user, index) => ({
            id: user.id,
            rank: index + 1,
            name: user.full_name || user.username || 'User',
            username: user.username || 'user',
            eco_points: user.eco_points || 0,
            total_donations: user.total_donations || 0,
            total_co2_saved: user.total_co2_saved || 0,
            profile_image_url: user.profile_image_url
          }))

          return new Response(
            JSON.stringify({
              success: true,
              leaderboard: leaderboard
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )

        } catch (error) {
          console.error('Get leaderboard error:', error)
          return new Response(
            JSON.stringify({ 
              success: true,
              leaderboard: []
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'update-profile':
        try {
          const { user, error: authError } = await getAuthenticatedUser(supabaseClient, req)
          
          if (!user || authError) {
            return new Response(
              JSON.stringify({ error: 'Authentication required', success: false }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          const { phone, bio, location, interests } = requestBody

          const updateData = {
            phone: phone || '',
            bio: bio || '',
            location: location || '',
            interests: interests || [],
            updated_at: new Date().toISOString()
          }

          const { error: updateError } = await supabaseClient
            .from('users')
            .update(updateData)
            .eq('id', user.id)

          if (updateError) {
            console.error('Profile update error:', updateError)
            return new Response(
              JSON.stringify({ error: 'Failed to update profile', success: false }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          return new Response(
            JSON.stringify({
              success: true,
              message: 'Profile updated successfully'
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )

        } catch (error) {
          console.error('Update profile error:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to update profile', success: false }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'update-profile-image':
        try {
          const { user, error: authError } = await getAuthenticatedUser(supabaseClient, req)
          
          if (!user || authError) {
            return new Response(
              JSON.stringify({ error: 'Authentication required', success: false }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          const { image_data } = requestBody

          if (!image_data) {
            return new Response(
              JSON.stringify({ error: 'Image data is required', success: false }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          const { error: updateError } = await supabaseClient
            .from('users')
            .update({ 
              profile_image_url: image_data,
              updated_at: new Date().toISOString()
            })
            .eq('id', user.id)

          if (updateError) {
            console.error('Profile image update error:', updateError)
            return new Response(
              JSON.stringify({ error: 'Failed to update profile image', success: false }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          return new Response(
            JSON.stringify({
              success: true,
              image_url: image_data,
              message: 'Profile image updated successfully'
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )

        } catch (error) {
          console.error('Update profile image error:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to update profile image', success: false }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action specified', success: false }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

  } catch (error) {
    console.error('Unexpected server error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        success: false
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})