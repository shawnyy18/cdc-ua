(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/redirectAdmin.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "redirectIfAdmin",
    ()=>redirectIfAdmin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-client] (ecmascript) <locals>");
;
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://kgwndoatphthxmjuxhif.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnd25kb2F0cGh0aHhtanV4aGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTU3MjYsImV4cCI6MjA4NjQ3MTcyNn0.bLZ4yIk2cy4IpC2udj-TkF_F_Q4hv1twiGx2nYUiNZI"));
async function redirectIfAdmin() {
    try {
        // Get current user
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
            return false;
        }
        // Fetch user profile to check is_admin flag
        const { data: userProfile, error } = await supabase.from('users').select('is_admin').eq('id', session.user.id).single();
        if (error) {
            console.error('Error checking admin status:', error);
            return false;
        }
        // If user is admin, redirect to admin dashboard
        if (userProfile?.is_admin === true) {
            console.log('Admin user detected, redirecting to admin dashboard');
            if ("TURBOPACK compile-time truthy", 1) {
                window.location.href = '/admin';
            }
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error in redirectIfAdmin:', error);
        return false;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/donate/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DonatePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
// ProfileDropdown is now provided by the global Navbar in app/layout.tsx
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/storage.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redirectAdmin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/redirectAdmin.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function DonatePageContent() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const [step, setStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deviceCondition, setDeviceCondition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deviceDetails, setDeviceDetails] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        brand: '',
        model: '',
        year: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // CDC asset mode is always on — this system is for CDC only
    const isCDCAsset = true;
    const [propertyNumber, setPropertyNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [serialNumber, setSerialNumber] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // refreshTrigger was previously only used for the page-level ProfileDropdown
    // which is now provided globally by the Navbar.
    const [showSuccessModal, setShowSuccessModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [donationResult, setDonationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isInitialized, setIsInitialized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isHazardousSelected = selectedCategory === 'hazardous-consumables';
    // Refs to prevent infinite loops
    const userDataRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const makeAuthenticatedRequest = async (url, options = {})=>{
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
                        ...userId ? {
                            'x-user-id': userId
                        } : {},
                        ...options.headers || {}
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
                    ...userId ? {
                        'x-user-id': userId
                    } : {},
                    ...options.headers || {}
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
    // Check authentication without invalidating token
    const checkAuth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DonatePageContent.useCallback[checkAuth]": ()=>{
            const token = localStorage.getItem('ecokonek_token');
            const userData = localStorage.getItem('ecokonek_user');
            if (!token || !userData) {
                router.push('/login');
                return null;
            }
            try {
                const parsedUser = JSON.parse(userData);
                return {
                    token,
                    userData: parsedUser
                };
            } catch (error) {
                console.error('Error parsing user data:', error);
                localStorage.removeItem('ecokonek_token');
                localStorage.removeItem('ecokonek_user');
                router.push('/login');
                return null;
            }
        }
    }["DonatePageContent.useCallback[checkAuth]"], [
        router
    ]);
    // Enhanced user data loading with memoization
    const loadUserData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DonatePageContent.useCallback[loadUserData]": async ()=>{
            if (isInitialized) return;
            try {
                // Check if user is admin and redirect if so
                const isAdmin = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$redirectAdmin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["redirectIfAdmin"])();
                if (isAdmin) {
                    console.log('Admin user redirected to admin dashboard');
                    return;
                }
                const auth = checkAuth();
                if (!auth) return;
                setUser(auth.userData);
                userDataRef.current = auth.userData;
                // Fetch real user data from backend
                try {
                    const data = await makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, {
                        method: 'POST',
                        body: JSON.stringify({
                            action: 'get-profile'
                        })
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
                        });
                        setUser(updatedUser);
                        userDataRef.current = updatedUser;
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveUserToLocalStorage"])(updatedUser);
                    }
                } catch (error) {
                    console.error('Failed to fetch real user data:', error);
                // Continue with stored user data
                }
                setIsInitialized(true);
            } catch (error) {
                console.error('Error loading user data:', error);
            }
        }
    }["DonatePageContent.useCallback[loadUserData]"], [
        checkAuth,
        isInitialized
    ]);
    // Initialize on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DonatePageContent.useEffect": ()=>{
            loadUserData();
        }
    }["DonatePageContent.useEffect"], [
        loadUserData
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DonatePageContent.useEffect": ()=>{
            if (!isInitialized) return;
            const handleStorageChange = {
                "DonatePageContent.useEffect.handleStorageChange": ()=>{
                    loadUserData();
                }
            }["DonatePageContent.useEffect.handleStorageChange"];
            window.addEventListener('storage', handleStorageChange);
            return ({
                "DonatePageContent.useEffect": ()=>{
                    window.removeEventListener('storage', handleStorageChange);
                }
            })["DonatePageContent.useEffect"];
        }
    }["DonatePageContent.useEffect"], [
        isInitialized,
        loadUserData
    ]);
    const calculatePoints = ()=>{
        const category = deviceCategories.find((cat)=>cat.id === selectedCategory);
        if (!category) return 0;
        if (selectedCategory === 'hazardous-consumables') return 0;
        return deviceCondition === 'working' ? category.workingPoints : category.brokenPoints;
    };
    const calculateCO2 = ()=>{
        const co2Map = {
            'smartphone': {
                working: 8.5,
                broken: 4.2
            },
            'laptop': {
                working: 18.7,
                broken: 9.4
            },
            'tablet': {
                working: 11.3,
                broken: 5.7
            },
            'desktop': {
                working: 22.1,
                broken: 11.1
            },
            'appliance': {
                working: 7.8,
                broken: 3.9
            },
            'battery': {
                working: 3.2,
                broken: 1.6
            },
            'cable': {
                working: 1.5,
                broken: 0.8
            },
            'headphones': {
                working: 5.4,
                broken: 2.7
            },
            'hazardous-consumables': {
                working: 0,
                broken: 0
            }
        };
        const key = selectedCategory;
        const co2Data = co2Map[key];
        if (!co2Data) return 0;
        return Math.round((deviceCondition === 'working' ? co2Data.working : co2Data.broken) * 100) / 100;
    };
    const handleSubmitDonation = async ()=>{
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
                    deviceType: deviceCategories.find((cat)=>cat.id === selectedCategory)?.name || selectedCategory,
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
                const updatedUser = {
                    ...auth.userData
                };
                if (data.newStats) {
                    updatedUser.eco_points = data.newStats.eco_points;
                    updatedUser.total_donations = data.newStats.total_donations;
                    updatedUser.total_co2_saved = data.newStats.total_co2_saved;
                    updatedUser.donated_devices = data.newStats.donated_devices;
                    updatedUser.recycled_devices = data.newStats.recycled_devices;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$storage$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveUserToLocalStorage"])(updatedUser);
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
        } catch (err) {
            console.error('Donation submission error:', err);
            if (err.message.includes('HTTP 400')) {
                setError('Invalid submission data. Please check all fields and try again.');
            } else if (err.message.includes('HTTP 403')) {
                setError('Your account must have an assigned department before you can donate or recycle.');
            } else if (err.message.includes('HTTP 401')) {
                setError('Session expired. Please log in again.');
                setTimeout(()=>{
                    localStorage.removeItem('ecokonek_token');
                    localStorage.removeItem('ecokonek_user');
                    router.push('/login');
                }, 2000);
            } else if (err.message.includes('HTTP 500')) {
                setError('Server error. Please try again in a moment.');
            } else {
                setError('Network error. Please check your connection and try again.');
            }
        } finally{
            setIsSubmitting(false);
        }
    };
    // Logout is handled by the global ProfileDropdown in the Navbar.
    // Cleanup on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DonatePageContent.useEffect": ()=>{
            return ({
                "DonatePageContent.useEffect": ()=>{
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                    }
                }
            })["DonatePageContent.useEffect"];
        }
    }["DonatePageContent.useEffect"], []);
    // Deep-link into Step 3 after selecting category/condition from separate pages.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DonatePageContent.useEffect": ()=>{
            if (!searchParams) return;
            if (!user?.department_id) return;
            const categoryFromQuery = searchParams.get('category');
            const conditionFromQuery = searchParams.get('condition');
            if (!categoryFromQuery) return;
            setSelectedCategory(categoryFromQuery);
            if (conditionFromQuery && [
                'working',
                'broken'
            ].includes(conditionFromQuery)) {
                setDeviceCondition(conditionFromQuery);
                setStep(3);
                return;
            }
            setStep(2);
        }
    }["DonatePageContent.useEffect"], [
        searchParams,
        user?.department_id
    ]);
    if (!user || !isInitialized) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "[project]/app/donate/page.tsx",
                        lineNumber: 402,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600",
                        children: "Loading..."
                    }, void 0, false, {
                        fileName: "[project]/app/donate/page.tsx",
                        lineNumber: 403,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/donate/page.tsx",
                lineNumber: 401,
                columnNumber: 7
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/donate/page.tsx",
            lineNumber: 400,
            columnNumber: 12
        }, this);
    }
    const hasDepartmentAssigned = Boolean(user?.department_id);
    // Check if submit button should be enabled
    const requiresCondition = !isHazardousSelected;
    const standardDeviceCategories = deviceCategories.filter((category)=>category.id !== 'hazardous-consumables');
    const hazardousCategory = deviceCategories.find((category)=>category.id === 'hazardous-consumables');
    const isSubmitEnabled = hasDepartmentAssigned && selectedCategory && (!requiresCondition || deviceCondition) && deviceDetails.brand?.trim() && deviceDetails.model?.trim() && propertyNumber.trim() && serialNumber.trim() && !isSubmitting;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-green-50 to-emerald-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-6 py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto mb-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center mb-8",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>hasDepartmentAssigned && setStep(1),
                                            className: `w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer transition-all hover:scale-105 ${step >= 1 ? 'bg-green-500' : 'bg-gray-300'}`,
                                            children: "1"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 432,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-24 h-1 ${step >= 2 ? 'bg-green-500' : 'bg-gray-300'}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 438,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>hasDepartmentAssigned && selectedCategory && setStep(2),
                                            className: `w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-all hover:scale-105 ${step >= 2 ? 'bg-green-500 cursor-pointer' : selectedCategory ? 'bg-gray-300 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`,
                                            children: "2"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 439,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `w-24 h-1 ${step >= 3 ? 'bg-green-500' : 'bg-gray-300'}`
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 445,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            onClick: ()=>hasDepartmentAssigned && selectedCategory && deviceCondition && setStep(3),
                                            className: `w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold transition-all hover:scale-105 ${step >= 3 ? 'bg-green-500 cursor-pointer' : selectedCategory && deviceCondition ? 'bg-gray-300 cursor-pointer' : 'bg-gray-300 cursor-not-allowed'}`,
                                            children: "3"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 446,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/donate/page.tsx",
                                    lineNumber: 431,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 430,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl font-bold text-gray-800 mb-2",
                                        children: [
                                            step === 1 && 'Choose a Device Category',
                                            step === 2 && 'Assess Condition',
                                            step === 3 && 'Device Details & Submit'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 456,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600",
                                        children: [
                                            step === 1 && 'Select the type of device you want to donate',
                                            step === 2 && 'Help us determine the best path for your device',
                                            step === 3 && 'Provide additional information and complete your donation'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 461,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 455,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/donate/page.tsx",
                        lineNumber: 429,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-4xl mx-auto",
                        children: [
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "ri-error-warning-line text-red-500"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 473,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-red-700 text-sm",
                                            children: error
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 474,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/donate/page.tsx",
                                    lineNumber: 472,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 471,
                                columnNumber: 13
                            }, this),
                            !hasDepartmentAssigned && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-start gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                            className: "ri-alert-line text-amber-600 mt-0.5"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 482,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-amber-800 text-sm",
                                            children: "Your account has no designated department yet. Donation and recycling are locked until an admin assigns your department."
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 483,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/donate/page.tsx",
                                    lineNumber: 481,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 480,
                                columnNumber: 13
                            }, this),
                            step === 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-lg p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid lg:grid-cols-[2fr_1fr] gap-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "rounded-xl border border-green-100 bg-green-50/40 p-5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between mb-4",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "text-lg font-semibold text-gray-800",
                                                                children: "Standard Devices"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 496,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-semibold px-3 py-1 rounded-full bg-green-100 text-green-700",
                                                                children: "Donation or Recycling"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 497,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 495,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 md:grid-cols-3 gap-4",
                                                        children: standardDeviceCategories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                onClick: ()=>hasDepartmentAssigned && setSelectedCategory(category.id),
                                                                className: `p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 text-center ${selectedCategory === category.id ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'}`,
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "w-12 h-12 flex items-center justify-center mx-auto mb-3",
                                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                            className: `${category.icon} text-3xl ${selectedCategory === category.id ? 'text-green-500' : 'text-gray-400'}`
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/donate/page.tsx",
                                                                            lineNumber: 513,
                                                                            columnNumber: 27
                                                                        }, this)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 512,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                                        className: "font-semibold text-gray-800 mb-1",
                                                                        children: category.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 515,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-xs text-green-600",
                                                                        children: [
                                                                            category.brokenPoints,
                                                                            "-",
                                                                            category.workingPoints,
                                                                            " points"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 516,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, category.id, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 503,
                                                                columnNumber: 23
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 501,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 494,
                                                columnNumber: 17
                                            }, this),
                                            hazardousCategory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>hasDepartmentAssigned && setSelectedCategory(hazardousCategory.id),
                                                className: `rounded-xl border-2 p-5 cursor-pointer transition-all duration-300 relative overflow-hidden ${isHazardousSelected ? 'border-amber-500 bg-amber-50 shadow-md' : 'border-amber-200 bg-amber-50/70 hover:border-amber-400 hover:bg-amber-50'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute -right-8 -top-8 w-24 h-24 rounded-full bg-amber-200/40"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 531,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-800 mb-4",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-alert-line"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 534,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    "Special Handling"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 533,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center mb-3",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                    className: `${hazardousCategory.icon} text-2xl`
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/donate/page.tsx",
                                                                    lineNumber: 538,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 537,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                className: "font-bold text-gray-900 mb-2",
                                                                children: hazardousCategory.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 540,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "text-sm text-amber-900/90 mb-4",
                                                                children: "Batteries, chemicals, and hazardous consumables are routed to a dedicated safe disposal workflow."
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 541,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2 text-xs text-amber-900/80 mb-5",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                className: "ri-check-line text-amber-700"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/donate/page.tsx",
                                                                                lineNumber: 546,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            "No condition assessment needed"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 545,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                className: "ri-check-line text-amber-700"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/app/donate/page.tsx",
                                                                                lineNumber: 550,
                                                                                columnNumber: 27
                                                                            }, this),
                                                                            "Sent directly to CDC disposal team"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 549,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 544,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                type: "button",
                                                                onClick: (event)=>{
                                                                    event.stopPropagation();
                                                                    if (!hasDepartmentAssigned) {
                                                                        setError('Your account must have an assigned department before you can continue.');
                                                                        return;
                                                                    }
                                                                    setSelectedCategory(hazardousCategory.id);
                                                                    router.push('/hazardous-submission');
                                                                },
                                                                className: "w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-all",
                                                                children: "Open Hazardous Form"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 555,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 532,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 523,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 493,
                                        columnNumber: 15
                                    }, this),
                                    selectedCategory && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mt-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>{
                                                if (!hasDepartmentAssigned) {
                                                    setError('Your account must have an assigned department before you can continue.');
                                                    return;
                                                }
                                                if (selectedCategory === 'hazardous-consumables') {
                                                    router.push('/hazardous-submission');
                                                    return;
                                                }
                                                router.push(`/device-condition?category=${encodeURIComponent(selectedCategory)}`);
                                            },
                                            disabled: !hasDepartmentAssigned,
                                            className: `${isHazardousSelected ? 'bg-amber-600 hover:bg-amber-700' : 'bg-green-500 hover:bg-green-600'} text-white px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap`,
                                            children: isHazardousSelected ? 'Continue to Hazardous Submission' : 'Continue'
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 577,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 576,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 492,
                                columnNumber: 13
                            }, this),
                            step === 2 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-lg p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-2 gap-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>setDeviceCondition('working'),
                                                className: `p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${deviceCondition === 'working' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-gift-line text-white text-2xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/donate/page.tsx",
                                                            lineNumber: 614,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 613,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-bold text-center mb-4",
                                                        children: "Working Device"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 616,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "space-y-2 text-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-check-line text-green-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 619,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Powers on and functions normally"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 618,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-check-line text-green-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 623,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Screen/display works properly"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 622,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-check-line text-green-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 627,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "No major physical damage"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 626,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 617,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center mt-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-3xl font-bold text-green-600",
                                                                children: [
                                                                    deviceCategories.find((cat)=>cat.id === selectedCategory)?.workingPoints,
                                                                    " Points"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 632,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-600 font-semibold",
                                                                children: "Will be DONATED to community"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 633,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 631,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 605,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                onClick: ()=>setDeviceCondition('broken'),
                                                className: `p-8 rounded-xl border-2 cursor-pointer transition-all duration-300 ${deviceCondition === 'broken' ? 'border-orange-500 bg-orange-50' : 'border-gray-200 hover:border-orange-300'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-recycle-line text-white text-2xl"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/donate/page.tsx",
                                                            lineNumber: 646,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 645,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-2xl font-bold text-center mb-4",
                                                        children: "Broken Device"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 648,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                        className: "space-y-2 text-gray-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-orange-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 651,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Doesn't power on or has major issues"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 650,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-orange-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 655,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Cracked screen or damaged parts"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 654,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "flex items-center gap-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "ri-close-line text-orange-500"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/donate/page.tsx",
                                                                        lineNumber: 659,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Not suitable for reuse"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 658,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-center mt-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-3xl font-bold text-orange-600",
                                                                children: [
                                                                    deviceCategories.find((cat)=>cat.id === selectedCategory)?.brokenPoints,
                                                                    " Points"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 664,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-600 font-semibold",
                                                                children: "Will be RECYCLED responsibly"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 665,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 663,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 637,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 604,
                                        columnNumber: 15
                                    }, this),
                                    deviceCondition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center mt-8",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>hasDepartmentAssigned && setStep(3),
                                            disabled: !hasDepartmentAssigned,
                                            className: "bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap",
                                            children: "Continue"
                                        }, void 0, false, {
                                            fileName: "[project]/app/donate/page.tsx",
                                            lineNumber: 672,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 671,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 603,
                                columnNumber: 13
                            }, this),
                            step === 3 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-lg p-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mb-8 border-l-4 border-blue-500 bg-blue-50 rounded-r-xl p-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-building-2-line text-blue-600 text-xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 691,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                        className: "font-semibold text-blue-800",
                                                        children: "CDC Asset Details"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 692,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 690,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm text-blue-700 mb-5",
                                                children: "Enter the official CDC property and serial numbers found on the asset tag."
                                            }, void 0, false, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 694,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid md:grid-cols-2 gap-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-blue-800 mb-2",
                                                                children: "Property Number *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 699,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: propertyNumber,
                                                                onChange: (e)=>setPropertyNumber(e.target.value),
                                                                className: "w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white",
                                                                placeholder: "e.g., 66975",
                                                                required: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 700,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 698,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "block text-sm font-medium text-blue-800 mb-2",
                                                                children: "Serial Number *"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 710,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "text",
                                                                value: serialNumber,
                                                                onChange: (e)=>setSerialNumber(e.target.value),
                                                                className: "w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white",
                                                                placeholder: "e.g., 1H35310JDG",
                                                                required: true
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 711,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 709,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 697,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 689,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid md:grid-cols-2 gap-8 mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                                        children: "Brand *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 725,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: deviceDetails.brand,
                                                        onChange: (e)=>setDeviceDetails({
                                                                ...deviceDetails,
                                                                brand: e.target.value
                                                            }),
                                                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",
                                                        placeholder: "e.g., Samsung, Apple, HP",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 726,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 724,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                                        children: "Model *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 737,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: deviceDetails.model,
                                                        onChange: (e)=>setDeviceDetails({
                                                                ...deviceDetails,
                                                                model: e.target.value
                                                            }),
                                                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",
                                                        placeholder: "e.g., Galaxy S21, iPhone 12, Pavilion",
                                                        required: true
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 738,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 736,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "md:col-span-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                                        children: "Additional Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 749,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: deviceDetails.description,
                                                        onChange: (e)=>setDeviceDetails({
                                                                ...deviceDetails,
                                                                description: e.target.value
                                                            }),
                                                        rows: 4,
                                                        className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent",
                                                        placeholder: "Any additional details about the device condition, accessories included, etc.",
                                                        maxLength: 500
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 750,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500 mt-1",
                                                        children: [
                                                            deviceDetails.description.length,
                                                            "/500 characters"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 758,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 748,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 723,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 bg-green-50 rounded-xl mb-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                className: "text-lg font-semibold text-gray-800 mb-4",
                                                children: "Your Impact Preview"
                                            }, void 0, false, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 764,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-3 gap-4 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-green-600",
                                                                children: calculatePoints()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 767,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-600",
                                                                children: "Eco Points"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 768,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 766,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-green-600",
                                                                children: calculateCO2()
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 771,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-600",
                                                                children: "kg CO₂ Saved"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 772,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 770,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-bold text-green-600",
                                                                children: deviceCondition === 'working' ? 'Donated' : 'Recycled'
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 775,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-600",
                                                                children: "Device Path"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/donate/page.tsx",
                                                                lineNumber: 778,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/donate/page.tsx",
                                                        lineNumber: 774,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 765,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 763,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: handleSubmitDonation,
                                                disabled: !isSubmitEnabled,
                                                className: "bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white px-8 py-3 rounded-full font-semibold transition-all whitespace-nowrap text-lg flex items-center justify-center gap-2 mx-auto",
                                                children: isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/donate/page.tsx",
                                                            lineNumber: 791,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Processing..."
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-recycle-line"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/donate/page.tsx",
                                                            lineNumber: 796,
                                                            columnNumber: 23
                                                        }, this),
                                                        "Submit CDC Asset Surrender"
                                                    ]
                                                }, void 0, true)
                                            }, void 0, false, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 784,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gray-600 mt-4",
                                                children: deviceCondition === 'working' ? 'Your working device will be donated to help someone in need.' : 'Your device will be recycled responsibly to protect the environment.'
                                            }, void 0, false, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 801,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 783,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 686,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/donate/page.tsx",
                        lineNumber: 469,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/donate/page.tsx",
                lineNumber: 427,
                columnNumber: 7
            }, this),
            showSuccessModal && donationResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "ri-check-line text-green-600 text-2xl"
                                }, void 0, false, {
                                    fileName: "[project]/app/donate/page.tsx",
                                    lineNumber: 819,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 818,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-bold text-gray-900 mb-2",
                                children: "Donation Submitted!"
                            }, void 0, false, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 821,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-600 mb-6",
                                children: "Thank you for your contribution to e-waste management."
                            }, void 0, false, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 822,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-green-50 rounded-lg p-4 mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center mb-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-700 font-medium",
                                                children: "Eco Points Earned"
                                            }, void 0, false, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 826,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-2xl font-bold text-green-600",
                                                children: [
                                                    "+",
                                                    donationResult.eco_points_earned || 0
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 827,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 825,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex justify-between items-center",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-gray-700 font-medium",
                                                children: "CO₂ Saved"
                                            }, void 0, false, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 830,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-lg font-semibold text-green-600",
                                                children: [
                                                    donationResult.co2_saved || 0,
                                                    " kg"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/donate/page.tsx",
                                                lineNumber: 831,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 829,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 824,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowSuccessModal(false);
                                            router.push('/dashboard');
                                        },
                                        className: "w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition font-medium",
                                        children: "View Dashboard"
                                    }, void 0, false, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 836,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setShowSuccessModal(false);
                                            window.location.reload();
                                        },
                                        className: "w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition font-medium",
                                        children: "Donate Another Device"
                                    }, void 0, false, {
                                        fileName: "[project]/app/donate/page.tsx",
                                        lineNumber: 845,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/donate/page.tsx",
                                lineNumber: 835,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/donate/page.tsx",
                        lineNumber: 817,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/donate/page.tsx",
                    lineNumber: 816,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/donate/page.tsx",
                lineNumber: 815,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/donate/page.tsx",
        lineNumber: 424,
        columnNumber: 5
    }, this);
}
_s(DonatePageContent, "tqt8I9LD/FE35xDKpIl1n9wRHIQ=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"]
    ];
});
_c = DonatePageContent;
function DonatePage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
        fallback: null,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DonatePageContent, {}, void 0, false, {
            fileName: "[project]/app/donate/page.tsx",
            lineNumber: 866,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/donate/page.tsx",
        lineNumber: 865,
        columnNumber: 5
    }, this);
}
_c1 = DonatePage;
const deviceCategories = [
    {
        id: 'smartphone',
        name: 'Smartphone',
        icon: 'ri-smartphone-line',
        workingPoints: 75,
        brokenPoints: 35
    },
    {
        id: 'laptop',
        name: 'Laptop',
        icon: 'ri-computer-line',
        workingPoints: 150,
        brokenPoints: 75
    },
    {
        id: 'tablet',
        name: 'Tablet',
        icon: 'ri-tablet-line',
        workingPoints: 90,
        brokenPoints: 45
    },
    {
        id: 'desktop',
        name: 'Desktop',
        icon: 'ri-computer-line',
        workingPoints: 120,
        brokenPoints: 60
    },
    {
        id: 'appliance',
        name: 'Small Appliance',
        icon: 'ri-device-line',
        workingPoints: 60,
        brokenPoints: 30
    },
    {
        id: 'battery',
        name: 'Battery',
        icon: 'ri-battery-line',
        workingPoints: 25,
        brokenPoints: 15
    },
    {
        id: 'cable',
        name: 'Cables/Chargers',
        icon: 'ri-usb-line',
        workingPoints: 15,
        brokenPoints: 8
    },
    {
        id: 'headphones',
        name: 'Headphones',
        icon: 'ri-headphone-line',
        workingPoints: 40,
        brokenPoints: 20
    },
    {
        id: 'hazardous-consumables',
        name: 'Hazardous Waste & Consumables',
        icon: 'ri-flask-line',
        workingPoints: 0,
        brokenPoints: 0
    }
];
var _c, _c1;
__turbopack_context__.k.register(_c, "DonatePageContent");
__turbopack_context__.k.register(_c1, "DonatePage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_47456362._.js.map