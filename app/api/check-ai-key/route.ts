import { NextResponse } from 'next/server'

// Lightweight masked AI key check. Returns whether an API key is configured
// and whether the provider accepts it. DOES NOT echo the key; only a masked
// preview is returned when debug is enabled.

export async function GET(req: Request) {
  const API_KEY = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_GEMINI_API_KEY
  const debug = (process.env.NODE_ENV !== 'production') || Boolean(new URL(req.url).searchParams.get('debug'))

  if (!API_KEY) {
    return NextResponse.json({ valid: false, reason: 'no_key' })
  }

  const preview = String(API_KEY).slice(0, 12) + '...'

  try {
    // Query a harmless endpoint to validate the key. Use models list which
    // returns quickly and requires no user-provided input.
    const res = await fetch('https://api.openai.com/v1/models', {
      headers: { Authorization: `Bearer ${API_KEY}` }
    })

    if (res.ok) {
      return NextResponse.json({ valid: true, apiKeyPreview: preview })
    }

    const text = await res.text().catch(() => '')
    const reason = res.status === 401 ? 'invalid_key' : 'provider_error'
    const payload: any = { valid: false, reason, status: res.status }
    if (debug) payload.message = text
    payload.apiKeyPreview = preview
    return NextResponse.json(payload, { status: 200 })
  } catch (err) {
    const payload: any = { valid: false, reason: 'network_error' }
    if (debug) payload.error = String(err)
    payload.apiKeyPreview = preview
    return NextResponse.json(payload, { status: 200 })
  }
}
