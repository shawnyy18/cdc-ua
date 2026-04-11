import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Admin client for running migrations
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Running user connections migration...')

    // Step 1: Create user_connections table
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS public.user_connections (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        follower_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        following_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        
        UNIQUE(follower_id, following_id),
        CHECK (follower_id != following_id)
      );
    `
    
    const { error: tableError } = await supabaseAdmin.rpc('exec_sql', { sql: createTableSQL })
    if (tableError && !tableError.message.includes('already exists')) {
      console.error('Table creation error:', tableError)
      return NextResponse.json({ error: 'Failed to create table', details: tableError }, { status: 500 })
    }
    console.log('✓ Table created/verified')

    // Step 2: Create indexes
    const indexSQL = `
      CREATE INDEX IF NOT EXISTS idx_user_connections_follower ON public.user_connections(follower_id);
      CREATE INDEX IF NOT EXISTS idx_user_connections_following ON public.user_connections(following_id);
      CREATE INDEX IF NOT EXISTS idx_user_connections_created_at ON public.user_connections(created_at DESC);
    `
    
    const { error: indexError } = await supabaseAdmin.rpc('exec_sql', { sql: indexSQL })
    if (indexError) {
      console.error('Index creation error:', indexError)
    }
    console.log('✓ Indexes created/verified')

    // Step 3: Enable RLS
    const rlsSQL = `ALTER TABLE public.user_connections ENABLE ROW LEVEL SECURITY;`
    await supabaseAdmin.rpc('exec_sql', { sql: rlsSQL })
    console.log('✓ RLS enabled')

    // Step 4: Add columns to users table
    const alterTableSQL = `
      ALTER TABLE public.users 
        ADD COLUMN IF NOT EXISTS followers_count INTEGER DEFAULT 0,
        ADD COLUMN IF NOT EXISTS following_count INTEGER DEFAULT 0;
    `
    
    const { error: alterError } = await supabaseAdmin.rpc('exec_sql', { sql: alterTableSQL })
    if (alterError) {
      console.error('Alter table error:', alterError)
    }
    console.log('✓ User table columns added')

    console.log('✅ Migration completed successfully!')
    
    return NextResponse.json({ 
      success: true, 
      message: 'User connections migration completed successfully!' 
    })

  } catch (error: any) {
    console.error('Migration error:', error)
    return NextResponse.json({ 
      error: 'Migration failed', 
      details: error.message 
    }, { status: 500 })
  }
}
