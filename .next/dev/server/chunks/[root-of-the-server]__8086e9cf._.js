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
"[project]/lib/socketServer.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getIO",
    ()=>getIO,
    "setIO",
    ()=>setIO
]);
function setIO(server) {
    global.__socket_io_server = server;
}
function getIO() {
    return global.__socket_io_server ?? null;
}
}),
"[project]/lib/notificationService.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// lib/notificationService.ts
__turbopack_context__.s([
    "createNotification",
    ()=>createNotification,
    "getNotifications",
    ()=>getNotifications,
    "markNotificationsRead",
    ()=>markNotificationsRead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socketServer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/socketServer.ts [app-route] (ecmascript)");
;
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://yxoxxrbukjyioyfveaml.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4b3h4cmJ1a2p5aW95ZnZlYW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODYyNDUsImV4cCI6MjA3NjE2MjI0NX0.hbJzB2u6v4BB1Q1BYCPpazbxcXc-YOXlMgCiY0ZTP1o");
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Use service role for admin operations
const supabaseAdmin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceKey);
const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
// Enhanced logging helper
function logError(context, error, metadata) {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [notificationService:${context}]`, {
        error: error?.message || error,
        code: error?.code,
        details: error?.details,
        metadata
    });
}
function logInfo(context, message, metadata) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [notificationService:${context}]`, message, metadata || '');
}
async function createNotification(recipientId, senderId, type, content, link, options) {
    try {
        // Validate required parameters
        if (!recipientId || !type || !content) {
            const error = new Error('Missing required parameters: recipientId, type, or content');
            logError('createNotification', error, {
                recipientId,
                type,
                content
            });
            return {
                data: null,
                error
            };
        }
        const aggregationKey = options?.aggregationKey;
        const latestActor = options?.latestActor ?? (senderId ? {
            id: senderId
        } : undefined);
        // If an aggregation key is provided and we have a sender, try to upsert
        if (aggregationKey && senderId) {
            const { data: existing, error: findError } = await supabaseAdmin.from('notifications').select('*').eq('recipient_id', recipientId).eq('type', type).eq('aggregation_key', aggregationKey).eq('is_read', false).order('updated_at', {
                ascending: false
            }).limit(1);
            if (findError) {
                logError('findExisting', findError, {
                    recipientId,
                    type,
                    aggregationKey
                });
                return {
                    data: null,
                    error: findError
                };
            }
            const existingRow = existing && existing.length > 0 ? existing[0] : null;
            if (existingRow) {
                // Merge latest_actors (de-dupe by id, keep most recent first, cap at 3)
                const prevActors = Array.isArray(existingRow.latest_actors) ? existingRow.latest_actors : [];
                const filtered = latestActor ? [
                    latestActor,
                    ...prevActors.filter((a)=>a && a.id !== latestActor.id)
                ] : prevActors;
                const mergedActors = filtered.slice(0, 3);
                const newCount = (existingRow.count ?? 1) + 1;
                const { data: updated, error: updateError } = await supabaseAdmin.from('notifications').update({
                    count: newCount,
                    latest_actors: mergedActors,
                    updated_at: new Date().toISOString()
                }).eq('id', existingRow.id).select('*').limit(1);
                if (updateError) {
                    logError('aggregateUpdate', updateError, {
                        notificationId: existingRow.id
                    });
                    return {
                        data: null,
                        error: updateError
                    };
                }
                const updatedRow = updated && updated.length > 0 ? updated[0] : existingRow;
                logInfo('aggregateUpdate', 'Notification aggregated', {
                    id: updatedRow.id,
                    count: newCount
                });
                // Emit real-time update to recipient room
                try {
                    const io = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socketServer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getIO"])();
                    if (io) {
                        io.to(recipientId).emit('notification_updated', updatedRow);
                        logInfo('socketEmit', 'notification_updated event sent', {
                            recipientId
                        });
                    }
                } catch (e) {
                    // Non-fatal: socket emission failure shouldn't break notifications
                    logError('socketEmit', e, {
                        event: 'notification_updated',
                        recipientId
                    });
                }
                return {
                    data: updatedRow,
                    error: null
                };
            }
            // No existing: insert a new aggregated notification
            const insertPayload = {
                recipient_id: recipientId,
                sender_id: senderId,
                type,
                content,
                link,
                aggregation_key: aggregationKey,
                count: 1,
                latest_actors: latestActor ? [
                    latestActor
                ] : []
            };
            const { data: inserted, error: insertError } = await supabaseAdmin.from('notifications').insert([
                insertPayload
            ]).select('*').limit(1);
            if (insertError) {
                logError('aggregateInsert', insertError, {
                    type,
                    aggregationKey
                });
                return {
                    data: null,
                    error: insertError
                };
            }
            const newRow = inserted && inserted.length > 0 ? inserted[0] : null;
            logInfo('aggregateInsert', 'New aggregated notification created', {
                id: newRow?.id,
                type
            });
            try {
                const io = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socketServer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getIO"])();
                if (io && newRow) {
                    io.to(recipientId).emit('new-notification', newRow);
                    logInfo('socketEmit', 'new-notification event sent', {
                        recipientId
                    });
                }
            } catch (e) {
                logError('socketEmit', e, {
                    event: 'new-notification',
                    recipientId
                });
            }
            return {
                data: newRow,
                error: null
            };
        }
        // Non-aggregated: simple insert
        const { data, error } = await supabaseAdmin.from('notifications').insert([
            {
                recipient_id: recipientId,
                sender_id: senderId,
                type,
                content,
                link
            }
        ]).select('*').limit(1);
        if (error) {
            logError('simpleInsert', error, {
                type
            });
            return {
                data: null,
                error
            };
        }
        const row = data && data.length > 0 ? data[0] : null;
        logInfo('simpleInsert', 'New notification created', {
            id: row?.id,
            type
        });
        try {
            const io = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socketServer$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getIO"])();
            if (io && row) {
                io.to(recipientId).emit('new-notification', row);
                logInfo('socketEmit', 'new-notification event sent', {
                    recipientId
                });
            }
        } catch (e) {
            logError('socketEmit', e, {
                event: 'new-notification',
                recipientId
            });
        }
        return {
            data: row,
            error: null
        };
    } catch (e) {
        logError('createNotification', e, {
            recipientId,
            type
        });
        return {
            data: null,
            error: e
        };
    }
}
async function getNotifications(recipientId, limit = 20, offset = 0) {
    try {
        if (!recipientId) {
            const error = new Error('recipientId is required');
            logError('getNotifications', error);
            return {
                data: null,
                error
            };
        }
        const { data, error } = await supabase.from('notifications').select('*').eq('recipient_id', recipientId).order('created_at', {
            ascending: false
        }).range(offset, offset + limit - 1);
        if (error) {
            logError('getNotifications', error, {
                recipientId,
                limit,
                offset
            });
        }
        return {
            data,
            error
        };
    } catch (e) {
        logError('getNotifications', e, {
            recipientId
        });
        return {
            data: null,
            error: e
        };
    }
}
async function markNotificationsRead(recipientId, notificationIds) {
    try {
        if (!recipientId) {
            const error = new Error('recipientId is required');
            logError('markNotificationsRead', error);
            return {
                data: null,
                error
            };
        }
        let query = supabase.from('notifications').update({
            is_read: true
        }).eq('recipient_id', recipientId);
        if (notificationIds && notificationIds.length > 0) {
            query = query.in('id', notificationIds);
        }
        const { data, error } = await query;
        if (error) {
            logError('markNotificationsRead', error, {
                recipientId,
                count: notificationIds?.length
            });
        } else {
            logInfo('markNotificationsRead', 'Notifications marked as read', {
                recipientId,
                count: notificationIds?.length || 'all'
            });
        }
        return {
            data,
            error
        };
    } catch (e) {
        logError('markNotificationsRead', e, {
            recipientId
        });
        return {
            data: null,
            error: e
        };
    }
}
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
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/notificationService.ts [app-route] (ecmascript)");
;
;
;
const runtime = 'nodejs';
// Simple in-memory cache for user profiles (cache for 30 seconds)
const profileCache = new Map();
const CACHE_TTL = 30000 // 30 seconds
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://yxoxxrbukjyioyfveaml.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4b3h4cmJ1a2p5aW95ZnZlYW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODYyNDUsImV4cCI6MjA3NjE2MjI0NX0.hbJzB2u6v4BB1Q1BYCPpazbxcXc-YOXlMgCiY0ZTP1o");
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
            // Always capture the token so we can create an authed client for RLS
            authToken = tokenCandidate;
            // Best-effort: ask Supabase to validate and also try decoding the JWT locally
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
                            interests: [],
                            profile_image_url: '',
                            is_public: true,
                            is_seller: false,
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
                    interests: userProfile.interests || [],
                    profile_image_url: userProfile.profile_image_url || '',
                    is_public: userProfile.is_public !== false,
                    is_seller: userProfile.is_seller || false,
                    eco_points: userProfile.eco_points || 0,
                    total_donations: userProfile.total_donations || 0,
                    total_co2_saved: userProfile.total_co2_saved || 0,
                    donated_devices: userProfile.donated_devices || 0,
                    recycled_devices: userProfile.recycled_devices || 0,
                    created_at: userProfile.created_at,
                    barangay_id: userProfile.barangay_id || null,
                    barangays: userProfile.barangays || null
                };
                // Recalculate eco_points from accepted donations only (source of truth)
                try {
                    const donationClient = authedClient || adminClient || supabase;
                    const { data: acceptedDonations } = await donationClient.from('donations').select('eco_points_earned, co2_saved').eq('user_id', userProfile.id).in('status', [
                        'accepted',
                        'approved'
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
                console.log('📦 [get-profile] Returning user data with barangay:', {
                    barangay_id: userData.barangay_id,
                    has_barangays: !!userData.barangays
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
                console.log('[get-leaderboard] Fetching top users');
                const leaderboardStartTime = Date.now();
                const leaderboardClient = authedClient || adminClient || supabase;
                // Try with authed client first
                let { data: topUsers, error: leaderboardError } = await leaderboardClient.from('users').select('id, full_name, username, profile_image_url, eco_points, total_donations, total_co2_saved').eq('is_public', true).eq('is_active', true).eq('is_admin', false) // Exclude admin accounts from leaderboard
                .gte('eco_points', 0) // Changed from gt to gte to include users with 0 points
                .order('eco_points', {
                    ascending: false
                }).limit(10);
                // If JWT expired, retry with admin client
                if (leaderboardError && adminClient && (/JWT expired/i.test(leaderboardError.message || '') || leaderboardError?.code === 'PGRST303')) {
                    console.log('[get-leaderboard] JWT expired, retrying with admin client');
                    const result = await adminClient.from('users').select('id, full_name, username, profile_image_url, eco_points, total_donations, total_co2_saved').eq('is_public', true).eq('is_active', true).eq('is_admin', false) // Exclude admin accounts from leaderboard
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
                            'accepted',
                            'approved'
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
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    leaderboard: leaderboard
                });
            case 'update-profile':
                if (!userId && !authedClient && !adminClient) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Authentication required',
                        success: false
                    }, {
                        status: 401
                    });
                }
                const { phone, bio, location, interests, profile_image_url, is_public, barangay_id } = body;
                const updateData = {
                    updated_at: new Date().toISOString()
                };
                // Only update fields that are provided
                if (phone !== undefined) updateData.phone = phone;
                if (bio !== undefined) updateData.bio = bio;
                if (location !== undefined) updateData.location = location;
                if (interests !== undefined) updateData.interests = interests;
                if (profile_image_url !== undefined) updateData.profile_image_url = profile_image_url;
                if (is_public !== undefined) updateData.is_public = is_public;
                if (barangay_id !== undefined) {
                    updateData.barangay_id = barangay_id || null;
                    console.log('🏘️ [update-profile] Barangay update:', {
                        received: barangay_id,
                        type: typeof barangay_id,
                        willSave: updateData.barangay_id
                    });
                }
                console.log('📝 [update-profile] Incoming:', {
                    userId,
                    updateData,
                    hasBarangayId: 'barangay_id' in updateData,
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
                const { data: targetProfile, error: targetError } = await profileQuery.from('users').select('id, full_name, username, profile_image_url, bio, location, eco_points, total_donations, total_co2_saved, is_seller, is_public, is_active, created_at, followers_count, following_count').eq('id', targetUserId).eq('is_active', true).single();
                if (targetError || !targetProfile) {
                    console.error('[get-user-profile] Error:', targetError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Profile not found',
                        success: false
                    }, {
                        status: 404
                    });
                }
                // Check if profile is public
                if (!targetProfile.is_public) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'This profile is private',
                        success: false
                    }, {
                        status: 403
                    });
                }
                // Check if current user is following this profile
                let isFollowing = false;
                if (userId) {
                    const { data: connection } = await (adminClient || supabase).from('user_connections').select('id').eq('follower_id', userId).eq('following_id', targetUserId).single();
                    isFollowing = !!connection;
                }
                // Recalculate eco_points from accepted donations for this user
                let realEcoPoints = targetProfile.eco_points || 0;
                let realCo2Saved = targetProfile.total_co2_saved || 0;
                let realDonations = targetProfile.total_donations || 0;
                try {
                    const donCalcClient = adminClient || supabase;
                    const { data: acceptedDonations } = await donCalcClient.from('donations').select('eco_points_earned, co2_saved').eq('user_id', targetUserId).in('status', [
                        'accepted',
                        'approved'
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
                        is_seller: targetProfile.is_seller || false,
                        followers_count: targetProfile.followers_count || 0,
                        following_count: targetProfile.following_count || 0,
                        created_at: targetProfile.created_at,
                        is_following: isFollowing
                    }
                });
            case 'get-user-followers':
                {
                    const { userId: targetUserId } = body;
                    if (!targetUserId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'User ID is required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    try {
                        const client = adminClient || supabase;
                        // Get follower ids
                        const { data: followerRows, error: followerErr } = await client.from('user_connections').select('follower_id').eq('following_id', targetUserId);
                        if (followerErr) {
                            console.error('[get-user-followers] Error:', followerErr);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                followers: []
                            });
                        }
                        const followerIds = (followerRows || []).map((r)=>r.follower_id);
                        if (followerIds.length === 0) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            followers: []
                        });
                        const { data: followers, error: usersErr } = await client.from('users').select('id, full_name, username, profile_image_url').in('id', followerIds).limit(200);
                        if (usersErr) {
                            console.error('[get-user-followers] Error fetching user rows:', usersErr);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                followers: []
                            });
                        }
                        // If we have a viewer, check which of these the viewer follows
                        let viewerFollowing = [];
                        if (userId) {
                            const { data: vf, error: vfErr } = await client.from('user_connections').select('following_id').eq('follower_id', userId).in('following_id', followerIds);
                            if (!vfErr && vf) viewerFollowing = vf.map((x)=>x.following_id);
                        }
                        const formatted = (followers || []).map((u)=>({
                                id: u.id,
                                full_name: u.full_name,
                                username: u.username,
                                profile_image_url: u.profile_image_url,
                                is_following: viewerFollowing.includes(u.id)
                            }));
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            followers: formatted
                        });
                    } catch (err) {
                        console.error('[get-user-followers] Unexpected error:', err);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            followers: []
                        });
                    }
                }
            case 'get-user-following':
                {
                    const { userId: targetUserId } = body;
                    if (!targetUserId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'User ID is required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    try {
                        const client = adminClient || supabase;
                        // Get following ids for the target user
                        const { data: followingRows, error: followingErr } = await client.from('user_connections').select('following_id').eq('follower_id', targetUserId);
                        if (followingErr) {
                            console.error('[get-user-following] Error:', followingErr);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                following: []
                            });
                        }
                        const followingIds = (followingRows || []).map((r)=>r.following_id);
                        if (followingIds.length === 0) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            following: []
                        });
                        const { data: followingUsers, error: usersErr } = await client.from('users').select('id, full_name, username, profile_image_url').in('id', followingIds).limit(200);
                        if (usersErr) {
                            console.error('[get-user-following] Error fetching user rows:', usersErr);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                following: []
                            });
                        }
                        // If we have a viewer, check which of these the viewer follows
                        let viewerFollowing = [];
                        if (userId) {
                            const { data: vf, error: vfErr } = await client.from('user_connections').select('following_id').eq('follower_id', userId).in('following_id', followingIds);
                            if (!vfErr && vf) viewerFollowing = vf.map((x)=>x.following_id);
                        }
                        const formatted = (followingUsers || []).map((u)=>({
                                id: u.id,
                                full_name: u.full_name,
                                username: u.username,
                                profile_image_url: u.profile_image_url,
                                is_following: viewerFollowing.includes(u.id)
                            }));
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            following: formatted
                        });
                    } catch (err) {
                        console.error('[get-user-following] Unexpected error:', err);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            following: []
                        });
                    }
                }
            case 'follow-user':
                {
                    if (!userId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Authentication required',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    const { targetUserId: followTargetId } = body;
                    if (!followTargetId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Target user ID is required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    if (userId === followTargetId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Cannot follow yourself',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    try {
                        console.log('[follow-user] User', userId, 'attempting to follow', followTargetId);
                        const followClient = authedClient || supabase;
                        // Check if already following
                        const { data: existingFollow, error: checkError } = await followClient.from('user_connections').select('id').eq('follower_id', userId).eq('following_id', followTargetId).maybeSingle();
                        if (checkError) {
                            console.error('[follow-user] Check error:', checkError);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Failed to check follow status',
                                success: false
                            }, {
                                status: 500
                            });
                        }
                        if (existingFollow) {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Already following this user',
                                success: false
                            }, {
                                status: 400
                            });
                        }
                        // Create connection
                        const { error: followError } = await followClient.from('user_connections').insert({
                            follower_id: userId,
                            following_id: followTargetId
                        });
                        if (followError) {
                            console.error('[follow-user] Insert error:', followError);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Failed to follow user',
                                success: false
                            }, {
                                status: 500
                            });
                        }
                        // Update follower/following counts (triggers should handle this, but ensure it's immediate)
                        try {
                            const [followerResult, followingResult] = await Promise.all([
                                followClient.from('users').select('followers_count').eq('id', followTargetId).single(),
                                followClient.from('users').select('following_count').eq('id', userId).single()
                            ]);
                            await Promise.all([
                                followClient.from('users').update({
                                    followers_count: (followerResult.data?.followers_count || 0) + 1
                                }).eq('id', followTargetId),
                                followClient.from('users').update({
                                    following_count: (followingResult.data?.following_count || 0) + 1
                                }).eq('id', userId)
                            ]);
                        } catch (countError) {
                            console.warn('[follow-user] Count update failed (non-fatal):', countError);
                        }
                        // Send follow notification to the target user
                        try {
                            const { data: actor } = await followClient.from('users').select('id, full_name, username, profile_image_url').eq('id', userId).single();
                            const actorName = actor?.full_name || actor?.username || 'Someone';
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createNotification"])(followTargetId, userId, 'new_follower', 'started following you', `/community/profile/${userId}`, {
                                latestActor: {
                                    id: userId,
                                    name: actorName,
                                    avatar_url: actor?.profile_image_url || undefined
                                }
                            });
                            console.log('[follow-user] Notification sent to', followTargetId);
                        } catch (notifError) {
                            console.warn('[follow-user] Notification failed (non-fatal):', notifError);
                        }
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            message: 'Successfully followed user'
                        });
                    } catch (error) {
                        console.error('[follow-user] Unexpected error:', error);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'An unexpected error occurred',
                            success: false
                        }, {
                            status: 500
                        });
                    }
                }
            case 'unfollow-user':
                {
                    if (!userId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Authentication required',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    const { targetUserId: unfollowTargetId } = body;
                    if (!unfollowTargetId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Target user ID is required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    try {
                        console.log('[unfollow-user] User', userId, 'attempting to unfollow', unfollowTargetId);
                        const unfollowClient = authedClient || supabase;
                        // Check if actually following
                        const { data: existingFollow, error: checkError } = await unfollowClient.from('user_connections').select('id').eq('follower_id', userId).eq('following_id', unfollowTargetId).maybeSingle();
                        if (checkError) {
                            console.error('[unfollow-user] Check error:', checkError);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Failed to check follow status',
                                success: false
                            }, {
                                status: 500
                            });
                        }
                        if (!existingFollow) {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Not following this user',
                                success: false
                            }, {
                                status: 400
                            });
                        }
                        // Delete connection
                        const { error: unfollowError } = await unfollowClient.from('user_connections').delete().eq('follower_id', userId).eq('following_id', unfollowTargetId);
                        if (unfollowError) {
                            console.error('[unfollow-user] Delete error:', unfollowError);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Failed to unfollow user',
                                success: false
                            }, {
                                status: 500
                            });
                        }
                        // Update follower/following counts
                        try {
                            const [followerResult, followingResult] = await Promise.all([
                                unfollowClient.from('users').select('followers_count').eq('id', unfollowTargetId).single(),
                                unfollowClient.from('users').select('following_count').eq('id', userId).single()
                            ]);
                            await Promise.all([
                                unfollowClient.from('users').update({
                                    followers_count: Math.max(0, (followerResult.data?.followers_count || 1) - 1)
                                }).eq('id', unfollowTargetId),
                                unfollowClient.from('users').update({
                                    following_count: Math.max(0, (followingResult.data?.following_count || 1) - 1)
                                }).eq('id', userId)
                            ]);
                        } catch (countError) {
                            console.warn('[unfollow-user] Count update failed (non-fatal):', countError);
                        }
                        console.log('[unfollow-user] Successfully unfollowed');
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            message: 'Successfully unfollowed user'
                        });
                    } catch (error) {
                        console.error('[unfollow-user] Unexpected error:', error);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'An unexpected error occurred',
                            success: false
                        }, {
                            status: 500
                        });
                    }
                }
            case 'get-barangays':
                try {
                    const { data: barangaysData, error: barangaysError } = await supabase.from('barangays').select('id, name, municipality').eq('is_active', true).order('name');
                    if (barangaysError) {
                        console.error('[get-barangays] Error:', barangaysError);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Failed to fetch barangays',
                            success: false
                        }, {
                            status: 500
                        });
                    }
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        barangays: barangaysData || []
                    });
                } catch (error) {
                    console.error('[get-barangays] Error:', error);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Failed to fetch barangays',
                        success: false
                    }, {
                        status: 500
                    });
                }
            case 'get-followers':
                {
                    // Get list of users who follow the specified userId
                    const { userId: targetUserId } = body;
                    if (!targetUserId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'User ID is required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    try {
                        const client = authedClient || supabase;
                        // Step 1: Get follower IDs
                        const { data: followsData, error: followsError } = await client.from('follows').select('follower_id').eq('following_id', targetUserId);
                        if (followsError) {
                            console.error('[get-followers] Error fetching follows:', followsError);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                followers: []
                            });
                        }
                        const followerIds = (followsData || []).map((f)=>f.follower_id).filter(Boolean);
                        if (followerIds.length === 0) {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                followers: []
                            });
                        }
                        // Step 2: Get user profiles for those IDs
                        const { data: usersData, error: usersError } = await client.from('users').select('id, full_name, username, profile_image_url').in('id', followerIds).eq('is_active', true);
                        if (usersError) {
                            console.error('[get-followers] Error fetching users:', usersError);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                followers: []
                            });
                        }
                        // Step 3: Check which followers the current user is following (if authenticated)
                        let followingSet = new Set();
                        if (userId) {
                            const { data: userFollowing } = await client.from('follows').select('following_id').eq('follower_id', userId);
                            followingSet = new Set((userFollowing || []).map((f)=>f.following_id));
                        }
                        const followers = (usersData || []).map((u)=>({
                                id: u.id,
                                full_name: u.full_name || u.username || '',
                                username: u.username || '',
                                profile_image_url: u.profile_image_url || null,
                                is_following: followingSet.has(u.id)
                            }));
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            followers
                        });
                    } catch (error) {
                        console.error('[get-followers] Error:', error);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Failed to fetch followers',
                            success: false
                        }, {
                            status: 500
                        });
                    }
                }
            case 'get-following':
                {
                    // Get list of users that the specified userId follows
                    const { userId: targetUserId } = body;
                    if (!targetUserId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'User ID is required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    try {
                        const client = authedClient || supabase;
                        // Step 1: Get following IDs
                        const { data: followsData, error: followsError } = await client.from('follows').select('following_id').eq('follower_id', targetUserId);
                        if (followsError) {
                            console.error('[get-following] Error fetching follows:', followsError);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                following: []
                            });
                        }
                        const followingIds = (followsData || []).map((f)=>f.following_id).filter(Boolean);
                        if (followingIds.length === 0) {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                following: []
                            });
                        }
                        // Step 2: Get user profiles for those IDs
                        const { data: usersData, error: usersError } = await client.from('users').select('id, full_name, username, profile_image_url').in('id', followingIds).eq('is_active', true);
                        if (usersError) {
                            console.error('[get-following] Error fetching users:', usersError);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                following: []
                            });
                        }
                        // Step 3: Check which of these the current user is also following (if authenticated)
                        let followingSet = new Set();
                        if (userId) {
                            const { data: userFollowing } = await client.from('follows').select('following_id').eq('follower_id', userId);
                            followingSet = new Set((userFollowing || []).map((f)=>f.following_id));
                        }
                        const following = (usersData || []).map((u)=>({
                                id: u.id,
                                full_name: u.full_name || u.username || '',
                                username: u.username || '',
                                profile_image_url: u.profile_image_url || null,
                                is_following: followingSet.has(u.id)
                            }));
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            following
                        });
                    } catch (error) {
                        console.error('[get-following] Error:', error);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Failed to fetch following',
                            success: false
                        }, {
                            status: 500
                        });
                    }
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

//# sourceMappingURL=%5Broot-of-the-server%5D__8086e9cf._.js.map