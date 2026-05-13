
'use client';

import { Suspense, useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
// ProfileDropdown is now provided by the global Navbar in app/layout.tsx
import { saveUserToLocalStorage } from '../../lib/storage';
import { redirectIfAdmin } from '@/lib/redirectAdmin';

function DonatePageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [step, setStep] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [deviceCondition, setDeviceCondition] = useState<string>('');
  const [deviceDetails, setDeviceDetails] = useState<{ brand: string; model: string; year: string | number; description: string}>({
    brand: '',
    model: '',
    year: '',
    description: ''
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  // CDC asset mode is always on — this system is for CDC only
  const isCDCAsset = true;
  const [propertyNumber, setPropertyNumber] = useState<string>('');
  const [serialNumber, setSerialNumber] = useState<string>('');
  const [user, setUser] = useState<any>(null);
  // refreshTrigger was previously only used for the page-level ProfileDropdown
  // which is now provided globally by the Navbar.

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [donationResult, setDonationResult] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const isHazardousSelected = selectedCategory === 'hazardous-consumables';
  
  // Refs to prevent infinite loops
  const userDataRef = useRef<any>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Enhanced authentication function
  type RequestOptions = RequestInit & { headers?: Record<string, string> }
  const makeAuthenticatedRequest = async (url: string, options: RequestOptions = {}) => {
    try {
      const token = localStorage.getItem('ecokonek_token');
      // Try to read user id for x-user-id fallback
      let userId = '';
      try {
        const storedUser = localStorage.getItem('ecokonek_user');
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          userId = parsed?.id || '';
        }
      } catch (e) {
        // ignore parse error
      }
      if (!token) {
        // No token, but include x-user-id if available so backend can proceed
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...(userId ? { 'x-user-id': userId } : {}),
            ...(options.headers || {})
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        return await response.json();
      }

      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          ...(userId ? { 'x-user-id': userId } : {}),
          ...(options.headers || {})
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error('Request failed:', error);
      throw error;
    }
  };

  // Check authentication without invalidating token
  const checkAuth = useCallback(() => {
    const token = localStorage.getItem('ecokonek_token');
    const userData = localStorage.getItem('ecokonek_user');
    
    if (!token || !userData) {
      router.push('/login');
      return null;
    }

    try {
      const parsedUser = JSON.parse(userData);
      return { token, userData: parsedUser };
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('ecokonek_token');
      localStorage.removeItem('ecokonek_user');
      router.push('/login');
      return null;
    }
  }, [router]);

  // Enhanced user data loading with memoization
  const loadUserData = useCallback(async () => {
    if (isInitialized) return;
    
    try {
      // Check if user is admin and redirect if so
      const isAdmin = await redirectIfAdmin()
      if (isAdmin) {
        console.log('Admin user redirected to admin dashboard')
        return
      }

      const auth = checkAuth();
      if (!auth) return;

      setUser(auth.userData);
      userDataRef.current = auth.userData;

      // Fetch real user data from backend
      try {
        const data = await makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, {
          method: 'POST',
          body: JSON.stringify({ action: 'get-profile' })
        });

        if (data.success && data.user) {
          const updatedUser = {
            ...auth.userData,
            ...data.user,
            eco_points: data.user.eco_points || 0,
            total_donations: data.user.total_donations || 0,
            total_co2_saved: data.user.total_co2_saved || data.user.co2_saved || 0,
            donated_devices: data.user.donated_devices || 0,
            recycled_devices: data.user.recycled_devices || 0,
            profile_image_url: data.user.profile_image_url || auth.userData.profile_image_url,
            department_id: data.user.department_id || data.user.barangay_id || null,
            department: data.user.department || data.user.barangays || null
          };
          
          console.log('👤 Donate page: User loaded with department:', {
            department_id: updatedUser.department_id,
            has_department: !!updatedUser.department_id
          })
          
          setUser(updatedUser);
          userDataRef.current = updatedUser;
          saveUserToLocalStorage(updatedUser);
        }
      } catch (error) {
        console.error('Failed to fetch real user data:', error);
        // Continue with stored user data
      }

      setIsInitialized(true);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  }, [checkAuth, isInitialized]);

  // Initialize on mount
  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  useEffect(() => {
    if (!isInitialized) return;

    const handleStorageChange = () => {
      loadUserData();
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isInitialized, loadUserData]);

  const calculatePoints = () => {
    const category = deviceCategories.find(cat => cat.id === selectedCategory);
    if (!category) return 0;
    if (selectedCategory === 'hazardous-consumables') return 0;
    return deviceCondition === 'working' ? category.workingPoints : category.brokenPoints;
  };

  const calculateCO2 = () => {
    const co2Map = {
      'smartphone': { working: 8.5, broken: 4.2 },
      'laptop': { working: 18.7, broken: 9.4 },
      'tablet': { working: 11.3, broken: 5.7 },
      'desktop': { working: 22.1, broken: 11.1 },
      'appliance': { working: 7.8, broken: 3.9 },
      'battery': { working: 3.2, broken: 1.6 },
      'cable': { working: 1.5, broken: 0.8 },
      'headphones': { working: 5.4, broken: 2.7 },
      'hazardous-consumables': { working: 0, broken: 0 }
    } as const;
    
    const key = selectedCategory as keyof typeof co2Map;
    const co2Data = co2Map[key];
    if (!co2Data) return 0;
    return Math.round((deviceCondition === 'working' ? co2Data.working : co2Data.broken) * 100) / 100;
  };

  const handleSubmitDonation = async () => {
    if (!user?.department_id) {
      setError('Your account has no designated department yet. Please contact an admin before submitting a donation.');
      return;
    }

    // Property number and serial number are always required for CDC assets
    if (!propertyNumber.trim()) {
      setError('Property Number is required for CDC assets.');
      return;
    }
    if (!serialNumber.trim()) {
      setError('Serial Number is required for CDC assets.');
      return;
    }

    // Enhanced validation with better error messages
    if (!deviceDetails.brand?.trim()) {
      setError('Please enter the device brand.');
      return;
    }

    if (!deviceDetails.model?.trim()) {
      setError('Please enter the device model.');
      return;
    }

    if (!selectedCategory) {
      setError('Please select a device category.');
      return;
    }

    if (!isHazardousSelected && !deviceCondition) {
      setError('Please select device condition.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Enhanced authentication check
      const auth = checkAuth();
      if (!auth) {
        setError('Please log in to continue.');
        setIsSubmitting(false);
        return;
      }

      // Enhanced request with better error handling
      const requestData = {
        action: 'create-donation',
        donationData: {
          deviceCategory: selectedCategory,
          deviceType: deviceCategories.find(cat => cat.id === selectedCategory)?.name || selectedCategory,
          brand: deviceDetails.brand.trim(),
          model: deviceDetails.model.trim(),
          condition: isHazardousSelected ? 'N/A' : deviceCondition,
          description: deviceDetails.description?.trim() || '',
          year: null,
          dropOffCenter: null,
          isCDCAsset: true,
          propertyNumber: propertyNumber.trim(),
          serialNumber: serialNumber.trim()
        }
      };

      const data = await makeAuthenticatedRequest(`/api/supabase/functions/donation-handler`, {
        method: 'POST',
        headers: {
          'x-user-id': auth.userData.id // Add user ID header for better auth
        },
        body: JSON.stringify(requestData)
      });

      if (data.success) {
        // Update user data in localStorage with new stats
        const updatedUser = { ...auth.userData };
        if (data.newStats) {
          updatedUser.eco_points = data.newStats.eco_points;
          updatedUser.total_donations = data.newStats.total_donations;
          updatedUser.total_co2_saved = data.newStats.total_co2_saved;
          updatedUser.donated_devices = data.newStats.donated_devices;
          updatedUser.recycled_devices = data.newStats.recycled_devices;
          saveUserToLocalStorage(updatedUser);
          setUser(updatedUser);
          userDataRef.current = updatedUser;
        }

        // Prepare success modal data
        setDonationResult({
          deviceName: data.deviceName || `${deviceDetails.brand} ${deviceDetails.model}`,
          ecoPoints: data.ecoPoints || calculatePoints(),
          co2Saved: data.co2Saved || calculateCO2(),
          donationType: data.donationType || (deviceCondition === 'working' ? 'donated' : 'recycled'),
          destinationPath: data.destinationPath || (deviceCondition === 'working' ? 'Community Donation' : 'Recycling Center')
        });

        // Show success modal
        setShowSuccessModal(true);

        // Reset form
        setStep(1);
        setSelectedCategory('');
        setDeviceCondition('');
        setDeviceDetails({
          brand: '',
          model: '',
          year: '',
          description: ''
        });
        setPropertyNumber('');
        setSerialNumber('');

        // Trigger storage event for other components
        window.dispatchEvent(new Event('storage'));
        
      } else {
        setError(data.error || 'Failed to submit donation. Please try again.');
      }
    } catch (err: any) {
      console.error('Donation submission error:', err);
      if (err.message.includes('HTTP 400')) {
        setError('Invalid submission data. Please check all fields and try again.');
      } else if (err.message.includes('HTTP 403')) {
        setError('Your account must have an assigned department before you can donate or recycle.');
      } else if (err.message.includes('HTTP 401')) {
        setError('Session expired. Please log in again.');
        setTimeout(() => {
          localStorage.removeItem('ecokonek_token');
          localStorage.removeItem('ecokonek_user');
          router.push('/login');
        }, 2000);
      } else if (err.message.includes('HTTP 500')) {
        setError('Server error. Please try again in a moment.');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logout is handled by the global ProfileDropdown in the Navbar.

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Deep-link into Step 3 after selecting category/condition from separate pages.
  useEffect(() => {
    if (!searchParams) return;
    if (!user?.department_id) return;

    const categoryFromQuery = searchParams.get('category');
    const conditionFromQuery = searchParams.get('condition');

    if (!categoryFromQuery) return;

    setSelectedCategory(categoryFromQuery);

    if (conditionFromQuery && ['working', 'broken'].includes(conditionFromQuery)) {
      setDeviceCondition(conditionFromQuery);
      setStep(3);
      return;
    }

    setStep(2);
  }, [searchParams, user?.department_id]);

  if (!user || !isInitialized) {
    return <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center">
      <div className="text-center">
        <img src="/images/itd-logo.png" alt="Loading" className="w-24 h-24 object-contain mx-auto mb-4 animate-pulse" />
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    </div>;
  }

  const hasDepartmentAssigned = Boolean(user?.department_id);

  // Check if submit button should be enabled
  const requiresCondition = !isHazardousSelected;
  const standardDeviceCategories = deviceCategories.filter((category) => category.id !== 'hazardous-consumables');
  const hazardousCategory = deviceCategories.find((category) => category.id === 'hazardous-consumables');
  const isSubmitEnabled = hasDepartmentAssigned &&
                         selectedCategory && 
                         (!requiresCondition || deviceCondition) && 
                         deviceDetails.brand?.trim() && 
                         deviceDetails.model?.trim() && 
                         propertyNumber.trim() && 
                         serialNumber.trim() && 
                         !isSubmitting;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Per-page header removed — global Navbar provides site navigation and ProfileDropdown */}

      <div className="container mx-auto px-6 py-12">
        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center">
              <div 
                onClick={() => hasDepartmentAssigned && setStep(1)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer transition-all hover:scale-105 ${step >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}
              >
                1
              </div>
              <div className={`w-24 h-1 ${step >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div 
                onClick={() => hasDepartmentAssigned && selectedCategory && setStep(2)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-all hover:scale-105 ${step >= 2 ? 'bg-green-500 cursor-pointer' : selectedCategory ? 'bg-gray-300 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                2
              </div>
              <div className={`w-24 h-1 ${step >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
              <div 
                onClick={() => hasDepartmentAssigned && selectedCategory && deviceCondition && setStep(3)}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-all hover:scale-105 ${step >= 3 ? 'bg-green-500 cursor-pointer' : (selectedCategory && deviceCondition) ? 'bg-gray-300 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`}
              >
                3
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {step === 1 && 'Choose a Device Category'}
              {step === 2 && 'Assess Condition'}
              {step === 3 && 'Device Details & Submit'}
            </h2>
            <p className="text-gray-600">
              {step === 1 && 'Select the type of device you want to donate'}
              {step === 2 && 'Help us determine the best path for your device'}
              {step === 3 && 'Provide additional information and complete your donation'}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <i className="ri-error-warning-line text-red-500"></i>
                <span className="text-red-700 text-sm">{error}</span>
              </div>
            </div>
          )}

          {!hasDepartmentAssigned && (
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-start gap-2">
                <i className="ri-alert-line text-amber-600 mt-0.5"></i>
                <span className="text-amber-800 text-sm">
                  Your account has no designated department yet. Donation and recycling are locked until an admin assigns your department.
                </span>
              </div>
            </div>
          )}

          {/* Step 1: Device Category */}
          {step === 1 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
                <div className="rounded-xl border border-green-100 bg-green-50/40 p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">Standard Devices</h3>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700">
                      Donation or Recycling
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {standardDeviceCategories.map((category) => (
                      <div
                        key={category.id}
                        onClick={() => hasDepartmentAssigned && setSelectedCategory(category.id)}
                        className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center ${
                          selectedCategory === category.id
                            ? 'border-green-500 bg-green-50 shadow-sm'
                            : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                        }`}
                      >
                        <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3">
                          <i className={`${category.icon} text-3xl ${selectedCategory === category.id ? 'text-green-500' : 'text-gray-400'}`}></i>
                        </div>
                        <h4 className="font-semibold text-gray-800 mb-1">{category.name}</h4>
                        <p className="text-xs text-green-600">{category.brokenPoints}-{category.workingPoints} points</p>
                      </div>
                    ))}
                  </div>
                </div>

                {hazardousCategory && (
                  <div
                    onClick={() => hasDepartmentAssigned && setSelectedCategory(hazardousCategory.id)}
                    className={`rounded-xl border-2 p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${
                      isHazardousSelected
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-amber-200 bg-amber-50/70 hover:border-amber-400 hover:bg-amber-50'
                    }`}
                  >
                    <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-amber-200/40"></div>
                    <div className="relative">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 mb-4">
                        <i className="ri-alert-line"></i>
                        Special Handling
                      </span>
                      <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center mb-3">
                        <i className={`${hazardousCategory.icon} text-2xl`}></i>
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{hazardousCategory.name}</h3>
                      <p className="text-sm text-amber-900/90 mb-4">
                        Batteries, chemicals, and hazardous consumables are routed to a dedicated safe disposal workflow.
                      </p>
                      <div className="space-y-2 text-xs text-amber-900/80 mb-5">
                        <div className="flex items-center gap-2">
                          <i className="ri-check-line text-amber-700"></i>
                          No condition assessment needed
                        </div>
                        <div className="flex items-center gap-2">
                          <i className="ri-check-line text-amber-700"></i>
                          Sent directly to CDC disposal team
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          if (!hasDepartmentAssigned) {
                            setError('Your account must have an assigned department before you can continue.');
                            return;
                          }
                          setSelectedCategory(hazardousCategory.id);
                          router.push('/hazardous-submission');
                        }}
                        className="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-all"
                      >
                        Open Hazardous Form
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {selectedCategory && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => {
                      if (!hasDepartmentAssigned) {
                        setError('Your account must have an assigned department before you can continue.');
                        return;
                      }

                      if (selectedCategory === 'hazardous-consumables') {
                        router.push('/hazardous-submission');
                        return;
                      }

                      router.push(`/device-condition?category=${encodeURIComponent(selectedCategory)}`);
                    }}
                    disabled={!hasDepartmentAssigned}
                    className={`${isHazardousSelected ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-500 hover:bg-green-600'} text-white px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap`}
                  >
                    {isHazardousSelected ? 'Continue to Hazardous Submission' : 'Continue'}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Device Condition */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div
                  onClick={() => setDeviceCondition('working')}
                  className={`p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    deviceCondition === 'working'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-gift-line text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">Working Device</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-500"></i>
                      Powers on and functions normally
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-500"></i>
                      Screen/display works properly
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-check-line text-green-500"></i>
                      No major physical damage
                    </li>
                  </ul>
                  <div className="text-center mt-6">
                    <div className="text-3xl font-bold text-green-600">{deviceCategories.find(cat => cat.id === selectedCategory)?.workingPoints} Points</div>
                    <div className="text-sm text-gray-600 font-semibold">Will be DONATED to community</div>
                  </div>
                </div>

                <div
                  onClick={() => setDeviceCondition('broken')}
                  className={`p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    deviceCondition === 'broken'
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-orange-300'
                  }`}
                >
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <i className="ri-recycle-line text-white text-2xl"></i>
                  </div>
                  <h3 className="text-2xl font-bold text-center mb-4">Broken Device</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <i className="ri-close-line text-orange-500"></i>
                      Doesn't power on or has major issues
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-close-line text-orange-500"></i>
                      Cracked screen or damaged parts
                    </li>
                    <li className="flex items-center gap-2">
                      <i className="ri-close-line text-orange-500"></i>
                      Not suitable for reuse
                    </li>
                  </ul>
                  <div className="text-center mt-6">
                    <div className="text-3xl font-bold text-orange-600">{deviceCategories.find(cat => cat.id === selectedCategory)?.brokenPoints} Points</div>
                    <div className="text-sm text-gray-600 font-semibold">Will be RECYCLED responsibly</div>
                  </div>
                </div>
              </div>

              {deviceCondition && (
                <div className="text-center mt-8">
                  <button
                    onClick={() => hasDepartmentAssigned && setStep(3)}
                    disabled={!hasDepartmentAssigned}
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap"
                  >
                    Continue
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Device Details & Submit */}
          {step === 3 && (
            <div className="bg-white rounded-2xl shadow-lg p-8">

              {/* CDC Asset Surrender Fields */}
              <div className="mb-8 border-l-4 border-blue-500 bg-blue-50 rounded-r-xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <i className="ri-building-2-line text-blue-600 text-xl"></i>
                  <h4 className="font-semibold text-blue-800">CDC Asset Details</h4>
                </div>
                <p className="text-sm text-blue-700 mb-5">
                  Enter the official CDC property and serial numbers found on the asset tag.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-2">Property Number *</label>
                    <input
                      type="text"
                      value={propertyNumber}
                      onChange={(e) => setPropertyNumber(e.target.value)}
                      className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="e.g., 66975"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-800 mb-2">Serial Number *</label>
                    <input
                      type="text"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="e.g., 1H35310JDG"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                  <input
                    type="text"
                    value={deviceDetails.brand}
                    onChange={(e) => setDeviceDetails({...deviceDetails, brand: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Samsung, Apple, HP"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Model *</label>
                  <input
                    type="text"
                    value={deviceDetails.model}
                    onChange={(e) => setDeviceDetails({...deviceDetails, model: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="e.g., Galaxy S21, iPhone 12, Pavilion"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Description</label>
                  <textarea
                    value={deviceDetails.description}
                    onChange={(e) => setDeviceDetails({...deviceDetails, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any additional details about the device condition, accessories included, etc."
                    maxLength={500}
                  />
                  <p className="text-sm text-gray-500 mt-1">{deviceDetails.description.length}/500 characters</p>
                </div>
              </div>

              {/* Impact Preview */}
              <div className="p-6 bg-green-50 rounded-xl mb-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Impact Preview</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600">{calculatePoints()}</div>
                    <div className="text-sm text-gray-600">Eco Points</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{calculateCO2()}</div>
                    <div className="text-sm text-gray-600">kg CO₂ Saved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {deviceCondition === 'working' ? 'Donated' : 'Recycled'}
                    </div>
                    <div className="text-sm text-gray-600">Device Path</div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={handleSubmitDonation}
                  disabled={!isSubmitEnabled}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap text-lg flex items-center justify-center gap-2 mx-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <i className="ri-recycle-line"></i>
                      Submit CDC Asset Surrender
                    </>
                  )}
                </button>
                <p className="text-gray-600 mt-4">
                  {deviceCondition === 'working' 
                    ? 'Your working device will be donated to help someone in need.' 
                    : 'Your device will be recycled responsibly to protect the environment.'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && donationResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <i className="ri-check-line text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Donation Submitted!</h3>
              <p className="text-gray-600 mb-6">Thank you for your contribution to e-waste management.</p>
              
              <div className="bg-green-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 font-medium">Eco Points Earned</span>
                  <span className="text-2xl font-bold text-green-600">+{donationResult.eco_points_earned || 0}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-medium">CO₂ Saved</span>
                  <span className="text-lg font-semibold text-green-600">{donationResult.co2_saved || 0} kg</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    router.push('/dashboard');
                  }}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition font-medium"
                >
                  View Dashboard
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    window.location.reload();
                  }}
                  className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  Donate Another Device
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense fallback={null}>
      <DonatePageContent />
    </Suspense>
  );
}

const deviceCategories = [
  { id: 'smartphone', name: 'Smartphone', icon: 'ri-smartphone-line', workingPoints: 75, brokenPoints: 35 },
  { id: 'laptop', name: 'Laptop', icon: 'ri-computer-line', workingPoints: 150, brokenPoints: 75 },
  { id: 'tablet', name: 'Tablet', icon: 'ri-tablet-line', workingPoints: 90, brokenPoints: 45 },
  { id: 'desktop', name: 'Desktop', icon: 'ri-computer-line', workingPoints: 120, brokenPoints: 60 },
  { id: 'appliance', name: 'Small Appliance', icon: 'ri-device-line', workingPoints: 60, brokenPoints: 30 },
  { id: 'battery', name: 'Battery', icon: 'ri-battery-line', workingPoints: 25, brokenPoints: 15 },
  { id: 'cable', name: 'Cables/Chargers', icon: 'ri-usb-line', workingPoints: 15, brokenPoints: 8 },
  { id: 'headphones', name: 'Headphones', icon: 'ri-headphone-line', workingPoints: 40, brokenPoints: 20 },
  { id: 'hazardous-consumables', name: 'Hazardous Waste & Consumables', icon: 'ri-flask-line', workingPoints: 0, brokenPoints: 0 }
];
