"use client"

import React from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import ProfileDropdown from './ProfileDropdown'
import { supabase } from '@/lib/supabase'

const navItems = [
  { id: 'home', href: '/', label: 'Home', icon: 'ri-home-4-line' },
  { id: 'donate', href: '/donate', label: 'Donate', icon: 'ri-heart-add-line' }
]

export default function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [displayName, setDisplayName] = React.useState('User')
  const pathname = usePathname() || '/'

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.error('Sign out error', e)
    }
    if (typeof window !== 'undefined') {
      localStorage.removeItem('ecokonek_token')
      localStorage.removeItem('ecokonek_user')
      window.location.href = '/login'
    }
  }

  // Lock body scroll when mobile menu open
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Determine if there's a logged-in user in localStorage. We avoid parsing on SSR.
  React.useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const token = localStorage.getItem('ecokonek_token')
      const user = localStorage.getItem('ecokonek_user')
      setIsLoggedIn(!!token && !!user)
      if (user) {
        const parsed = JSON.parse(user)
        setDisplayName(parsed?.full_name || parsed?.username || parsed?.email?.split('@')?.[0] || 'User')
      }
    } catch (e) {
      setIsLoggedIn(false)
      setDisplayName('User')
    }
  }, [])

  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/itd-logo.png"
                alt="ITD Logo"
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
                priority
              />
              <span className="font-semibold text-gray-900">EcoKonek</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href)
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-label={item.label}
                  className={`flex items-center gap-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 rounded-md px-2 py-1 transition-colors ${isActive ? 'text-green-600 font-semibold' : 'text-gray-700 hover:text-green-600'}`}
                >
                  <i className={`${item.icon}`}></i>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              )
            })}

            {/* Profile dropdown on desktop (only show when logged in) */}
            <div className="ml-4">
              {isLoggedIn ? (
                <ProfileDropdown
                  user={typeof window !== 'undefined' && localStorage.getItem('ecokonek_user') ? JSON.parse(localStorage.getItem('ecokonek_user') || '{}') : { id: '', email: '' }}
                  onLogout={handleLogout}
                />
              ) : (
                <div className="flex items-center gap-3">
                  <Link href="/login" className="text-sm text-gray-700 hover:text-green-600 px-3 py-1 rounded-md border border-transparent hover:bg-gray-50">Login</Link>
                  <Link href="/register" className="text-sm text-white bg-green-500 hover:bg-green-600 px-3 py-1 rounded-md">Join</Link>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <button
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md text-gray-600 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <i className={`ri-${open ? 'close-line' : 'menu-line'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-over menu */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40">
          <div className="absolute left-0 top-0 w-64 h-full bg-white shadow-lg p-4" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/images/itd-logo.png"
                  alt="ITD Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                />
                <span className="font-semibold text-gray-900">EcoKonek</span>
              </Link>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 rounded text-gray-600 hover:text-green-600">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <nav className="flex flex-col space-y-3">
              {navItems.map((it) => {
                const isActive = it.href === '/' ? pathname === '/' : pathname?.startsWith(it.href)
                return (
                  <Link
                    key={it.id}
                    href={it.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-200 transition-colors ${isActive ? 'bg-green-50' : 'hover:bg-gray-50'}`}
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <i className={`${it.icon} text-green-600`}></i>
                    </div>
                    <div>
                      <p className={`font-medium ${isActive ? 'text-green-700' : 'text-gray-900'}`}>{it.label}</p>
                    </div>
                  </Link>
                )
              })}
            </nav>

            <div className="mt-6 border-t border-gray-100 pt-4 px-1">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 px-2">Signed in as {displayName}</p>
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <i className="ri-user-line text-green-600"></i>
                    </div>
                    <span className="font-medium text-gray-900">My Profile</span>
                  </Link>
                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 p-2 rounded hover:bg-gray-50"
                  >
                    <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                      <i className="ri-dashboard-line text-green-600"></i>
                    </div>
                    <span className="font-medium text-gray-900">Dashboard</span>
                  </Link>
                  <button
                    onClick={() => {
                      setOpen(false)
                      handleLogout()
                    }}
                    className="w-full flex items-center gap-3 p-2 rounded hover:bg-red-50 text-left"
                  >
                    <div className="w-10 h-10 bg-red-50 rounded flex items-center justify-center">
                      <i className="ri-logout-box-line text-red-500"></i>
                    </div>
                    <span className="font-medium text-red-600">Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-2 px-1">
                  <Link href="/login" onClick={() => setOpen(false)} className="block text-center text-sm text-gray-700 hover:text-green-600 px-4 py-2 rounded-md border border-gray-200 hover:bg-gray-50">Login</Link>
                  <Link href="/register" onClick={() => setOpen(false)} className="block text-center text-sm text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md">Join</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
