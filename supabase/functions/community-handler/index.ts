// @ts-nocheck
// deno-lint-ignore-file
// Note: This is a Supabase Edge Function that runs on Deno. URL imports and the global `Deno`
// are valid in Deno but can appear as red lines inside a Node/Next.js workspace. We disable
// TypeScript checking here to avoid false positives in the editor. Runtime validation happens in Deno.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Helper function to safely parse JSON
const safeParseJSON = async (req: Request) => {
  try {
    return await req.json()
  } catch (error) {
    console.error('JSON parsing error:', error)
    return null
  }
}

// Authentication function
const getAuthenticatedUser = async (supabaseClient: any, authHeader: string | null) => {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { user: null, error: 'Invalid authorization header' }
  }

  try {
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token)
    
    if (userError || !user) {
      return { user: null, error: 'Authentication failed' }
    }

    return { user, error: null }
  } catch (error) {
    console.error('Authentication error:', error)
    return { user: null, error: 'Authentication failed' }
  }
}

// Initialize database tables if they don't exist
const initializeTables = async (supabaseClient: any) => {
  try {
    // Create community_posts table
    await supabaseClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS community_posts (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          content TEXT NOT NULL,
          likes_count INTEGER DEFAULT 0,
          comments_count INTEGER DEFAULT 0,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    // Create post_likes table
    await supabaseClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS post_likes (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(post_id, user_id)
        );
      `
    })

    // Create marketplace_items table
    await supabaseClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS marketplace_items (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          seller_id UUID REFERENCES users(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          original_price DECIMAL(10,2),
          category VARCHAR(100),
          condition VARCHAR(50),
          image_url TEXT,
          is_available BOOLEAN DEFAULT true,
          views_count INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    // Create seller_profiles table
    await supabaseClient.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS seller_profiles (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
          business_name VARCHAR(255),
          description TEXT,
          rating DECIMAL(3,2) DEFAULT 5.0,
          total_sales INTEGER DEFAULT 0,
          commission_rate DECIMAL(5,2) DEFAULT 5.0,
          is_verified BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    // Add is_seller column to users table if it doesn't exist
    await supabaseClient.rpc('exec_sql', {
      sql: `
        ALTER TABLE users 
        ADD COLUMN IF NOT EXISTS is_seller BOOLEAN DEFAULT false;
      `
    })

    console.log('Database tables initialized successfully')
  } catch (error) {
    console.error('Error initializing tables:', error)
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  let supabaseClient
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    supabaseClient = createClient(supabaseUrl, supabaseServiceKey)

    // Initialize tables on first run
    await initializeTables(supabaseClient)

    const requestBody = await safeParseJSON(req)
    if (!requestBody || !requestBody.action) {
      return new Response(
        JSON.stringify({ error: 'Invalid request format - action required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { action } = requestBody
    console.log('Processing community action:', action)

    switch (action) {
      case 'get-community-users':
        try {
          const authHeader = req.headers.get('Authorization')
          const { user, error: authError } = await getAuthenticatedUser(supabaseClient, authHeader)
          
          if (!user || authError) {
            return new Response(
              JSON.stringify({ error: 'Authentication required', success: false }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Get all community users with their stats
          const { data: users, error: usersError } = await supabaseClient
            .from('users')
            .select(`
              id, full_name, username, email, profile_image_url, bio, location,
              eco_points, total_donations, total_co2_saved, is_seller, is_public, created_at
            `)
            .eq('is_active', true)
            .eq('is_public', true)
            .order('eco_points', { ascending: false })

          if (usersError) {
            console.error('Users fetch error:', usersError)
          }

          return new Response(
            JSON.stringify({ 
              success: true,
              users: users || []
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        } catch (error) {
          console.error('Get community users error:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to fetch users', success: false }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'get-community-posts':
        try {
          const authHeader = req.headers.get('Authorization')
          const { user, error: authError } = await getAuthenticatedUser(supabaseClient, authHeader)
          
          if (!user || authError) {
            return new Response(
              JSON.stringify({ error: 'Authentication required', success: false }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Get posts with user information and like status
          const { data: posts, error: postsError } = await supabaseClient
            .from('community_posts')
            .select(`
              id, content, likes_count, comments_count, created_at,
              users!community_posts_user_id_fkey (
                id, full_name, username, profile_image_url, is_seller
              )
            `)
            .eq('is_active', true)
            .order('created_at', { ascending: false })
            .limit(50)

          if (postsError) {
            console.error('Posts fetch error:', postsError)
            return new Response(
              JSON.stringify({ success: true, posts: [] }),
              { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Check which posts the current user has liked
          const postIds = posts?.map(p => p.id) || []
          let userLikes = []
          
          if (postIds.length > 0) {
            const { data: likes } = await supabaseClient
              .from('post_likes')
              .select('post_id')
              .eq('user_id', user.id)
              .in('post_id', postIds)
            
            userLikes = likes?.map(l => l.post_id) || []
          }

          // Format posts with user like status
          const formattedPosts = posts?.map(post => ({
            id: post.id,
            content: post.content,
            likes_count: post.likes_count || 0,
            comments_count: post.comments_count || 0,
            created_at: post.created_at,
            user_id: post.users?.id,
            user_full_name: post.users?.full_name,
            user_username: post.users?.username,
            user_profile_image: post.users?.profile_image_url,
            user_is_seller: post.users?.is_seller || false,
            user_liked: userLikes.includes(post.id)
          })) || []

          return new Response(
            JSON.stringify({ 
              success: true,
              posts: formattedPosts
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        } catch (error) {
          console.error('Get community posts error:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to fetch posts', success: false }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'create-post':
        try {
          const authHeader = req.headers.get('Authorization')
          const { user, error: authError } = await getAuthenticatedUser(supabaseClient, authHeader)
          
          if (!user || authError) {
            return new Response(
              JSON.stringify({ error: 'Authentication required', success: false }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          const { content } = requestBody

          if (!content || !content.trim()) {
            return new Response(
              JSON.stringify({ error: 'Post content is required', success: false }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          if (content.length > 500) {
            return new Response(
              JSON.stringify({ error: 'Post content too long (max 500 characters)', success: false }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Create new post
          const { data: newPost, error: createError } = await supabaseClient
            .from('community_posts')
            .insert({
              user_id: user.id,
              content: content.trim(),
              likes_count: 0,
              comments_count: 0,
              is_active: true
            })
            .select()
            .single()

          if (createError) {
            console.error('Post creation error:', createError)
            return new Response(
              JSON.stringify({ error: 'Failed to create post', success: false }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          return new Response(
            JSON.stringify({ 
              success: true,
              post: newPost,
              message: 'Post created successfully'
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        } catch (error) {
          console.error('Create post error:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to create post', success: false }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'like-post':
        try {
          const authHeader = req.headers.get('Authorization')
          const { user, error: authError } = await getAuthenticatedUser(supabaseClient, authHeader)
          
          if (!user || authError) {
            return new Response(
              JSON.stringify({ error: 'Authentication required', success: false }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          const { postId } = requestBody

          if (!postId) {
            return new Response(
              JSON.stringify({ error: 'Post ID is required', success: false }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Check if user already liked this post
          const { data: existingLike } = await supabaseClient
            .from('post_likes')
            .select('id')
            .eq('post_id', postId)
            .eq('user_id', user.id)
            .single()

          if (existingLike) {
            // Unlike the post
            await supabaseClient
              .from('post_likes')
              .delete()
              .eq('post_id', postId)
              .eq('user_id', user.id)

            // Decrease likes count
            await supabaseClient
              .from('community_posts')
              .update({ 
                likes_count: supabaseClient.rpc('greatest', { val: 0, other: supabaseClient.raw('likes_count - 1') })
              })
              .eq('id', postId)
          } else {
            // Like the post
            await supabaseClient
              .from('post_likes')
              .insert({
                post_id: postId,
                user_id: user.id
              })

            // Increase likes count
            await supabaseClient
              .from('community_posts')
              .update({ 
                likes_count: supabaseClient.raw('likes_count + 1')
              })
              .eq('id', postId)
          }

          return new Response(
            JSON.stringify({ 
              success: true,
              liked: !existingLike,
              message: existingLike ? 'Post unliked' : 'Post liked'
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        } catch (error) {
          console.error('Like post error:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to like/unlike post', success: false }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'get-marketplace-items':
        try {
          const authHeader = req.headers.get('Authorization')
          const { user, error: authError } = await getAuthenticatedUser(supabaseClient, authHeader)
          
          if (!user || authError) {
            return new Response(
              JSON.stringify({ error: 'Authentication required', success: false }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Get marketplace items with seller information
          const { data: items, error: itemsError } = await supabaseClient
            .from('marketplace_items')
            .select(`
              id, title, description, price, original_price, category, condition,
              image_url, views_count, created_at,
              users!marketplace_items_seller_id_fkey (
                id, full_name, username, profile_image_url
              ),
              seller_profiles!seller_profiles_user_id_fkey (
                rating, total_sales
              )
            `)
            .eq('is_available', true)
            .order('created_at', { ascending: false })
            .limit(50)

          if (itemsError) {
            console.error('Marketplace items fetch error:', itemsError)
          }

          // Format items with seller information
          const formattedItems = items?.map(item => ({
            id: item.id,
            title: item.title,
            description: item.description,
            price: item.price,
            original_price: item.original_price,
            category: item.category,
            condition: item.condition,
            image_url: item.image_url,
            views_count: item.views_count || 0,
            created_at: item.created_at,
            seller_id: item.users?.id,
            seller_name: item.users?.full_name || item.users?.username,
            seller_image: item.users?.profile_image_url,
            seller_rating: item.seller_profiles?.rating || 5.0,
            seller_reviews: item.seller_profiles?.total_sales || 0
          })) || []

          return new Response(
            JSON.stringify({ 
              success: true,
              items: formattedItems
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        } catch (error) {
          console.error('Get marketplace items error:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to fetch marketplace items', success: false }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'become-seller':
        try {
          const authHeader = req.headers.get('Authorization')
          const { user, error: authError } = await getAuthenticatedUser(supabaseClient, authHeader)
          
          if (!user || authError) {
            return new Response(
              JSON.stringify({ error: 'Authentication required', success: false }),
              { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Check if user meets seller requirements
          const { data: userProfile } = await supabaseClient
            .from('users')
            .select('total_donations, eco_points, is_seller')
            .eq('id', user.id)
            .single()

          if (userProfile?.is_seller) {
            return new Response(
              JSON.stringify({ error: 'User is already a seller', success: false }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Basic requirements check (can be made more strict)
          const totalDonations = userProfile?.total_donations || 0
          const ecoPoints = userProfile?.eco_points || 0

          if (totalDonations < 1 || ecoPoints < 50) {
            return new Response(
              JSON.stringify({ 
                error: 'Minimum requirements not met. Need at least 1 donation and 50 eco points.',
                success: false 
              }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Update user to seller status
          const { error: updateError } = await supabaseClient
            .from('users')
            .update({ is_seller: true })
            .eq('id', user.id)

          if (updateError) {
            console.error('Seller update error:', updateError)
            return new Response(
              JSON.stringify({ error: 'Failed to update seller status', success: false }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Create seller profile
          const { error: profileError } = await supabaseClient
            .from('seller_profiles')
            .upsert({
              user_id: user.id,
              business_name: userProfile?.full_name || user.email?.split('@')[0],
              description: 'Trusted EcoKonek seller',
              rating: 5.0,
              total_sales: 0,
              commission_rate: 5.0,
              is_verified: true
            })

          if (profileError) {
            console.error('Seller profile creation error:', profileError)
          }

          return new Response(
            JSON.stringify({ 
              success: true,
              message: 'Congratulations! You are now a verified seller.'
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        } catch (error) {
          console.error('Become seller error:', error)
          return new Response(
            JSON.stringify({ error: 'Failed to process seller application', success: false }),
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
        error: 'Service temporarily unavailable', 
        success: false,
        details: error.message 
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})