'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { checkAdminAccess } from '@/lib/adminAuth'
import CDCDashboard from '@/components/Admin/CDCDashboard'

export default function CDCInventoryPage() {
  const router = useRouter()
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    async function verifyAdmin() {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return router.push('/login')

        const adminCheck = await checkAdminAccess(user.id)
        if (!adminCheck) return router.push('/dashboard')

        setIsCheckingAuth(false)
      } catch (err) {
        console.error('Error verifying admin:', err)
        router.push('/login')
      }
    }

    verifyAdmin()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Verifying access…</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏢</span>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CDC Asset Inventory</h1>
                <p className="text-sm text-gray-500">Clark Development Corporation — Internal Asset Surrender Tracker</p>
              </div>
            </div>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
          >
            ← Back to Admin
          </Link>
        </div>

        {/* CDC Dashboard Component */}
        <CDCDashboard />
      </div>
    </div>
  )
}
