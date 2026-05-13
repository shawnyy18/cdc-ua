import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Allowed form file names (whitelist to prevent arbitrary file access)
const ALLOWED_FORMS: Record<string, string> = {
  'waste_material_report': 'waste_material_report.pdf',
}

export async function GET(req: NextRequest) {
  try {
    // 1. Extract the form key from query params
    const { searchParams } = new URL(req.url)
    const formKey = searchParams.get('form')

    if (!formKey || !ALLOWED_FORMS[formKey]) {
      return NextResponse.json(
        { success: false, error: 'Invalid form identifier' },
        { status: 400 }
      )
    }

    // 2. Verify the requesting user is authenticated (any authenticated user)
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized — please log in to download forms.' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

    // Verify the token and get the user
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 401 }
      )
    }

    // 3. Download the file from storage (using service role — bypasses RLS)
    const fileName = ALLOWED_FORMS[formKey]
    const { data: fileData, error: downloadError } = await supabaseAdmin
      .storage
      .from('accountability_forms')
      .download(fileName)

    if (downloadError || !fileData) {
      console.error('Storage download error:', downloadError)
      return NextResponse.json(
        {
          success: false,
          error: `Form template "${fileName}" is not available yet. Please contact your IT Admin.`
        },
        { status: 404 }
      )
    }

    // 4. Return the file as a download
    const arrayBuffer = await fileData.arrayBuffer()

    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': fileData.type || 'application/pdf',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': String(arrayBuffer.byteLength),
      },
    })
  } catch (err: any) {
    console.error('Download form error:', err)
    return NextResponse.json(
      { success: false, error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
