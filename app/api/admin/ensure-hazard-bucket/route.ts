import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false, autoRefreshToken: false }
  }
)

export async function POST(request: NextRequest) {
  try {
    console.log('[ensure-hazard-bucket] Checking bucket and DB columns...')

    // 1. Ensure `hazard-media` bucket exists and is public
    const { data: buckets, error: bucketError } = await supabaseAdmin.storage.listBuckets()
    
    if (bucketError) {
      console.error('Failed to list buckets:', bucketError)
      return NextResponse.json({ error: 'Failed to check storage buckets', details: bucketError }, { status: 500 })
    }

    const hazardBucketExists = buckets?.some(b => b.name === 'hazard-media')

    if (!hazardBucketExists) {
      console.log('[ensure-hazard-bucket] Creating hazard-media bucket...')
      const { error: createBucketError } = await supabaseAdmin.storage.createBucket('hazard-media', {
        public: true,
        fileSizeLimit: 10485760, // 10MB
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
      })
      
      if (createBucketError) {
         console.error('Failed to create bucket:', createBucketError)
         return NextResponse.json({ error: 'Failed to create bucket', details: createBucketError }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, message: 'Hazard bucket verified/created' })
  } catch (error: any) {
    console.error('Init hazard bucket error:', error)
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 })
  }
}
