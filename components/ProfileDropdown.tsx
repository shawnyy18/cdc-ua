
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { saveUserToLocalStorage } from '../lib/storage'

interface User {
  id: string
  email: string
  full_name?: string
  username?: string
  profile_image_url?: string
  eco_points?: number
  total_donations?: number
  total_co2_saved?: number
  donated_devices?: number
  recycled_devices?: number
}

interface ProfileDropdownProps {
  user: User
  onLogout: () => void
  refreshTrigger?: number
}

export default function ProfileDropdown({ user, onLogout, refreshTrigger }: ProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(user)
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Fetch real user data from backend
  const fetchRealUserData = async () => {
    try {
      setIsLoading(true)
      const token = localStorage.getItem('ecokonek_token')
      
      if (!token) {
        console.log('No token found, using provided user data')
        setCurrentUser(user)
        return
      }

      const response = await fetch('/api/supabase/functions/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action: 'get-profile' })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success && data.user) {
          console.log('Real user data fetched successfully:', data.user)
          setCurrentUser(data.user)
          // Update localStorage with real data (excluding large images)
          saveUserToLocalStorage(data.user)
        } else {
          console.log('Failed to fetch real user data, using provided data')
          setCurrentUser(user)
        }
      } else {
        console.log('API call failed, using provided user data')
        setCurrentUser(user)
      }
    } catch (error) {
      console.error('Error fetching real user data:', error)
      setCurrentUser(user)
    } finally {
      setIsLoading(false)
    }
  }

  // Update user data when component mounts or refreshTrigger changes
  useEffect(() => {
    fetchRealUserData()
    setMounted(true)
  }, [refreshTrigger])

  // Also update when user prop changes
  useEffect(() => {
    if (user && user.id) {
      fetchRealUserData()
    }
  }, [user])

  // Listen for points update event
  useEffect(() => {
    const handlePointsUpdate = () => {
      console.log('Points updated event received, refreshing profile...')
      fetchRealUserData()
    }
    
    window.addEventListener('pointsUpdated', handlePointsUpdate)
    return () => window.removeEventListener('pointsUpdated', handlePointsUpdate)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getUserDisplayName = () => {
    return currentUser?.full_name || currentUser?.username || currentUser?.email?.split('@')[0] || 'User'
  }

  const getUserInitials = () => {
    const name = getUserDisplayName()
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const hasProfileImage = currentUser?.profile_image_url && 
    currentUser.profile_image_url.trim() !== '' && 
    currentUser.profile_image_url !== 'undefined' && 
    currentUser.profile_image_url !== 'null'

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors group cursor-pointer"
        disabled={isLoading}
      >
        <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ring-2 ring-transparent group-hover:ring-green-200 transition-all">
          {hasProfileImage ? (
            <img
              src={currentUser.profile_image_url}
              alt={getUserDisplayName()}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center center' }}
              onError={(e) => {
                console.log('Profile image failed to load, showing initials')
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling?.classList.remove('hidden')
              }}
            />
          ) : null}
          <div
            suppressHydrationWarning
            className={`w-full h-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold text-sm transition-all duration-200 group-hover:from-green-500 group-hover:via-emerald-600 group-hover:to-teal-600 ${hasProfileImage ? 'hidden' : 'flex'}`}
          >
            {isLoading ? '...' : (mounted ? getUserInitials() : '')}
          </div>
        </div>
        <div className="hidden md:block text-left">
          <p suppressHydrationWarning className="text-sm font-medium text-gray-900">{mounted ? getUserDisplayName() : ''}</p>
        </div>
        <i className={`ri-arrow-down-s-line text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50 overflow-hidden">
          {/* User Info Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ring-2 ring-white shadow-sm">
                {hasProfileImage ? (
                  <img
                    src={currentUser.profile_image_url}
                    alt={getUserDisplayName()}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center center' }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                      e.currentTarget.nextElementSibling?.classList.remove('hidden')
                    }}
                  />
                ) : null}
                <div
                  suppressHydrationWarning
                  className={`w-full h-full bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold text-lg ${hasProfileImage ? 'hidden' : 'flex'}`}
                >
                  {isLoading ? '...' : (mounted ? getUserInitials() : '')}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p suppressHydrationWarning className="font-semibold text-gray-900 truncate">{mounted ? getUserDisplayName() : ''}</p>
                <p suppressHydrationWarning className="text-sm text-gray-600 truncate">{mounted ? currentUser?.email : ''}</p>
              </div>
            </div>
          </div>

          {/* Real Stats Grid */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <i className="ri-leaf-line text-emerald-500 text-sm"></i>
                  <p className="text-lg font-bold text-emerald-600">
                    {isLoading ? '...' : (currentUser?.total_co2_saved || 0)}
                  </p>
                </div>
                <p className="text-xs text-gray-500">CO₂ Saved</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <i className="ri-heart-line text-green-500 text-sm"></i>
                  <p className="text-lg font-bold text-green-600">
                    {isLoading ? '...' : (currentUser?.donated_devices || 0)}
                  </p>
                </div>
                <p className="text-xs text-gray-500">Donated</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <i className="ri-recycle-line text-blue-500 text-sm"></i>
                  <p className="text-lg font-bold text-blue-600">
                    {isLoading ? '...' : (currentUser?.recycled_devices || 0)}
                  </p>
                </div>
                <p className="text-xs text-gray-500">Recycled</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/profile"
              className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-user-line text-gray-400"></i>
              </div>
              <span className="ml-3">My Profile</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-dashboard-line text-gray-400"></i>
              </div>
              <span className="ml-3">Dashboard</span>
            </Link>
            <Link
              href="/donate"
              className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-8 h-8 flex items-center justify-center">
                <i className="ri-recycle-line text-gray-400"></i>
              </div>
              <span className="ml-3">Donate Device</span>
            </Link>
            <div className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={() => {
                  setIsOpen(false)
                  onLogout()
                }}
                className="flex items-center w-full px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center">
                  <i className="ri-logout-line text-red-400"></i>
                </div>
                <span className="ml-3">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
