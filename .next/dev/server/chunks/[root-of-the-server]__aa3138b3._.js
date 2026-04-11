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
"[project]/app/api/supabase/functions/donation-handler/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
const supabaseUrl = ("TURBOPACK compile-time value", "https://kgwndoatphthxmjuxhif.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnd25kb2F0cGh0aHhtanV4aGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTU3MjYsImV4cCI6MjA4NjQ3MTcyNn0.bLZ4yIk2cy4IpC2udj-TkF_F_Q4hv1twiGx2nYUiNZI");
const deviceImpact = {
    'smartphone': {
        working: 75,
        broken: 35,
        co2Working: 8.5,
        co2Broken: 4.2
    },
    'laptop': {
        working: 150,
        broken: 75,
        co2Working: 18.7,
        co2Broken: 9.4
    },
    'tablet': {
        working: 90,
        broken: 45,
        co2Working: 11.3,
        co2Broken: 5.7
    },
    'desktop': {
        working: 120,
        broken: 60,
        co2Working: 22.1,
        co2Broken: 11.1
    },
    'appliance': {
        working: 60,
        broken: 30,
        co2Working: 7.8,
        co2Broken: 3.9
    },
    'battery': {
        working: 25,
        broken: 15,
        co2Working: 3.2,
        co2Broken: 1.6
    },
    'cable': {
        working: 15,
        broken: 8,
        co2Working: 1.5,
        co2Broken: 0.8
    },
    'headphones': {
        working: 40,
        broken: 20,
        co2Working: 5.4,
        co2Broken: 2.7
    },
    'hazardous-consumables': {
        working: 0,
        broken: 0,
        co2Working: 0,
        co2Broken: 0
    }
};
async function POST(request) {
    try {
        const body = await request.json();
        const { action } = body;
        // Create Supabase client
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });
        // Get user ID from Authorization or x-user-id; be tolerant if auth.getUser fails
        const userIdHeader = request.headers.get('x-user-id');
        const authHeader = request.headers.get('Authorization');
        const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
        let userId = null;
        let authToken = null;
        // Helper to decode JWT without verifying to extract sub (user id)
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
        console.log('🔑 Incoming headers:', {
            Authorization: authHeader,
            'x-user-id': userIdHeader
        });
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const tokenCandidate = authHeader.replace('Bearer ', '');
            authToken = tokenCandidate;
            try {
                const { data: { user } } = await supabase.auth.getUser(tokenCandidate);
                if (user?.id) {
                    userId = user.id;
                }
            } catch  {
            // ignore
            }
            if (!userId) {
                userId = decodeJwtSub(tokenCandidate);
            }
        }
        if (!userId && userIdHeader) {
            userId = userIdHeader;
        }
        console.log('🧑‍💻 Parsed userId:', userId, 'authToken:', !!authToken);
        // Create clients as needed for RLS-protected ops
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
        const adminClient = serviceKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, serviceKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        }) : null;
        console.log('🔐 Client selection:', {
            authedClient: !!authedClient,
            adminClient: !!adminClient
        });
        // For non-public actions, require user identity and a client capable of bypassing RLS when needed
        if (action !== 'get-drop-off-centers') {
            if (!userId && !authedClient && !adminClient) {
                console.error('❌ 401: No userId found. Headers:', {
                    Authorization: authHeader,
                    'x-user-id': userIdHeader
                });
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Authentication required',
                    success: false
                }, {
                    status: 401
                });
            }
        }
        switch(action){
            case 'create-donation':
                {
                    console.log('[create-donation] Starting donation creation for user:', userId);
                    const donationStartTime = Date.now();
                    // Choose a client that can pass RLS (authed preferred, else admin)
                    let client = authedClient || adminClient;
                    if (!client) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Authentication required',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    // Ensure we have a userId; decode from token if needed
                    if (!userId && authToken) {
                        userId = decodeJwtSub(authToken);
                    }
                    if (!userId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Unable to determine user id',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    const { donationData } = body;
                    if (!donationData) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Donation data required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    // Validate required fields
                    if (!donationData.deviceCategory || !donationData.brand || !donationData.model) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Missing required fields',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    const category = donationData.deviceCategory.toLowerCase();
                    const isHazardousCategory = category === 'hazardous-consumables';
                    const normalizedCondition = donationData.condition ? String(donationData.condition).toLowerCase() : isHazardousCategory ? 'n/a' : null;
                    if (!isHazardousCategory && !normalizedCondition) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Device condition is required for standard hardware',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    // CDC asset validation: propertyNumber and serialNumber are required when isCDCAsset is true
                    if (donationData.isCDCAsset) {
                        if (!donationData.propertyNumber?.trim()) {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Property Number is required for CDC assets',
                                success: false
                            }, {
                                status: 400
                            });
                        }
                        if (!donationData.serialNumber?.trim()) {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Serial Number is required for CDC assets',
                                success: false
                            }, {
                                status: 400
                            });
                        }
                    }
                    // Calculate eco impact
                    const impact = deviceImpact[category] || deviceImpact['smartphone'];
                    const isWorking = normalizedCondition === 'working';
                    const ecoPoints = isWorking ? impact.working : impact.broken;
                    const co2Saved = isWorking ? impact.co2Working : impact.co2Broken;
                    const isRecycled = !isWorking;
                    // Ensure user exists in database
                    let existingUserRes = await client.from('users').select('id, barangay_id').eq('id', userId).single();
                    let existingUser = existingUserRes.data;
                    let userError = existingUserRes.error;
                    // Fallback to admin client if JWT expired
                    if (userError && adminClient && (/JWT expired/i.test(userError.message || '') || userError?.code === 'PGRST303')) {
                        client = adminClient;
                        existingUserRes = await adminClient.from('users').select('id, barangay_id').eq('id', userId).single();
                        existingUser = existingUserRes.data;
                        userError = existingUserRes.error;
                    }
                    if (userError) {
                        if (userError.code === 'PGRST303' || /JWT expired/i.test(userError.message || '')) {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Session expired',
                                success: false
                            }, {
                                status: 401
                            });
                        }
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Failed to fetch user',
                            success: false,
                            details: userError.message
                        }, {
                            status: 500
                        });
                    }
                    if (!existingUser) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'User profile not found. Please contact support to complete account setup before donating.',
                            success: false
                        }, {
                            status: 403
                        });
                    }
                    // Department assignment is required before creating any donation/recycle history.
                    if (!existingUser.barangay_id) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Your account has no designated department yet. Please ask an admin to assign your department first.',
                            success: false
                        }, {
                            status: 403
                        });
                    }
                    // Ensure department reference is valid and active.
                    let departmentRes = await client.from('barangays').select('id, is_active').eq('id', existingUser.barangay_id).maybeSingle();
                    let department = departmentRes.data;
                    let departmentError = departmentRes.error;
                    if (departmentError && adminClient && (/JWT expired/i.test(departmentError.message || '') || departmentError?.code === 'PGRST303')) {
                        departmentRes = await adminClient.from('barangays').select('id, is_active').eq('id', existingUser.barangay_id).maybeSingle();
                        department = departmentRes.data;
                        departmentError = departmentRes.error;
                    }
                    if (departmentError) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Unable to validate your department assignment right now. Please try again.',
                            success: false
                        }, {
                            status: 500
                        });
                    }
                    if (!department || department.is_active === false) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Your account is not linked to an active department. Please contact an admin before donating.',
                            success: false
                        }, {
                            status: 403
                        });
                    }
                    // Create donation record
                    let hazardImageUrl = null;
                    if (isHazardousCategory && donationData.hazardousData?.imageBase64) {
                        console.log('[create-donation] Uploading hazard image...');
                        try {
                            const base64Data = donationData.hazardousData.imageBase64.split(',')[1];
                            const mimeType = donationData.hazardousData.imageMimeType || 'image/jpeg';
                            const fileExt = mimeType.split('/')[1] || 'jpg';
                            // convert base64 to cross-platform Uint8Array to avoid Node Buffer issues locally
                            const binaryStr = atob(base64Data);
                            const uint8Array = new Uint8Array(binaryStr.length);
                            for(let i = 0; i < binaryStr.length; i++){
                                uint8Array[i] = binaryStr.charCodeAt(i);
                            }
                            const fileName = `${userId}/${Date.now()}.${fileExt}`;
                            const uploadClient = adminClient || client;
                            const { data: uploadData, error: uploadError } = await uploadClient.storage.from('hazard-media').upload(fileName, uint8Array, {
                                contentType: mimeType,
                                upsert: true
                            });
                            if (uploadError) {
                                console.error('Failed to upload hazard photo:', uploadError);
                                const errMsg = uploadError.message || JSON.stringify(uploadError);
                                donationData.description = (donationData.description || '') + ` | [UPLOAD_FAILED:${errMsg}]`;
                            } else if (uploadData) {
                                const { data: publicUrlData } = uploadClient.storage.from('hazard-media').getPublicUrl(uploadData.path);
                                hazardImageUrl = publicUrlData.publicUrl;
                                console.log('Hazard image uploaded at:', hazardImageUrl);
                            }
                        } catch (e) {
                            console.error('Hazard image processing failed:', e);
                        }
                    }
                    const donationRecord = {
                        user_id: userId,
                        device_type: donationData.deviceCategory,
                        brand: donationData.brand,
                        model: donationData.model,
                        condition: normalizedCondition,
                        description: donationData.description || '',
                        year: donationData.year || null,
                        drop_off_center: donationData.dropOffCenter || 'EcoKonek Central Hub',
                        eco_points_earned: ecoPoints,
                        co2_saved: co2Saved,
                        is_cdc_asset: donationData.isCDCAsset || false,
                        property_number: donationData.isCDCAsset ? donationData.propertyNumber?.trim() : null,
                        serial_number: donationData.isCDCAsset ? donationData.serialNumber?.trim() : null,
                        status: 'pending_evaluation',
                        created_at: new Date().toISOString()
                    };
                    // Add hazardous-specific fields if this is a hazardous item
                    if (isHazardousCategory) {
                        donationRecord.device_category = 'hazardous-consumables';
                        donationRecord.hazard_type = donationData.hazardousData?.hazardType || null;
                        donationRecord.quantity_weight = donationData.hazardousData?.quantityWeight || null;
                        donationRecord.hazard_description = donationData.hazardousData?.itemDescription || donationData.description || null;
                        donationRecord.is_hazardous_locked = true;
                        if (hazardImageUrl) {
                            donationRecord.description += ` | [IMAGE_URL:${hazardImageUrl}]`;
                            donationRecord.hazard_description = (donationRecord.hazard_description || '') + ` | [IMAGE_URL:${hazardImageUrl}]`;
                        }
                    } else {
                        donationRecord.device_category = 'standard';
                    }
                    console.log('📝 Creating donation for user:', userId, donationRecord);
                    let donationRes = await client.from('donations').insert(donationRecord).select().single();
                    let donation = donationRes.data;
                    let donationError = donationRes.error;
                    // Fallback to admin client if JWT expired
                    if (donationError && adminClient && (/JWT expired/i.test(donationError.message || '') || donationError?.code === 'PGRST303')) {
                        client = adminClient;
                        donationRes = await adminClient.from('donations').insert(donationRecord).select().single();
                        donation = donationRes.data;
                        donationError = donationRes.error;
                    }
                    if (donationError) {
                        console.error('❌ Donation creation failed:', {
                            code: donationError.code,
                            details: donationError.details,
                            hint: donationError.hint,
                            message: donationError.message
                        });
                        if (donationError.code === 'PGRST303' || /JWT expired/i.test(donationError.message || '')) {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Session expired',
                                success: false
                            }, {
                                status: 401
                            });
                        }
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Failed to create donation',
                            success: false,
                            details: donationError.message
                        }, {
                            status: 500
                        });
                    }
                    console.log('✅ Donation created successfully:', donation.id);
                    // Update user stats
                    const { data: currentUser } = await client.from('users').select('eco_points, total_donations, total_co2_saved, donated_devices, recycled_devices').eq('id', userId).single();
                    const currentStats = currentUser || {
                        eco_points: 0,
                        total_donations: 0,
                        total_co2_saved: 0,
                        donated_devices: 0,
                        recycled_devices: 0
                    };
                    // NOTE: eco_points, total_donations, and total_co2_saved are NOT updated here.
                    // They are recalculated from accepted donations only when an admin approves/rejects.
                    const updatedStats = {
                        donated_devices: isRecycled ? currentStats.donated_devices || 0 : (currentStats.donated_devices || 0) + 1,
                        recycled_devices: isRecycled ? (currentStats.recycled_devices || 0) + 1 : currentStats.recycled_devices || 0,
                        updated_at: new Date().toISOString()
                    };
                    await client.from('users').update(updatedStats).eq('id', userId);
                    // Prepare response
                    const deviceName = `${donationData.brand} ${donationData.model}`;
                    const donationType = isRecycled ? 'recycled' : 'donated';
                    const donationDuration = Date.now() - donationStartTime;
                    console.log(`[create-donation] Donation created successfully in ${donationDuration}ms`);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        deviceName: deviceName,
                        ecoPoints: ecoPoints,
                        co2Saved: co2Saved,
                        donationType: donationType,
                        destinationPath: isRecycled ? 'Recycling Center' : 'Community Donation',
                        message: `${isRecycled ? 'Recycling' : 'Donation'} submitted successfully!`,
                        donationId: donation.id
                    });
                }
            case 'get-donations':
                console.log('[get-donations] Fetching donations for user:', userId);
                const getDonationsStartTime = Date.now();
                const listClient = authedClient || adminClient || supabase;
                let { data: donations, error: donationsError } = await listClient.from('donations').select('*').eq('user_id', userId).order('created_at', {
                    ascending: false
                });
                if (donationsError && adminClient && (/JWT expired/i.test(donationsError.message || '') || donationsError?.code === 'PGRST303')) {
                    ({ data: donations, error: donationsError } = await adminClient.from('donations').select('*').eq('user_id', userId).order('created_at', {
                        ascending: false
                    }));
                }
                if (donationsError) {
                    console.error('Get donations error:', donationsError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        donations: []
                    });
                }
                const formattedDonations = (donations || []).map((donation)=>({
                        id: donation.id,
                        device_type: donation.device_type,
                        brand: donation.brand,
                        model: donation.model,
                        condition: donation.condition,
                        donation_type: donation.condition === 'working' ? 'donated' : 'recycled',
                        eco_points_earned: donation.eco_points_earned,
                        co2_saved: donation.co2_saved,
                        status: donation.status,
                        created_at: donation.created_at,
                        drop_off_center: donation.drop_off_center,
                        is_cdc_asset: donation.is_cdc_asset || false,
                        property_number: donation.property_number || null,
                        serial_number: donation.serial_number || null
                    }));
                const getDonationsDuration = Date.now() - getDonationsStartTime;
                console.log(`[get-donations] Query complete in ${getDonationsDuration}ms, found ${donations?.length || 0} donations`);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    donations: formattedDonations
                });
            case 'get-drop-off-centers':
                // Public endpoint: do not require auth
                const fallbackCenters = [
                    {
                        id: 'cdc-itd',
                        name: 'ITD - CDC IT Department',
                        location: 'Clark Freeport Zone, Pampanga',
                        address: 'Clark Development Corporation',
                        city: 'Clark',
                        phone: '',
                        email: '',
                        operating_hours: 'Mon-Fri 8AM-5PM'
                    },
                    {
                        id: 'cdc-main',
                        name: 'CDC Main Office Collection',
                        location: 'Clark Freeport Zone, Pampanga',
                        address: 'Clark Development Corporation',
                        city: 'Clark',
                        phone: '',
                        email: '',
                        operating_hours: 'Mon-Fri 8AM-5PM'
                    }
                ];
                const { data: centers, error: centersError } = await supabase.from('drop_off_centers').select('*').order('name');
                if (!centersError && centers && centers.length > 0) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        centers: centers
                    });
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    centers: fallbackCenters
                });
            case 'get-user-donations':
                // Get donations for a specific user (for their profile page)
                const { userId: donationUserId } = body;
                if (!donationUserId) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'User ID is required',
                        success: false
                    }, {
                        status: 400
                    });
                }
                console.log('[get-user-donations] Fetching donations for user:', donationUserId);
                const donationClient = adminClient || supabase;
                const { data: userDonations, error: userDonationsError } = await donationClient.from('donations').select('id, device_type, brand, model, eco_points_earned, co2_saved, status, created_at').eq('user_id', donationUserId).order('created_at', {
                    ascending: false
                }).limit(10);
                if (userDonationsError) {
                    console.error('[get-user-donations] Error:', userDonationsError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        donations: []
                    });
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    donations: userDonations || []
                });
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Invalid action',
                    success: false
                }, {
                    status: 400
                });
        }
    } catch (error) {
        console.error('Donation handler error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error',
            success: false
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__aa3138b3._.js.map