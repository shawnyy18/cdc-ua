'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { checkAdminAccess } from '@/lib/adminAuth'
import DepartmentLeaderboard from '@/components/Admin/DepartmentLeaderboard'
import RefreshButton from '@/components/Admin/RefreshButton'

function AdminLeaderboardPageContent() {
  const [isChecking, setIsChecking] = useState(true)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    let cancelled = false
    async function verify() {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (!session?.user) {
          router.push('/login')
          return
        }

        const check = await checkAdminAccess(session.user.id)
        if (!check.allowed) {
          router.push('/dashboard')
          return
        }

        if (!cancelled) setIsChecking(false)
      } catch (e) {
        console.error('admin access check failed', e)
        router.push('/login')
      }
    }
    verify()
    return () => { cancelled = true }
  }, [router])

  const from = typeof window !== 'undefined' && searchParams ? searchParams.get('from') : null

  function handleBack() {
    // Prefer browser history, fallback to `from` param, then to /admin
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
      return
    }
    if (from) {
      router.push(from)
      return
    }
    router.push('/admin')
  }

  if (isChecking) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-4">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border text-sm text-gray-700 hover:shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>

        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Department Leaderboard</h1>
          <div className="flex items-center gap-3">
            <RefreshButton />
          </div>
        </div>

        <DepartmentLeaderboard />
      </div>
    </div>
  )
}

export default function AdminLeaderboardPage() {
  return (
    <Suspense fallback={null}>
      <AdminLeaderboardPageContent />
    </Suspense>
  )
}
