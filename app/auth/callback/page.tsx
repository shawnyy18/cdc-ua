'use client';

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { saveUserToLocalStorage } from '@/lib/storage'
import { getPostLoginRedirect } from '@/lib/adminAuth'

export default function AuthCallbackPage() {
  const router = useRouter()
  const [message, setMessage] = useState('Finalizing sign-in...')

  useEffect(() => {
    let mounted = true

    const finalize = async () => {
      try {
        // Handle PKCE flow: if a code is present, exchange it for a session
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')
        const error_description = url.searchParams.get('error_description')
        const error_code = url.searchParams.get('error')
        
        console.log('[auth/callback] Current URL:', window.location.href)
        console.log('[auth/callback] Code present:', !!code)
        console.log('[auth/callback] Error in URL:', error_code, error_description)
        
        // Check for OAuth errors in the URL
        if (error_code) {
          throw new Error(`OAuth error: ${error_code}${error_description ? ` - ${error_description}` : ''}`)
        }
        
        if (code) {
          console.log('[auth/callback] Exchanging code for session...')
          const { data, error } = await supabase.auth.exchangeCodeForSession(code)
          if (error) {
            console.error('[auth/callback] Exchange error:', error)
            console.error('[auth/callback] Exchange error details:', {
              message: error.message,
              status: (error as any).status,
              code: (error as any).code
            })
            throw error
          }
          console.log('[auth/callback] Exchange successful:', !!data.session)
          console.log('[auth/callback] Session user:', data.session?.user?.email)
        }

        // After exchange or hash detection, read the current session
        const { data: { session } } = await supabase.auth.getSession()
        console.log('[auth/callback] Session retrieved:', !!session)
        
        if (!session) {
          console.warn('[auth/callback] No active session found')
          setMessage('No active session found. Redirecting to login...')
          setTimeout(() => router.replace('/login'), 1200)
          return
        }

        // Persist token/user for existing app APIs expecting localStorage values
        const accessToken = session.access_token
        const user = session.user
        console.log('[auth/callback] User ID:', user.id)
        console.log('[auth/callback] User email:', user.email)
        
        if (typeof window !== 'undefined') {
          localStorage.setItem('ecokonek_token', accessToken)
          const userData = {
            id: user.id,
            email: user.email,
            username: user.user_metadata?.username || user.email?.split('@')[0] || 'user',
            full_name: user.user_metadata?.full_name || ''
          }
          console.log('[auth/callback] Saving user data:', userData)
          saveUserToLocalStorage(userData)
        }

        // Determine where to go next (admin vs normal)
        const redirectPath = await getPostLoginRedirect(session.user.id)
        console.log('[auth/callback] Redirect path:', redirectPath)
        
        if (!mounted) return
        router.replace(redirectPath)
      } catch (err: any) {
        console.error('[auth/callback] Error finalizing OAuth:', err)
        console.error('[auth/callback] Error details:', {
          message: err.message,
          status: err.status,
          code: err.code
        })
        setMessage(`Sign-in failed: ${err.message || 'Unknown error'}. Redirecting to login...`)
        setTimeout(() => router.replace('/login'), 2500)
      }
    }

    finalize()
    return () => { mounted = false }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 border border-gray-100 text-center">
        <img src="/images/itd-logo.png" alt="Loading" className="w-20 h-20 object-contain mx-auto mb-4 animate-pulse" />
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  )
}
