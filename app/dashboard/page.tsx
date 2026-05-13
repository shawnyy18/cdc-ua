'use client'

import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { redirectIfAdmin } from '@/lib/redirectAdmin'
import { Download, FileText, Loader2 } from 'lucide-react'

interface UserProfile {
  id: string
  full_name: string
  username: string
  email: string
  eco_points: number
  total_co2_saved: number
  total_donations: number
  donated_devices: number
  recycled_devices: number
  profile_image_url?: string
}

interface Donation {
  id: string
  device_category: string
  brand: string
  model: string
  condition: string
  donation_type: string
  eco_points_earned: number
  co2_saved: number
  status: string
  created_at: string
  drop_off_center: string
}

interface LeaderboardUser {
  id: string
  rank: number
  name: string
  username: string
  eco_points: number
  total_donations: number
  total_co2_saved: number
  profile_image_url?: string
}

export default function Dashboard() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [donations, setDonations] = useState<Donation[]>([])
  const [donatedDevices, setDonatedDevices] = useState<Donation[]>([])
  const [recycledDevices, setRecycledDevices] = useState<Donation[]>([])
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'donated' | 'recycled'>('donated')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)
  const [downloadingForm, setDownloadingForm] = useState<string | null>(null)

  // Use ref to prevent multiple API calls
  const dataFetched = useRef(false)

  // Auth via localStorage — synchronous, eliminates per-call getSession() network round-trips
  const makeAuthenticatedRequest = async (url: string, body: any, retries = 2) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        let accessToken: string | null = null
        let userId: string | null = null

        if (typeof window !== 'undefined') {
          accessToken = localStorage.getItem('ecokonek_token')
          try {
            const stored = localStorage.getItem('ecokonek_user')
            if (stored) userId = JSON.parse(stored)?.id || null
          } catch (e) {}
        }

        const headers: any = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
        if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`
        if (userId) headers['x-user-id'] = userId

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10s timeout

        const response = await fetch(url, {
          method: 'POST',
          headers,
          body: JSON.stringify(body),
          signal: controller.signal
        })

        clearTimeout(timeoutId)
        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        return await response.json()

      } catch (error: any) {
        if (attempt === retries) {
          return { success: false, error: error.message || 'Network request failed' }
        }
        await new Promise(resolve => setTimeout(resolve, attempt * 500))
      }
    }
  }

  useEffect(() => {
    // Prevent multiple executions
    if (dataFetched.current) return

    // AbortController for cleanup
    const abortController = new AbortController()
    let isMounted = true

    const loadDashboardData = async () => {
      try {
        // Fast-path auth: read from localStorage (synchronous, no network call)
        const token = typeof window !== 'undefined' ? localStorage.getItem('ecokonek_token') : null
        const storedUserStr = typeof window !== 'undefined' ? localStorage.getItem('ecokonek_user') : null
        let storedUser: any = null
        if (storedUserStr) {
          try { storedUser = JSON.parse(storedUserStr) } catch (e) {}
        }

        if (!token || !storedUser?.id) {
          if (isMounted) { setIsAuthenticated(false); setLoading(false) }
          return
        }

        if (isMounted) setIsAuthenticated(true)

        // Admin check — runs after initial auth confirmation
        const isAdmin = await redirectIfAdmin()
        if (isAdmin) return

        // Fetch all data in parallel (timeout handled inside makeAuthenticatedRequest)
        const [userResponse, donationsResponse, leaderboardResponse] = await Promise.allSettled([
          makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, { action: 'get-profile' }),
          makeAuthenticatedRequest(`/api/supabase/functions/donation-handler`, { action: 'get-donations' }),
          makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, { action: 'get-leaderboard' })
        ])

        console.log('API calls completed:', {
          user: userResponse.status,
          donations: donationsResponse.status,
          leaderboard: leaderboardResponse.status
        })

        // Process user profile
        if (userResponse.status === 'fulfilled' && userResponse.value?.success) {
          const userData = userResponse.value.user
          setUser(userData)
          console.log('User profile loaded successfully:', userData.full_name)
        } else {
          console.log('User profile fetch failed, using fallback data')
          // Use stored user data as fallback
          if (storedUser) {
            const fallbackUser = {
              id: storedUser.id,
              full_name: storedUser.full_name || storedUser.user_metadata?.full_name || storedUser.email?.split('@')[0] || 'User',
              username: storedUser.username || storedUser.user_metadata?.username || storedUser.email?.split('@')[0] || 'user',
              email: storedUser.email,
              eco_points: 0,
              total_co2_saved: 0,
              total_donations: 0,
              donated_devices: 0,
              recycled_devices: 0,
              profile_image_url: storedUser.profile_image_url || storedUser.user_metadata?.avatar_url
            }
            setUser(fallbackUser)
            console.log('Using fallback user data:', fallbackUser.full_name)
          }
        }

        // Process donations
        if (donationsResponse.status === 'fulfilled' && donationsResponse.value?.success) {
          const allDonations = donationsResponse.value.donations || []
          setDonations(allDonations)

          // Only count eco points, CO2, and donation count for reallocated/donated assets
          const acceptedDonations = allDonations.filter((d: Donation) => d.status === 'reallocated' || d.status === 'donated')
          const ecoPoints = acceptedDonations.reduce((sum: number, d: Donation) => sum + (d.eco_points_earned || 0), 0)
          const totalCo2Saved = acceptedDonations.reduce((sum: number, d: Donation) => sum + (d.co2_saved || 0), 0)
          const totalDonations = acceptedDonations.length

          // Override user stats with values calculated from accepted donations only
          setUser(prev => prev ? {
            ...prev,
            eco_points: ecoPoints,
            total_co2_saved: totalCo2Saved,
            total_donations: totalDonations
          } : prev)

          // Categorize devices properly
          const donated = allDonations.filter((d: Donation) =>
            d.condition === 'working' && d.donation_type !== 'recycled'
          )
          const recycled = allDonations.filter((d: Donation) =>
            d.condition === 'broken' || d.donation_type === 'recycled'
          )

          setDonatedDevices(donated)
          setRecycledDevices(recycled)
          console.log('Donations loaded successfully:', { 
            total: allDonations.length, 
            donated: donated.length, 
            recycled: recycled.length 
          })
        } else {
          console.log('Donations fetch failed, using empty arrays')
          setDonations([])
          setDonatedDevices([])
          setRecycledDevices([])
        }

        // Process leaderboard
        if (leaderboardResponse.status === 'fulfilled' && leaderboardResponse.value?.success) {
          const leaderboardData = leaderboardResponse.value.leaderboard || []
          setLeaderboard(leaderboardData)
          console.log('Leaderboard loaded successfully:', leaderboardData.length, 'users')
        } else {
          console.log('Leaderboard fetch failed, using empty array')
          setLeaderboard([])
        }

        dataFetched.current = true
        console.log('Dashboard data load completed successfully')

      } catch (error: any) {
        console.error('Critical error loading dashboard data:', error)
        
        // Don't update state if component unmounted
        if (!isMounted || abortController.signal.aborted) {
          console.log('Component unmounted, skipping error handling')
          return
        }

        // Emergency fallback - try to show something to the user
        if (typeof window !== 'undefined') {
          const storedUser = localStorage.getItem('ecokonek_user')
          if (storedUser) {
            try {
              const userData = JSON.parse(storedUser)
              setUser({
                id: userData.id,
                full_name: userData.full_name || userData.user_metadata?.full_name || userData.email?.split('@')[0] || 'User',
                username: userData.username || userData.user_metadata?.username || userData.email?.split('@')[0] || 'user',
                email: userData.email,
                eco_points: 0,
                total_co2_saved: 0,
                total_donations: 0,
                donated_devices: 0,
                recycled_devices: 0,
                profile_image_url: userData.profile_image_url || userData.user_metadata?.avatar_url
              })
              setIsAuthenticated(true)
              console.log('Emergency fallback: using stored user data')
            } catch (e) {
              console.error('Emergency fallback failed:', e)
            }
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadDashboardData()

    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false
      abortController.abort()
      console.log('Dashboard component unmounting, cleaning up...')
    }
  }, []) // Empty dependency array - only run once

  // ... existing code for getDeviceIcon, getStatusColor, getAchievementIcon, handleLogout ...

  // ── Form Download Handler ──
  const handleFormDownload = async (formKey: string, label: string) => {
    setDownloadingForm(formKey)
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('ecokonek_token') : null
      if (!token) throw new Error('Not authenticated — please log in again.')

      const res = await fetch(`/api/download-form?form=${formKey}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Download failed' }))
        throw new Error(err.error || `Download failed (${res.status})`)
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      const disposition = res.headers.get('Content-Disposition')
      const filenameMatch = disposition?.match(/filename="(.+?)"/) 
      link.download = filenameMatch?.[1] || `${formKey}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (err: any) {
      console.error('Form download error:', err)
      alert(err.message || 'Failed to download form. Please try again.')
    } finally {
      setDownloadingForm(null)
    }
  }

  const getDeviceIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      smartphone: 'ri-smartphone-line',
      laptop: 'ri-computer-line',
      tablet: 'ri-tablet-line',
      desktop: 'ri-computer-line',
      appliance: 'ri-tv-line',
      battery: 'ri-battery-line',
      cable: 'ri-usb-line',
      headphones: 'ri-headphone-line'
    }
    return icons[category] || 'ri-device-line'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reallocated': return 'text-blue-600 bg-blue-50'
      case 'donated': return 'text-green-600 bg-green-50'
      case 'pending_evaluation': return 'text-amber-600 bg-amber-50'
      case 'disposed': return 'text-slate-600 bg-slate-100'
      case 'voided': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <img src="/images/itd-logo.png" alt="Loading" className="w-24 h-24 object-contain mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your dashboard</h2>
          <Link href="/login" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    )
  }

  return (
  <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">CO₂ Saved</p>
                    <p className="text-2xl sm:text-3xl font-bold text-blue-600" title={`${user.total_co2_saved || 0}kg`}>
                      {Number(user.total_co2_saved || 0).toFixed(2)}kg
                    </p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i className="ri-cloud-line text-blue-600 text-lg sm:text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Submissions</p>
                    <p className="text-2xl sm:text-3xl font-bold text-purple-600">{user.total_donations || 0}</p>
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <i className="ri-gift-line text-purple-600 text-lg sm:text-xl"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Device Categories */}
            <div id="device-history" className="bg-white rounded-xl shadow-sm border scroll-mt-24">
              <div className="p-4 sm:p-6 border-b">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Your Devices</h2>
                <p className="text-gray-600 mt-1">Track your donated and recycled devices</p>
              </div>

              {/* Tab Navigation */}
              <div className="border-b">
                <nav className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-8 px-4 sm:px-6">
                  <button
                    onClick={() => setActiveTab('donated')}
                    className={`py-2 sm:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                      activeTab === 'donated'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className="ri-gift-line mr-2"></i>
                    Donated ({donatedDevices.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('recycled')}
                    className={`py-2 sm:py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap cursor-pointer ${
                      activeTab === 'recycled'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <i className="ri-recycle-line mr-2"></i>
                    Recycled ({recycledDevices.length})
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-4 sm:p-6">
                {activeTab === 'donated' && (
                  <div className="space-y-4">
                    {donatedDevices.length > 0 ? (
                      donatedDevices.map((device) => (
                        <div key={device.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <i className={`${getDeviceIcon(device.device_category)} text-green-600 text-base sm:text-lg`}></i>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm sm:text-base">{device.brand} {device.model}</h4>
                              <p className="text-xs sm:text-sm text-gray-600">{device.device_category} • {device.condition}</p>
                            </div>
                          </div>
                          <div className="text-right mt-2 sm:mt-0">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                              <div className="text-xs sm:text-sm">
                                {(device.status === 'reallocated' || device.status === 'donated') ? (
                                  <span className="text-gray-500">{Number(device.co2_saved || 0).toFixed(2)}kg CO₂ saved</span>
                                ) : null}
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}> 
                                {device.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <i className="ri-gift-line text-3xl sm:text-4xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500">No donated devices yet</p>
                        <Link href="/donate" className="text-green-600 hover:text-green-700 font-medium cursor-pointer">
                          Make your first donation
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'recycled' && (
                  <div className="space-y-4">
                    {recycledDevices.length > 0 ? (
                      recycledDevices.map((device) => (
                        <div key={device.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <i className={`${getDeviceIcon(device.device_category)} text-blue-600 text-base sm:text-lg`}></i>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 text-sm sm:text-base">{device.brand} {device.model}</h4>
                              <p className="text-xs sm:text-sm text-gray-600">{device.device_category} • {device.condition}</p>
                            </div>
                          </div>
                          <div className="text-right mt-2 sm:mt-0">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                              <div className="text-xs sm:text-sm">
                                <span className="text-gray-500">{Number(device.co2_saved || 0).toFixed(2)}kg CO₂ saved</span>
                              </div>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}> 
                                {device.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <i className="ri-recycle-line text-3xl sm:text-4xl text-gray-300 mb-4"></i>
                        <p className="text-gray-500">No recycled devices yet</p>
                        <Link href="/donate" className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer">
                          Recycle your first device
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>


          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-4 sm:p-6 border-b">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-4 sm:p-6 space-y-3">
                <Link 
                  href="/donate" 
                  className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-green-200 hover:shadow-sm"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <i className="ri-add-line text-green-600 text-base sm:text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-xs sm:text-sm">Surrender Device</p>
                    <p className="text-xs sm:text-sm text-gray-600">Submit a CDC asset for disposal</p>
                  </div>
                  <i className="ri-arrow-right-s-line text-gray-400 group-hover:text-green-500 transition-colors"></i>
                </Link>

                <button 
                  onClick={() => {
                    const el = document.getElementById('device-history');
                    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-blue-200 hover:shadow-sm w-full text-left"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <i className="ri-history-line text-blue-600 text-base sm:text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-xs sm:text-sm">Device History</p>
                    <p className="text-xs sm:text-sm text-gray-600">{donations.length} device{donations.length !== 1 ? 's' : ''} submitted</p>
                  </div>
                  <i className="ri-arrow-down-s-line text-gray-400 group-hover:text-blue-500 transition-colors"></i>
                </button>

                <button
                  onClick={() => {
                    dataFetched.current = false;
                    setRefreshTrigger(prev => prev + 1);
                  }}
                  className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-amber-200 hover:shadow-sm w-full text-left"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <i className="ri-refresh-line text-amber-600 text-base sm:text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-xs sm:text-sm">Refresh Stats</p>
                    <p className="text-xs sm:text-sm text-gray-600">Update your dashboard data</p>
                  </div>
                  <i className="ri-refresh-line text-gray-400 group-hover:text-amber-500 group-hover:animate-spin transition-colors"></i>
                </button>

                <Link 
                  href="/profile" 
                  className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-purple-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-purple-200 hover:shadow-sm"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                    <i className="ri-user-line text-purple-600 text-base sm:text-lg"></i>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-xs sm:text-sm">My Profile</p>
                    <p className="text-xs sm:text-sm text-gray-600">Edit your profile & department</p>
                  </div>
                  <i className="ri-arrow-right-s-line text-gray-400 group-hover:text-purple-500 transition-colors"></i>
                </Link>
              </div>
            </div>

            {/* Standard Forms & Resources */}
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-4 sm:p-6 border-b">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Standard Forms</h3>
                    <p className="text-xs text-gray-500">Accountability templates</p>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-3">
                {/* Waste Material Report */}
                <button
                  id="download-waste-material-report"
                  onClick={() => handleFormDownload('waste_material_report', 'Waste Material Report')}
                  disabled={downloadingForm === 'waste_material_report'}
                  className="group flex items-center space-x-3 p-3 rounded-lg hover:bg-emerald-50 transition-all duration-200 cursor-pointer border border-transparent hover:border-emerald-200 hover:shadow-sm w-full text-left disabled:opacity-60 disabled:cursor-wait"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                    {downloadingForm === 'waste_material_report' ? (
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 animate-spin" />
                    ) : (
                      <i className="ri-file-text-line text-emerald-600 text-base sm:text-lg"></i>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-xs sm:text-sm">Waste Material Report</p>
                    <p className="text-xs text-gray-500 truncate">CDC accountability form (PDF)</p>
                  </div>
                  <Download className="w-4 h-4 text-gray-400 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
                </button>


                <div className="pt-2 border-t border-gray-100">
                  <p className="text-[10px] text-gray-400 leading-relaxed">
                    These are standard CDC accountability form templates. Download, fill out, and submit to your IT Admin.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
