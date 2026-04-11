import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    const adminClient = createClient(supabaseUrl, serviceKey);

    const { data, error } = await adminClient
      .from('donations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(3);

    return NextResponse.json({ data, error });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
