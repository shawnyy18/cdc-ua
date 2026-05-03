import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Allowed form file names (whitelist to prevent arbitrary file access)
const ALLOWED_FORMS: Record<string, string> = {
  'waste_material_report': 'waste_material_report.pdf',
  'request_for_entry_to_cdc_warehouse': 'request_for_entry_to_cdc_warehouse.pdf',
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

    // 2. Verify the requesting user is an authenticated admin
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
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

    // Check admin access
    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('id, is_admin')
      .eq('id', user.id)
      .single()

    if (!userData?.is_admin) {
      return NextResponse.json(
        { success: false, error: 'Admin access required' },
        { status: 403 }
      )
    }

    // 3. Download the file from storage
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
          error: `Form template "${fileName}" has not been uploaded yet. Please upload it via the Supabase Dashboard > Storage > accountability_forms.`
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
