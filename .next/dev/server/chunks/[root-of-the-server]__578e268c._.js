module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/supabase/functions/user-profile/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
;
const runtime = 'nodejs';
// Simple in-memory cache for user profiles (cache for 30 seconds)
const profileCache = new Map();
const CACHE_TTL = 60000 // 60 seconds
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://kgwndoatphthxmjuxhif.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnd25kb2F0cGh0aHhtanV4aGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTU3MjYsImV4cCI6MjA4NjQ3MTcyNn0.bLZ4yIk2cy4IpC2udj-TkF_F_Q4hv1twiGx2nYUiNZI");
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
async function POST(request) {
    try {
        const body = await request.json();
        const { action } = body;
        // Base Supabase client (no user auth)
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });
        // Get user from authorization header and/or x-user-id
        const authHeader = request.headers.get('Authorization');
        const userIdHeader = request.headers.get('x-user-id');
        let userId = null;
        let authToken = null;
        // Helper: decode JWT payload safely to extract `sub` without verifying signature
        const decodeJwtSub = (token)=>{
            try {
                const parts = token.split('.');
                if (parts.length !== 3) return null;
                const payload = JSON.parse(Buffer.from(parts[1].replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8'));
                return payload?.sub || null;
            } catch  {
                return null;
            }
        };
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const tokenCandidate = authHeader.replace('Bearer ', '');
            authToken = tokenCandidate;
            // Fast-path: decode JWT locally — no Supabase network round-trip needed here.
            // Security is enforced by RLS (authedClient) and the admin client fallback below.
            userId = decodeJwtSub(tokenCandidate);
        }
        // If we have a token, create an authed client so RLS sees auth.uid()
        const authedClient = authToken ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            },
            global: {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        }) : null;
        // Always create admin client if available (used only as fallback for expired tokens)
        const adminClient = supabaseServiceKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        }) : null;
        // Fallback to x-user-id if token missing or cannot decode `sub`
        if (!userId && userIdHeader) {
            userId = userIdHeader;
        }
        switch(action){
            case 'get-profile':
                if (!userId && !authedClient && !adminClient) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Authentication required',
                        success: false
                    }, {
                        status: 401
                    });
                }
                // Check cache first
                const cacheKey = `profile_${userId}`;
                const cached = profileCache.get(cacheKey);
                if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
                    console.log('[get-profile] Returning cached data for:', userId);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(cached.data);
                }
                // Prefer authed/admin client so RLS recognizes auth.uid(); fallback to admin on expired JWT
                const profileClient = authedClient || adminClient || supabase;
                // Add timeout wrapper to prevent hanging requests
                const fetchWithTimeout = (promise, timeoutMs = 30000)=>{
                    const timeoutPromise = new Promise((_, reject)=>setTimeout(()=>reject(new Error('Request timeout')), timeoutMs));
                    return Promise.race([
                        promise,
                        timeoutPromise
                    ]);
                };
                let userProfile = null;
                let profileError = null;
                try {
                    console.log('[get-profile] Querying users table for id:', userId);
                    const startTime = Date.now();
                    const result = await fetchWithTimeout(Promise.resolve(profileClient.from('users').select('*, barangays(name, municipality)').eq('id', userId).maybeSingle()));
                    const duration = Date.now() - startTime;
                    console.log(`[get-profile] Query complete in ${duration}ms`);
                    userProfile = result.data;
                    profileError = result.error;
                } catch (err) {
                    if (err && err.message === 'Request timeout') {
                        console.error('[get-profile] error: Request timeout');
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Request timeout',
                            success: false
                        }, {
                            status: 504
                        });
                    }
                    console.error('[get-profile] Query failed:', err);
                    profileError = err;
                }
                if (profileError && adminClient && (/JWT expired/i.test(profileError.message || '') || profileError?.code === 'PGRST303')) {
                    try {
                        const result = await fetchWithTimeout(Promise.resolve(adminClient.from('users').select('*').eq('id', userId).maybeSingle()));
                        userProfile = result.data;
                        profileError = result.error;
                    } catch (err) {
                        profileError = err;
                    }
                }
                if (profileError) {
                    // Log full error object for backend visibility
                    console.error('[get-profile] error:', profileError);
                    // Return detailed error info for frontend debugging
                    const errorDetails = {
                        code: profileError?.code || null,
                        message: profileError?.message || profileError?.toString() || 'Unknown error',
                        hint: profileError?.hint || null,
                        details: profileError?.details || null
                    };
                    if (errorDetails.code === 'PGRST303' || /JWT expired/i.test(errorDetails.message)) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Session expired',
                            success: false,
                            details: errorDetails
                        }, {
                            status: 401
                        });
                    }
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Failed to fetch user profile',
                        success: false,
                        details: errorDetails
                    }, {
                        status: 500
                    });
                }
                if (!userProfile && adminClient && userId) {
                    // Attempt to create missing profile using admin client
                    try {
                        // Try to extract registration data from request body if available
                        let regData = {};
                        try {
                            regData = typeof body === 'object' ? body : {};
                        } catch  {}
                        const newProfile = {
                            id: userId,
                            email: regData.email || '',
                            full_name: regData.full_name || regData.name || regData.username || 'User',
                            username: regData.username || regData.full_name || regData.name || 'user',
                            phone: regData.phone || '',
                            bio: '',
                            location: '',
                            profile_image_url: '',
                            is_active: true,
                            eco_points: 0,
                            total_donations: 0,
                            total_co2_saved: 0,
                            donated_devices: 0,
                            recycled_devices: 0,
                            created_at: new Date().toISOString(),
                            updated_at: new Date().toISOString()
                        };
                        const { error: insertError } = await adminClient.from('users').insert(newProfile);
                        if (!insertError) {
                            // Fetch the newly created profile
                            const { data: createdProfile, error: fetchError } = await adminClient.from('users').select('*').eq('id', userId).maybeSingle();
                            if (createdProfile) {
                                userProfile = createdProfile;
                            }
                        }
                    } catch (err) {
                    // ignore, fallback to error below
                    }
                }
                if (!userProfile) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'User profile not found',
                        success: false
                    }, {
                        status: 404
                    });
                }
                const userData = {
                    id: userProfile.id,
                    email: userProfile.email,
                    full_name: userProfile.full_name || 'User',
                    username: userProfile.username || 'user',
                    phone: userProfile.phone || '',
                    bio: userProfile.bio || '',
                    location: userProfile.location || '',
                    interests: Array.isArray(userProfile.interests) ? userProfile.interests : [],
                    is_public: userProfile.is_public !== false,
                    profile_image_url: userProfile.profile_image_url || '',
                    eco_points: userProfile.eco_points || 0,
                    total_donations: userProfile.total_donations || 0,
                    total_co2_saved: userProfile.total_co2_saved || 0,
                    donated_devices: userProfile.donated_devices || 0,
                    recycled_devices: userProfile.recycled_devices || 0,
                    created_at: userProfile.created_at,
                    department_id: userProfile.barangay_id || null,
                    department: userProfile.barangays || null
                };
                // Recalculate eco_points from reallocated/donated assets only (source of truth)
                try {
                    const donationClient = authedClient || adminClient || supabase;
                    const { data: acceptedDonations } = await donationClient.from('donations').select('eco_points_earned, co2_saved').eq('user_id', userProfile.id).in('status', [
                        'reallocated',
                        'donated'
                    ]);
                    if (acceptedDonations) {
                        userData.eco_points = acceptedDonations.reduce((sum, d)=>sum + (d.eco_points_earned || 0), 0);
                        userData.total_co2_saved = Math.round(acceptedDonations.reduce((sum, d)=>sum + (d.co2_saved || 0), 0) * 100) / 100;
                        userData.total_donations = acceptedDonations.length;
                    }
                } catch (err) {
                    console.error('[get-profile] Error recalculating eco_points from donations:', err);
                // Fall back to stored values if donation query fails
                }
                console.log('📦 [get-profile] Returning user data with department:', {
                    department_id: userData.department_id,
                    has_department: !!userData.department
                });
                const achievements = generateAchievements(userData);
                const responseData = {
                    success: true,
                    user: userData,
                    achievements: achievements
                };
                // Cache the response
                profileCache.set(cacheKey, {
                    data: responseData,
                    timestamp: Date.now()
                });
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(responseData);
            case 'get-leaderboard':
                // 2-minute cache — avoids per-user donation recalculations on every page load
                const leaderboardCacheKey = 'leaderboard_top10';
                const cachedLeaderboard = profileCache.get(leaderboardCacheKey);
                if (cachedLeaderboard && Date.now() - cachedLeaderboard.timestamp < 120000) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(cachedLeaderboard.data);
                }
                console.log('[get-leaderboard] Fetching top users');
                const leaderboardStartTime = Date.now();
                const leaderboardClient = authedClient || adminClient || supabase;
                // Try with authed client first
                let { data: topUsers, error: leaderboardError } = await leaderboardClient.from('users').select('id, full_name, username, profile_image_url, eco_points, total_donations, total_co2_saved').eq('is_active', true).eq('is_admin', false) // Exclude admin accounts from leaderboard
                .gte('eco_points', 0) // Changed from gt to gte to include users with 0 points
                .order('eco_points', {
                    ascending: false
                }).limit(10);
                // If JWT expired, retry with admin client
                if (leaderboardError && adminClient && (/JWT expired/i.test(leaderboardError.message || '') || leaderboardError?.code === 'PGRST303')) {
                    console.log('[get-leaderboard] JWT expired, retrying with admin client');
                    const result = await adminClient.from('users').select('id, full_name, username, profile_image_url, eco_points, total_donations, total_co2_saved').eq('is_active', true).eq('is_admin', false) // Exclude admin accounts from leaderboard
                    .gte('eco_points', 0).order('eco_points', {
                        ascending: false
                    }).limit(10);
                    topUsers = result.data;
                    leaderboardError = result.error;
                }
                const leaderboardDuration = Date.now() - leaderboardStartTime;
                console.log(`[get-leaderboard] Query complete in ${leaderboardDuration}ms, found ${topUsers?.length || 0} users`);
                if (leaderboardError) {
                    console.error('[get-leaderboard] Error:', leaderboardError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        leaderboard: []
                    });
                }
                // For each user on the leaderboard, recalculate eco_points from accepted donations
                const leaderboardCalcClient = adminClient || authedClient || supabase;
                const leaderboardWithRealPoints = await Promise.all((topUsers || []).map(async (user)=>{
                    try {
                        const { data: acceptedDonations } = await leaderboardCalcClient.from('donations').select('eco_points_earned, co2_saved').eq('user_id', user.id).in('status', [
                            'reallocated',
                            'donated'
                        ]);
                        const realEcoPoints = (acceptedDonations || []).reduce((sum, d)=>sum + (d.eco_points_earned || 0), 0);
                        const realCo2 = Math.round((acceptedDonations || []).reduce((sum, d)=>sum + (d.co2_saved || 0), 0) * 100) / 100;
                        const realDonations = (acceptedDonations || []).length;
                        return {
                            ...user,
                            eco_points: realEcoPoints,
                            total_co2_saved: realCo2,
                            total_donations: realDonations
                        };
                    } catch  {
                        return user // fall back to stored values
                        ;
                    }
                }));
                // Re-sort by real eco_points after recalculation
                leaderboardWithRealPoints.sort((a, b)=>(b.eco_points || 0) - (a.eco_points || 0));
                const leaderboard = leaderboardWithRealPoints.map((user, index)=>({
                        id: user.id,
                        rank: index + 1,
                        name: user.full_name || user.username || 'User',
                        username: user.username || 'user',
                        eco_points: user.eco_points || 0,
                        total_donations: user.total_donations || 0,
                        total_co2_saved: user.total_co2_saved || 0,
                        profile_image_url: user.profile_image_url
                    }));
                const leaderboardResult = {
                    success: true,
                    leaderboard
                };
                profileCache.set(leaderboardCacheKey, {
                    data: leaderboardResult,
                    timestamp: Date.now()
                });
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(leaderboardResult);
            case 'update-profile':
                if (!userId && !authedClient && !adminClient) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Authentication required',
                        success: false
                    }, {
                        status: 401
                    });
                }
                const { phone, bio, location, profile_image_url, barangay_id, department_id, interests, is_public } = body;
                const updateData = {
                    updated_at: new Date().toISOString()
                };
                // Only update fields that are provided
                if (phone !== undefined) updateData.phone = phone;
                if (bio !== undefined) updateData.bio = bio;
                if (location !== undefined) updateData.location = location;
                if (profile_image_url !== undefined) updateData.profile_image_url = profile_image_url;
                // Save interests array
                if (interests !== undefined) {
                    updateData.interests = Array.isArray(interests) ? interests : [];
                    console.log('🏷️ [update-profile] Interests update:', updateData.interests);
                }
                // Save is_public flag
                if (is_public !== undefined) {
                    updateData.is_public = !!is_public;
                    console.log('🔒 [update-profile] is_public update:', updateData.is_public);
                }
                // Accept both department_id (new) and barangay_id (legacy) for the DB column
                const deptValue = department_id !== undefined ? department_id : barangay_id;
                if (deptValue !== undefined) {
                    updateData.barangay_id = deptValue || null;
                    console.log('🏢 [update-profile] Department update:', {
                        received: deptValue,
                        type: typeof deptValue,
                        willSave: updateData.barangay_id
                    });
                }
                console.log('📝 [update-profile] Incoming:', {
                    userId,
                    updateData,
                    hasDepartmentId: 'barangay_id' in updateData,
                    client: authedClient ? 'authedClient' : adminClient ? 'adminClient' : 'none'
                });
                const updateClient = authedClient || adminClient;
                if (!updateClient) {
                    console.error('❌ [update-profile] No updateClient available');
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Authentication required',
                        success: false
                    }, {
                        status: 401
                    });
                }
                let { data: updatedProfile, error: updateError } = await updateClient.from('users').update(updateData).eq('id', userId).select().single();
                if (updateError && adminClient && (/JWT expired/i.test(updateError.message || '') || updateError?.code === 'PGRST303')) {
                    ({ data: updatedProfile, error: updateError } = await adminClient.from('users').update(updateData).eq('id', userId).select().single());
                }
                if (updateError) {
                    console.error('❌ [update-profile] Update failed:', updateError);
                    if (updateError?.code === 'PGRST303' || /JWT expired/i.test(updateError?.message || '')) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Session expired',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Failed to update profile',
                        success: false,
                        details: updateError
                    }, {
                        status: 500
                    });
                }
                console.log('✅ [update-profile] Success:', updatedProfile);
                // Invalidate cache for this user
                const updateCacheKey = `profile_${userId}`;
                profileCache.delete(updateCacheKey);
                console.log('[update-profile] Cache invalidated for:', userId);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    message: 'Profile updated successfully',
                    user: updatedProfile
                });
            case 'update-profile-image':
                if (!userId && !authedClient && !adminClient) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Authentication required',
                        success: false
                    }, {
                        status: 401
                    });
                }
                const { image_data } = body;
                if (!image_data) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Image data is required',
                        success: false
                    }, {
                        status: 400
                    });
                }
                const imageClient = authedClient || adminClient;
                if (!imageClient) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Authentication required',
                        success: false
                    }, {
                        status: 401
                    });
                }
                let { error: imageUpdateError } = await imageClient.from('users').update({
                    profile_image_url: image_data,
                    updated_at: new Date().toISOString()
                }).eq('id', userId);
                if (imageUpdateError && adminClient && (/JWT expired/i.test(imageUpdateError.message || '') || imageUpdateError?.code === 'PGRST303')) {
                    ({ error: imageUpdateError } = await adminClient.from('users').update({
                        profile_image_url: image_data,
                        updated_at: new Date().toISOString()
                    }).eq('id', userId));
                }
                if (imageUpdateError) {
                    console.error('❌ [update-profile-image] Update failed:', imageUpdateError);
                    if (imageUpdateError?.code === 'PGRST303' || /JWT expired/i.test(imageUpdateError?.message || '')) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Session expired',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Failed to update profile image',
                        success: false,
                        details: imageUpdateError
                    }, {
                        status: 500
                    });
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    image_url: image_data,
                    message: 'Profile image updated successfully'
                });
            case 'get-user-profile':
                // Get another user's public profile by userId
                const { userId: targetUserId } = body;
                if (!targetUserId) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'User ID is required',
                        success: false
                    }, {
                        status: 400
                    });
                }
                console.log('[get-user-profile] Fetching public profile for:', targetUserId);
                // Use admin client to bypass RLS for public profile viewing
                const profileQuery = adminClient || supabase;
                const { data: targetProfile, error: targetError } = await profileQuery.from('users').select('id, full_name, username, profile_image_url, bio, location, eco_points, total_donations, total_co2_saved, is_active, created_at').eq('id', targetUserId).eq('is_active', true).single();
                if (targetError || !targetProfile) {
                    console.error('[get-user-profile] Error:', targetError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Profile not found',
                        success: false
                    }, {
                        status: 404
                    });
                }
                // Profile is always public in simplified version
                // Recalculate eco_points from accepted donations for this user
                let realEcoPoints = targetProfile.eco_points || 0;
                let realCo2Saved = targetProfile.total_co2_saved || 0;
                let realDonations = targetProfile.total_donations || 0;
                try {
                    const donCalcClient = adminClient || supabase;
                    const { data: acceptedDonations } = await donCalcClient.from('donations').select('eco_points_earned, co2_saved').eq('user_id', targetUserId).in('status', [
                        'reallocated',
                        'donated'
                    ]);
                    if (acceptedDonations) {
                        realEcoPoints = acceptedDonations.reduce((sum, d)=>sum + (d.eco_points_earned || 0), 0);
                        realCo2Saved = Math.round(acceptedDonations.reduce((sum, d)=>sum + (d.co2_saved || 0), 0) * 100) / 100;
                        realDonations = acceptedDonations.length;
                    }
                } catch  {
                // fall back to stored values
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    profile: {
                        id: targetProfile.id,
                        full_name: targetProfile.full_name,
                        username: targetProfile.username,
                        profile_image_url: targetProfile.profile_image_url,
                        bio: targetProfile.bio,
                        location: targetProfile.location,
                        eco_points: realEcoPoints,
                        total_donations: realDonations,
                        co2_saved: realCo2Saved,
                        created_at: targetProfile.created_at
                    }
                });
            case 'get-departments':
            case 'get-barangays':
                try {
                    const { data: departmentsData, error: departmentsError } = await supabase.from('barangays').select('id, name, municipality, description').eq('is_active', true).order('name');
                    if (departmentsError) {
                        console.error('[get-departments] Error:', departmentsError);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Failed to fetch departments',
                            success: false
                        }, {
                            status: 500
                        });
                    }
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        departments: departmentsData || []
                    });
                } catch (error) {
                    console.error('[get-departments] Error:', error);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Failed to fetch departments',
                        success: false
                    }, {
                        status: 500
                    });
                }
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Invalid action specified',
                    success: false
                }, {
                    status: 400
                });
        }
    } catch (error) {
        console.error('User profile handler error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error',
            success: false
        }, {
            status: 500
        });
    }
}
function generateAchievements(userStats) {
    const achievements = [];
    achievements.push({
        id: 'first-donation',
        title: 'First Steps',
        description: 'Made your first donation',
        icon: 'gift',
        earned: (userStats.total_donations || 0) >= 1,
        progress: (userStats.total_donations || 0) >= 1 ? 100 : 0,
        category: 'donation'
    });
    achievements.push({
        id: 'eco-warrior',
        title: 'Eco Warrior',
        description: 'Earned 100 eco points',
        icon: 'leaf',
        earned: (userStats.eco_points || 0) >= 100,
        progress: Math.min((userStats.eco_points || 0) / 100 * 100, 100),
        category: 'points'
    });
    achievements.push({
        id: 'eco-champion',
        title: 'Eco Champion',
        description: 'Earned 500 eco points',
        icon: 'trophy',
        earned: (userStats.eco_points || 0) >= 500,
        progress: Math.min((userStats.eco_points || 0) / 500 * 100, 100),
        category: 'points'
    });
    achievements.push({
        id: 'generous-giver',
        title: 'Generous Giver',
        description: 'Made 5 donations',
        icon: 'heart',
        earned: (userStats.total_donations || 0) >= 5,
        progress: Math.min((userStats.total_donations || 0) / 5 * 100, 100),
        category: 'donation'
    });
    achievements.push({
        id: 'donation-hero',
        title: 'Donation Hero',
        description: 'Made 10 donations',
        icon: 'crown',
        earned: (userStats.total_donations || 0) >= 10,
        progress: Math.min((userStats.total_donations || 0) / 10 * 100, 100),
        category: 'donation'
    });
    achievements.push({
        id: 'carbon-saver',
        title: 'Carbon Saver',
        description: 'Saved 50kg of CO₂',
        icon: 'cloud',
        earned: (userStats.total_co2_saved || 0) >= 50,
        progress: Math.min((userStats.total_co2_saved || 0) / 50 * 100, 100),
        category: 'environment'
    });
    // New fun achievements
    achievements.push({
        id: 'social-butterfly',
        title: 'Social Butterfly',
        description: 'Visited 10 public profiles',
        icon: 'user',
        earned: (userStats.visited_profiles || 0) >= 10,
        progress: Math.min((userStats.visited_profiles || 0) / 10 * 100, 100),
        category: 'social'
    });
    achievements.push({
        id: 'community-star',
        title: 'Community Star',
        description: 'Received 20 likes on posts',
        icon: 'star',
        earned: (userStats.post_likes || 0) >= 20,
        progress: Math.min((userStats.post_likes || 0) / 20 * 100, 100),
        category: 'social'
    });
    achievements.push({
        id: 'trendsetter',
        title: 'Trendsetter',
        description: 'Posted 5 times in trending topics',
        icon: 'fire',
        earned: (userStats.trending_posts || 0) >= 5,
        progress: Math.min((userStats.trending_posts || 0) / 5 * 100, 100),
        category: 'social'
    });
    achievements.push({
        id: 'mobile-master',
        title: 'Mobile Master',
        description: 'Logged in from mobile 20 times',
        icon: 'smartphone',
        earned: (userStats.mobile_logins || 0) >= 20,
        progress: Math.min((userStats.mobile_logins || 0) / 20 * 100, 100),
        category: 'mobile'
    });
    return achievements;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__578e268c._.js.map