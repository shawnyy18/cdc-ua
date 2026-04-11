import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const sql = body?.sql
    const allowDestructive = !!body?.allowDestructive

    if (!sql || typeof sql !== 'string') {
      return NextResponse.json({ error: 'Missing sql in request body' }, { status: 400 })
    }

    // Require the caller to provide the Supabase Service Role key in a header.
    // This avoids storing the key on the server and keeps the operation explicit.
    const providedKey = req.headers.get('x-supabase-service-key')
    if (!providedKey) {
      return NextResponse.json({ error: 'Missing x-supabase-service-key header' }, { status: 401 })
    }

    // Very basic destructive check: if SQL contains DROP or TRUNCATE or DELETE without allowDestructive flag,
    // require explicit allowDestructive to be true
    const destructivePattern = /\b(DROP|TRUNCATE|DELETE|ALTER\s+TABLE\s+.+DROP)\b/i
    if (destructivePattern.test(sql) && !allowDestructive) {
      return NextResponse.json({ error: 'Destructive SQL detected. Resend with { allowDestructive: true } to proceed.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
    if (!supabaseUrl) {
      return NextResponse.json({ error: 'SUPABASE URL not configured on server' }, { status: 500 })
    }

    const client = createClient(supabaseUrl, providedKey)

    // Use the user's provided key to run the SQL via the exec_sql RPC that this project uses.
    // If your DB doesn't have exec_sql RPC, replace with your preferred safe executor.
    const { data, error } = await client.rpc('exec_sql', { sql })

    if (error) {
      return NextResponse.json({ error: error.message || error }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
