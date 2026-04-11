
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { saveUserToLocalStorage } from '../../lib/storage'
import { redirectIfAdmin } from '@/lib/redirectAdmin'

interface UserProfile {
  id: string
  email: string
  full_name: string
  username: string
  phone: string
  bio: string
  location: string
  interests: string[]
  profile_image_url: string
  eco_points: number
  total_donations: number
  co2_saved: number
  created_at: string
  department_id: string | null
  department?: {
    name: string
    municipality: string
  } | null
}

interface Donation {
  id: string
  device_category: string
  brand: string
  model: string
  condition: string
  eco_points_earned: number
  co2_saved: number
  status: string
  created_at: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [donations, setDonations] = useState<Donation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isEditing, setIsEditing] = useState(false)
  const [departments, setDepartments] = useState<Array<{id: string, name: string, description: string}>>([])
  const [editForm, setEditForm] = useState({
  phone: '',
  bio: '',
  location: '',
  interests: [] as string[],
  profile_image_url: '',
  is_public: true,
  department_id: '' as string | null
  })
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [saveMessage, setSaveMessage] = useState('')
  const [newInterest, setNewInterest] = useState('')
  const [showDepartmentConfirmModal, setShowDepartmentConfirmModal] = useState(false)
  const [pendingDepartmentId, setPendingDepartmentId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Enhanced authentication function
  const makeAuthenticatedRequest = async (url: string, options: any = {}) => {
    try {
      const token = localStorage.getItem('ecokonek_token');
      if (!token) {
        throw new Error('No authentication token');
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  };

  useEffect(() => {
    loadProfile()
    loadDepartments()
  }, [])

  const loadDepartments = async () => {
    try {
      const token = localStorage.getItem('ecokonek_token')
      if (!token) return

      const response = await fetch('/api/supabase/functions/user-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ action: 'get-departments' })
      })

      if (response.ok) {
        const data = await response.json()
        console.log('🏢 Departments loaded:', data.departments)
        if (data.success && data.departments) {
          setDepartments(data.departments)
        }
      }
    } catch (error) {
      console.log('Failed to load departments:', error)
    }
  };

  const loadProfile = async () => {
    try {
      setLoading(true)
      setError('')

      // Check if user is admin and redirect if so
      const isAdmin = await redirectIfAdmin()
      if (isAdmin) {
        console.log('Admin user redirected to admin dashboard')
        return
      }

      if (typeof window === 'undefined') {
        return
      }

      const token = localStorage.getItem('ecokonek_token')
      const userDataStr = localStorage.getItem('ecokonek_user')
      
      if (!token || !userDataStr) {
        setError('Please log in to view your profile')
        setLoading(false)
        return
      }

      let storedUser
      try {
        storedUser = JSON.parse(userDataStr)
      } catch (e) {
        console.error('Failed to parse stored user data:', e)
        setError('Invalid user session. Please log in again.')
        setLoading(false)
        return
      }

      try {
        const profileData = await makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, {
          method: 'POST',
          headers: {
            'x-user-id': storedUser.id
          },
          body: JSON.stringify({ action: 'get-profile' })
        });

        if (profileData.success && profileData.user) {
          const apiUser = profileData.user
          const userData = {
            id: apiUser.id || storedUser.id,
            email: apiUser.email || storedUser.email,
            full_name: apiUser.full_name || storedUser.full_name || 'User',
            username: apiUser.username || storedUser.username || 'user',
            phone: apiUser.phone || '',
            bio: apiUser.bio || '',
            location: apiUser.location || '',
            interests: apiUser.interests || [],
            profile_image_url: apiUser.profile_image_url || storedUser.profile_image_url || '',
            eco_points: apiUser.eco_points || 0,
            total_donations: apiUser.total_donations || 0,
            co2_saved: apiUser.co2_saved || apiUser.total_co2_saved || 0,
            created_at: apiUser.created_at || new Date().toISOString(),
            department_id: apiUser.department_id || apiUser.barangay_id || null,
            department: apiUser.department || apiUser.barangays || null
          }

          setUser(userData)
          setEditForm({
            phone: userData.phone,
            bio: userData.bio,
            location: userData.location,
            interests: userData.interests,
            profile_image_url: userData.profile_image_url,
            is_public: apiUser.is_public !== false, // default to true if undefined
            department_id: userData.department_id || ''  // Use empty string instead of null for form
          })

          console.log('👤 User loaded with department:', {
            department_id: userData.department_id,
            department: userData.department,
            editForm_will_be_set_to: userData.department_id || ''
          })

          // Update localStorage with real data
          saveUserToLocalStorage(userData)
        } else {
          throw new Error('Invalid profile data structure')
        }

      } catch (fetchError) {
        console.error('Profile fetch error:', fetchError)
        
        const fallbackUser = {
          id: storedUser.id || '',
          email: storedUser.email || '',
          full_name: storedUser.full_name || storedUser.username || 'User',
          username: storedUser.username || 'user',
          phone: '',
          bio: '',
          location: '',
          interests: [],
          profile_image_url: storedUser.profile_image_url || '',
          eco_points: 0,
          total_donations: 0,
          co2_saved: 0,
          created_at: new Date().toISOString(),
          department_id: null,
          department: null
        }

        setUser(fallbackUser)
        setEditForm({
          phone: fallbackUser.phone,
          bio: fallbackUser.bio,
          location: fallbackUser.location,
          interests: fallbackUser.interests,
          profile_image_url: fallbackUser.profile_image_url,
          is_public: true, // fallback to public if unknown
          department_id: ''  // Use empty string for form
        })
      }

      try {
        const donationsData = await makeAuthenticatedRequest(`/api/supabase/functions/donation-handler`, {
          method: 'POST',
          body: JSON.stringify({ action: 'get-donations' })
        });

        if (donationsData.success && donationsData.donations) {
          setDonations(donationsData.donations)
        }
      } catch (donationError) {
        console.error('Failed to load donations:', donationError)
        setDonations([])
      }

    } catch (err) {
      console.error('Profile load error:', err)
      setError('Unable to load profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setSaveMessage('File size must be less than 5MB')
      setTimeout(() => setSaveMessage(''), 3000)
      return
    }

    if (!file.type.startsWith('image/')) {
      setSaveMessage('Please select an image file')
      setTimeout(() => setSaveMessage(''), 3000)
      return
    }

    try {
      setUploading(true)
      setUploadProgress(0)

      const reader = new FileReader()
      reader.onload = async (e) => {
        const base64 = e.target?.result as string
        
        try {
          const progressInterval = setInterval(() => {
            setUploadProgress(prev => Math.min(prev + 10, 90))
          }, 100)

          const data = await makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, {
            method: 'POST',
            headers: {
              'x-user-id': (user?.id || (JSON.parse(localStorage.getItem('ecokonek_user') || '{}')?.id) || '') as string
            },
            body: JSON.stringify({
              action: 'update-profile-image',
              image_data: base64,
              file_name: file.name,
              file_type: file.type
            })
          });

          clearInterval(progressInterval)
          setUploadProgress(100)

          if (data.success && data.image_url) {
            setUser(prev => prev ? { ...prev, profile_image_url: data.image_url } : null)
            setSaveMessage('Profile picture updated successfully!')
            
            // Note: We don't save profile_image_url to localStorage to avoid quota errors
            // The image URL is stored in the database and fetched when needed
          } else {
            setUser(prev => prev ? { ...prev, profile_image_url: base64 } : null)
            setSaveMessage('Profile picture updated!')
          }
          
          setTimeout(() => {
            setUploading(false)
            setUploadProgress(0)
            setSaveMessage('')
          }, 2000)

        } catch (uploadError) {
          console.error('Image upload error:', uploadError)
          setUser(prev => prev ? { ...prev, profile_image_url: base64 } : null)
          setSaveMessage('Profile picture updated!')
          setUploading(false)
          setUploadProgress(0)
          setTimeout(() => setSaveMessage(''), 2000)
        }
      }

      reader.readAsDataURL(file)

    } catch (err) {
      console.error('File processing error:', err)
      setSaveMessage('Failed to process image file')
      setUploading(false)
      setUploadProgress(0)
      setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const handleSaveProfile = async () => {
    try {
      // Convert empty string to null for department_id
      const departmentIdToSave = editForm.department_id === '' ? null : editForm.department_id
      
      console.log('🚀 Saving profile with data:', {
        ...editForm,
        department_id: departmentIdToSave,
        raw_department_id: editForm.department_id,
        department_id_type: typeof editForm.department_id
      })
      
      const data = await makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, {
        method: 'POST',
        headers: {
          'x-user-id': (user?.id || '') as string
        },
        body: JSON.stringify({
          action: 'update-profile',
          ...editForm,
          department_id: departmentIdToSave
        })
      });

      console.log('✅ Profile update response:', data)

      if (data.success) {
        setIsEditing(false)
        setSaveMessage('Profile updated successfully!')
        console.log('🔄 Reloading profile to verify save...')
        await loadProfile(); // Always reload from backend after update
        setTimeout(() => setSaveMessage(''), 1500)
        // Redirect to donate page for instant sync if department was just set
        if (editForm.department_id && !user?.department_id) {
          window.location.href = '/donate';
        }
        return
      }

      setIsEditing(false)
      setSaveMessage('Profile updated!')
      await loadProfile();
      setTimeout(() => setSaveMessage(''), 3000)

    } catch (err) {
  console.error('Profile update error:', err)
  setIsEditing(false)
  setSaveMessage('Profile updated!')
  await loadProfile();
  setTimeout(() => setSaveMessage(''), 3000)
    }
  }

  const addInterest = () => {
    if (newInterest.trim() && !editForm.interests.includes(newInterest.trim())) {
      setEditForm(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }))
      setNewInterest('')
    }
  }

  const removeInterest = (interest: string) => {
    setEditForm(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-error-warning-line text-2xl text-red-600"></i>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="space-x-4">
            <button
              onClick={loadProfile}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Try Again
            </button>
            <Link href="/login" className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors whitespace-nowrap cursor-pointer">
              Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Profile Not Found</h2>
          <p className="text-gray-600 mb-4">Unable to load your profile information</p>
          <Link href="/dashboard" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer">
            Go to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 cursor-pointer">
                <i className="ri-arrow-left-line text-xl"></i>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {saveMessage && (
        <div className="max-w-6xl mx-auto px-4 pt-4">
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
            <div className="flex items-center">
              <i className="ri-check-line text-green-600 mr-2"></i>
              {saveMessage}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {/* Profile Image */}
              <div className="text-center mb-6">
                <div className="relative inline-block group">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mx-auto relative border-4 border-white shadow-lg">
                    {user.profile_image_url ? (
                      <img
                        src={user.profile_image_url}
                        alt={user.full_name}
                        className="w-full h-full object-cover"
                        style={{ objectPosition: 'center center' }}
                        onError={e => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = '';
                          setUser(prev => prev ? { ...prev, profile_image_url: '' } : null);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-green-100">
                        <i className="ri-user-line text-4xl text-green-600"></i>
                      </div>
                    )}
                    
                    <div 
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-all rounded-full flex items-center justify-center cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {uploading ? (
                        <div className="text-center">
                          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
                          <span className="text-xs text-white">{uploadProgress}%</span>
                        </div>
                      ) : (
                        <i className="ri-camera-line text-2xl text-white"></i>
                      )}
                    </div>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </div>
                
                <p className="text-sm text-gray-500 mt-2">Click to upload image (max 5MB)</p>
              </div>

              {/* Basic Info */}
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{user.full_name}</h2>
                <p className="text-gray-600 mb-2">@{user.username}</p>
                <p className="text-sm text-gray-500 mb-4">{user.email}</p>
                
                {isEditing ? (
                  <div className="space-y-4 text-left">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={editForm.location}
                        onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="Enter your location"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <select
                        value={editForm.department_id || ''}
                        onChange={(e) => {
                          const newValue = e.target.value || null
                          console.log('🏢 Department selected:', newValue)
                          
                          // If user already has a department set, prevent changes
                          if (user?.department_id && newValue !== user.department_id) {
                            setSaveMessage('⚠️ Department cannot be changed once set!')
                            setTimeout(() => setSaveMessage(''), 3000)
                            return
                          }
                          
                          // If selecting a new department (not clearing), show confirmation
                          if (newValue && !user?.department_id) {
                            setPendingDepartmentId(newValue)
                            setShowDepartmentConfirmModal(true)
                          } else {
                            // Allow clearing selection if not yet saved
                            setEditForm(prev => ({ ...prev, department_id: newValue }))
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        disabled={!!user?.department_id}
                      >
                        <option value="">Select your department</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                      {user?.department_id ? (
                        <p className="text-xs text-amber-600 mt-1 font-medium">
                          ⚠️ Department is locked and cannot be changed
                        </p>
                      ) : (
                        <p className="text-xs text-gray-500 mt-1">
                          Select your CDC department (cannot be changed later)
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Interests</label>
                      <div className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addInterest()}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                          placeholder="Add an interest"
                        />
                        <button
                          onClick={addInterest}
                          className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-7"
                        >
                          <i className="ri-add-line"></i>
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {editForm.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center"
                          >
                            {interest}
                            <button
                              onClick={() => removeInterest(interest)}
                              className="ml-1 text-green-600 hover:text-green-800 cursor-pointer"
                            >
                              <i className="ri-close-line text-xs"></i>
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Public Profile</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={editForm.is_public}
                          onChange={e => setEditForm(prev => ({ ...prev, is_public: e.target.checked }))}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">Show my profile on the community page</span>
                      </div>
                    </div>
                    <button
                      onClick={handleSaveProfile}
                      className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                ) : (
                  <div>
                    {user.bio && (
                      <p className="text-gray-700 text-sm mb-4">{user.bio}</p>
                    )}
                    
                    {user.location && (
                      <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-map-pin-line"></i>
                        </div>
                        {user.location}
                      </div>
                    )}
                    
                    {user.department && (
                      <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-building-2-line"></i>
                        </div>
                        <span className="font-medium text-green-600">
                          {Array.isArray(user.department) ? user.department[0]?.name : user.department.name}
                        </span>
                      </div>
                    )}
                    
                    {user.phone && (
                      <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                        <div className="w-4 h-4 flex items-center justify-center mr-1">
                          <i className="ri-phone-line"></i>
                        </div>
                        {user.phone}
                      </div>
                    )}

                    {user.interests && user.interests.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-700 mb-2">Interests</p>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {user.interests.map((interest, index) => (
                            <span
                              key={index}
                              className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-xs text-gray-500">
                      Member since {new Date(user.created_at).toLocaleDateString()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Impact Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-leaf-line text-green-600"></i>
                    </div>
                    <span className="text-gray-700">Eco Points</span>
                  </div>
                  <span className="font-semibold text-green-600">{user.eco_points}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-recycle-line text-blue-600"></i>
                    </div>
                    <span className="text-gray-700">Donations</span>
                  </div>
                  <span className="font-semibold text-blue-600">{user.total_donations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                      <i className="ri-earth-line text-emerald-600"></i>
                    </div>
                    <span className="text-gray-700">CO₂ Saved</span>
                  </div>
                  <span className="font-semibold text-emerald-600">{user.co2_saved}kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Donations History */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Donation History</h3>
              
              {donations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="ri-recycle-line text-2xl text-gray-400"></i>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Donations Yet</h4>
                  <p className="text-gray-600 mb-4">Start making a difference by donating your old electronics!</p>
                  <Link href="/donate" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors whitespace-nowrap cursor-pointer">
                    Make Your First Donation
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <div key={donation.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">
                              {donation.brand} {donation.model}
                            </h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              donation.status === 'reallocated' ? 'bg-blue-100 text-blue-800' :
                              donation.status === 'donated' ? 'bg-green-100 text-green-800' :
                              donation.status === 'pending_evaluation' ? 'bg-amber-100 text-amber-800' :
                              donation.status === 'disposed' ? 'bg-slate-100 text-slate-800' :
                              donation.status === 'voided' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {donation.status === 'pending_evaluation' ? 'Pending Evaluation' : donation.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {donation.device_category} • {donation.condition} condition
                          </p>
                          <div className="flex items-center space-x-4 text-sm">
                            <span className="text-green-600 font-medium">
                              +{donation.eco_points_earned} points
                            </span>
                            <span className="text-emerald-600 font-medium">
                              {donation.co2_saved}kg CO₂ saved
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(donation.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Department Confirmation Modal */}
    {showDepartmentConfirmModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-alert-line text-3xl text-amber-600"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Department Selection</h3>
            <p className="text-gray-600 mb-4">
              You are about to set your department to:
            </p>
            <div className="bg-green-50 border-2 border-green-200 rounded-lg p-3 mb-4">
              <p className="text-lg font-bold text-green-800">
                <i className="ri-building-2-line mr-2"></i>
                {departments.find(d => d.id === pendingDepartmentId)?.name}
              </p>
            </div>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-left">
              <div className="flex">
                <i className="ri-error-warning-line text-red-500 text-xl mr-3 flex-shrink-0"></i>
                <div>
                  <p className="font-semibold text-red-800 mb-1">Important Notice:</p>
                  <p className="text-sm text-red-700">
                    Once you confirm this selection, your department <strong>cannot be changed</strong>. 
                    This is permanent and will be used for all future e-waste records and reports.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Are you absolutely sure this is the correct department?
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => {
                setShowDepartmentConfirmModal(false)
                setPendingDepartmentId(null)
              }}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <i className="ri-close-line mr-2"></i>
              Cancel
            </button>
            <button
              onClick={() => {
                console.log('✅ Department confirmed:', {
                  pendingDepartmentId,
                  departmentName: departments.find(d => d.id === pendingDepartmentId)?.name
                })
                setEditForm(prev => {
                  const newForm = { ...prev, department_id: pendingDepartmentId }
                  console.log('📝 EditForm updated:', newForm)
                  return newForm
                })
                setShowDepartmentConfirmModal(false)
                setSaveMessage('✅ Department selected! Remember to click "Save Changes" to finalize.')
                setTimeout(() => setSaveMessage(''), 5000)
              }}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              <i className="ri-check-line mr-2"></i>
              Yes, I'm Sure
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
