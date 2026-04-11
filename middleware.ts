import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Normalize OAuth callback landings from providers/Supabase that may drop users on /
// or any path with ?code=...; always funnel to /auth/callback preserving params.
export function middleware(req: NextRequest) {
  const { nextUrl } = req
  const pathname = nextUrl.pathname
  const params = nextUrl.searchParams

  const hasOAuthParams = params.has('code') || params.has('error') || params.has('error_description')

  // If we have OAuth params but are on the wrong path, normalize to /auth/callback
  if (hasOAuthParams && pathname !== '/auth/callback') {
    const redirectUrl = new URL('/auth/callback', nextUrl.origin)
    params.forEach((value, key) => redirectUrl.searchParams.set(key, value))
    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  // Run on all routes to catch stray OAuth returns
  matcher: '/:path*',
}
