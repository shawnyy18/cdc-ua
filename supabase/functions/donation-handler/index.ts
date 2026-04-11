import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-user-id',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    console.log('🚀 BULLETPROOF DONATION HANDLER - Request received')
    
    // Get environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL')
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('❌ Missing environment variables')
      return new Response(
        JSON.stringify({ error: 'Server configuration error', success: false }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey)
    
    // Parse request body
    let body
    try {
      const bodyText = await req.text()
      body = JSON.parse(bodyText)
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError.message)
      return new Response(
        JSON.stringify({ error: 'Invalid JSON format', success: false }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { action } = body

    // Get user ID from header (simplified authentication)
    const userId = req.headers.get('x-user-id')
    
    if (!userId) {
      console.error('❌ No user ID provided')
      return new Response(
        JSON.stringify({ error: 'Authentication required', success: false }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log('✅ User ID:', userId)
    console.log('✅ Action:', action)

    switch (action) {
      case 'create-donation':
        try {
          const { donationData } = body
          
          if (!donationData) {
            return new Response(
              JSON.stringify({ error: 'Donation data required', success: false }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // Validate required fields
          if (!donationData.deviceCategory || !donationData.brand || !donationData.model || !donationData.condition) {
            return new Response(
              JSON.stringify({ error: 'Missing required fields', success: false }),
              { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          // CDC asset validation: propertyNumber and serialNumber are required when isCDCAsset is true
          if (donationData.isCDCAsset) {
            if (!donationData.propertyNumber?.trim()) {
              return new Response(
                JSON.stringify({ error: 'Property Number is required for CDC assets', success: false }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
              )
            }
            if (!donationData.serialNumber?.trim()) {
              return new Response(
                JSON.stringify({ error: 'Serial Number is required for CDC assets', success: false }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
              )
            }
          }

          // Calculate eco impact
          const deviceImpact = {
            'smartphone': { working: 75, broken: 35, co2Working: 8.5, co2Broken: 4.2 },
            'laptop': { working: 150, broken: 75, co2Working: 18.7, co2Broken: 9.4 },
            'tablet': { working: 90, broken: 45, co2Working: 11.3, co2Broken: 5.7 },
            'desktop': { working: 120, broken: 60, co2Working: 22.1, co2Broken: 11.1 },
            'appliance': { working: 60, broken: 30, co2Working: 7.8, co2Broken: 3.9 },
            'battery': { working: 25, broken: 15, co2Working: 3.2, co2Broken: 1.6 },
            'cable': { working: 15, broken: 8, co2Working: 1.5, co2Broken: 0.8 },
            'headphones': { working: 40, broken: 20, co2Working: 5.4, co2Broken: 2.7 }
          }

          const category = donationData.deviceCategory.toLowerCase()
          const impact = deviceImpact[category] || deviceImpact['smartphone']
          const isWorking = donationData.condition.toLowerCase() === 'working'
          
          const ecoPoints = isWorking ? impact.working : impact.broken
          const co2Saved = isWorking ? impact.co2Working : impact.co2Broken
          const isRecycled = !isWorking

          console.log('✅ Eco impact calculated:', { ecoPoints, co2Saved, isRecycled })

          // Ensure user exists in database
          const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('id', userId)
            .single()

          if (!existingUser) {
            console.log('Creating new user profile...')
            const { error: createUserError } = await supabase
              .from('users')
              .insert({
                id: userId,
                email: `user_${userId}@ecokonek.ph`,
                full_name: 'EcoKonek User',
                username: `user_${userId.slice(-8)}`,
                eco_points: 0,
                total_donations: 0,
                total_co2_saved: 0,
                donated_devices: 0,
                recycled_devices: 0,
                created_at: new Date().toISOString()
              })

            if (createUserError) {
              console.log('⚠️ User creation failed:', createUserError.message)
            } else {
              console.log('✅ New user created')
            }
          }

          // Create donation record
          const donationRecord = {
            user_id: userId,
            device_type: donationData.deviceCategory,
            brand: donationData.brand,
            model: donationData.model,
            condition: donationData.condition.toLowerCase(),
            description: donationData.description || '',
            year: donationData.year || null,
            drop_off_center: donationData.dropOffCenter || 'EcoKonek Central Hub',
            eco_points_earned: ecoPoints,
            co2_saved: co2Saved,
            is_cdc_asset: donationData.isCDCAsset || false,
            property_number: donationData.isCDCAsset ? donationData.propertyNumber?.trim() : null,
            serial_number: donationData.isCDCAsset ? donationData.serialNumber?.trim() : null,
            status: 'pending_evaluation',
            created_at: new Date().toISOString()
          }

          const { data: donation, error: donationError } = await supabase
            .from('donations')
            .insert(donationRecord)
            .select()
            .single()

          if (donationError) {
            console.error('❌ Donation creation failed:', donationError.message)
            return new Response(
              JSON.stringify({ error: 'Failed to create donation', success: false }),
              { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          console.log('✅ Donation created:', donation.id)

          // Update user stats
          try {
            const { data: currentUser } = await supabase
              .from('users')
              .select('eco_points, total_donations, total_co2_saved, donated_devices, recycled_devices')
              .eq('id', userId)
              .single()

            const currentStats = currentUser || {
              eco_points: 0,
              total_donations: 0,
              total_co2_saved: 0,
              donated_devices: 0,
              recycled_devices: 0
            }

            const updatedStats = {
              eco_points: (currentStats.eco_points || 0) + ecoPoints,
              total_donations: (currentStats.total_donations || 0) + 1,
              total_co2_saved: Math.round(((currentStats.total_co2_saved || 0) + co2Saved) * 100) / 100,
              donated_devices: isRecycled ? (currentStats.donated_devices || 0) : (currentStats.donated_devices || 0) + 1,
              recycled_devices: isRecycled ? (currentStats.recycled_devices || 0) + 1 : (currentStats.recycled_devices || 0),
              updated_at: new Date().toISOString()
            }

            const { error: updateError } = await supabase
              .from('users')
              .update(updatedStats)
              .eq('id', userId)

            if (updateError) {
              console.log('⚠️ Stats update failed:', updateError.message)
            } else {
              console.log('✅ User stats updated')
            }
          } catch (statsError) {
            console.log('⚠️ Stats update exception:', statsError.message)
          }

          // Prepare response
          const deviceName = `${donationData.brand} ${donationData.model}`
          const donationType = isRecycled ? 'recycled' : 'donated'
          
          const response = {
            success: true,
            deviceName: deviceName,
            ecoPoints: ecoPoints,
            co2Saved: co2Saved,
            donationType: donationType,
            destinationPath: isRecycled ? 'Recycling Center' : 'Community Donation',
            message: `${isRecycled ? 'Recycling' : 'Donation'} submitted successfully!`,
            donationId: donation.id
          }

          console.log('🎉 SUCCESS:', response)

          return new Response(
            JSON.stringify(response),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )

        } catch (createError) {
          console.error('❌ Create donation exception:', createError.message)
          return new Response(
            JSON.stringify({ error: 'Failed to process donation', success: false }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'get-donations':
        try {
          const { data: donations, error: donationsError } = await supabase
            .from('donations')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })

          if (donationsError) {
            console.error('❌ Get donations error:', donationsError.message)
            return new Response(
              JSON.stringify({ success: true, donations: [] }),
              { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }

          const formattedDonations = (donations || []).map(donation => ({
            id: donation.id,
            device_category: donation.device_type,
            brand: donation.brand,
            model: donation.model,
            condition: donation.condition,
            donation_type: donation.condition === 'broken' ? 'recycled' : 'donated',
            eco_points_earned: donation.eco_points_earned,
            co2_saved: donation.co2_saved,
            status: donation.status,
            created_at: donation.created_at,
            drop_off_center: donation.drop_off_center,
            is_cdc_asset: donation.is_cdc_asset || false,
            property_number: donation.property_number || null,
            serial_number: donation.serial_number || null
          }))

          return new Response(
            JSON.stringify({ success: true, donations: formattedDonations }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )

        } catch (getError) {
          console.error('❌ Get donations exception:', getError.message)
          return new Response(
            JSON.stringify({ success: true, donations: [] }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      case 'get-drop-off-centers':
        try {
          const fallbackCenters = [
            {
              id: 'ecokonek-central',
              name: 'EcoKonek Central Hub',
              location: 'Jose Abad Santos Avenue, San Fernando, Pampanga',
              address: 'Jose Abad Santos Avenue',
              city: 'San Fernando',
              phone: '+63 45 123 4567',
              email: 'central@ecokonek.ph',
              operating_hours: 'Mon-Sat 8AM-6PM'
            },
            {
              id: 'angeles-branch',
              name: 'EcoKonek Angeles Branch',
              location: 'MacArthur Highway, Angeles City, Pampanga',
              address: 'MacArthur Highway',
              city: 'Angeles City',
              phone: '+63 45 234 5678',
              email: 'angeles@ecokonek.ph',
              operating_hours: 'Mon-Fri 9AM-5PM'
            },
            {
              id: 'clark-branch',
              name: 'EcoKonek Clark Branch',
              location: 'Clark Freeport Zone, Angeles City, Pampanga',
              address: 'Clark Freeport Zone',
              city: 'Angeles City',
              phone: '+63 45 345 6789',
              email: 'clark@ecokonek.ph',
              operating_hours: 'Mon-Sun 9AM-7PM'
            }
          ]

          try {
            const { data: centers, error: centersError } = await supabase
              .from('drop_off_centers')
              .select('*')
              .order('name')

            if (!centersError && centers && centers.length > 0) {
              return new Response(
                JSON.stringify({ success: true, centers: centers }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
              )
            }
          } catch (dbError) {
            console.log('Using fallback centers due to DB error:', dbError.message)
          }

          return new Response(
            JSON.stringify({ success: true, centers: fallbackCenters }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )

        } catch (centersError) {
          console.error('❌ Get centers exception:', centersError.message)
          return new Response(
            JSON.stringify({ 
              success: true, 
              centers: [{
                id: 'ecokonek-central',
                name: 'EcoKonek Central Hub',
                location: 'Jose Abad Santos Avenue, San Fernando, Pampanga',
                operating_hours: 'Mon-Sat 8AM-6PM'
              }]
            }),
            { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action', success: false }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }

  } catch (error) {
    console.error('💥 CRITICAL ERROR:', error.message)
    console.error('Stack:', error.stack)
    
    return new Response(
      JSON.stringify({ 
        error: 'Service temporarily unavailable', 
        success: false,
        details: 'Please try again in a moment'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})