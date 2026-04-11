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
"[project]/app/api/supabase/functions/community-handler/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/notificationService.ts [app-route] (ecmascript)");
;
;
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://yxoxxrbukjyioyfveaml.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4b3h4cmJ1a2p5aW95ZnZlYW1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1ODYyNDUsImV4cCI6MjA3NjE2MjI0NX0.hbJzB2u6v4BB1Q1BYCPpazbxcXc-YOXlMgCiY0ZTP1o");
// Simple in-memory cache for posts and searches (30 seconds TTL)
const postsCache = new Map();
const searchCache = new Map();
const CACHE_TTL = 30000 // 30 seconds
;
async function POST(request) {
    try {
        const body = await request.json();
        const { action } = body;
        console.log('[community-handler] Action received:', action);
        // Create Supabase client
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
        // Get user from authorization header and create authenticated client
        const authHeader = request.headers.get('Authorization');
        let userId = null;
        let authedClient = null;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '');
            // Create authenticated client with user's token for RLS
            authedClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
                global: {
                    headers: {
                        Authorization: authHeader
                    }
                }
            });
            const { data: { user } } = await supabase.auth.getUser(token);
            userId = user?.id || null;
        }
        switch(action){
            case 'get-trending-topics':
                {
                    if (!userId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Authentication required',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    // Look back 14 days for trending hashtags
                    const since = new Date();
                    since.setDate(since.getDate() - 14);
                    const sinceISO = since.toISOString();
                    const { data: recentPosts, error: recentError } = await supabase.from('community_posts').select('content, created_at').eq('is_active', true).gte('created_at', sinceISO).order('created_at', {
                        ascending: false
                    }).limit(500);
                    if (recentError) {
                        console.error('[get-trending-topics] Error:', recentError);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            topics: []
                        });
                    }
                    const counts = new Map();
                    const hashtagRegex = /#([A-Za-z0-9_]+)/g;
                    for (const p of recentPosts || []){
                        if (!p?.content) continue;
                        const seen = new Set();
                        let match;
                        while(match = hashtagRegex.exec(p.content)){
                            const tag = `#${match[1].toLowerCase()}`;
                            if (seen.has(tag)) continue; // avoid double counting same tag per post
                            seen.add(tag);
                            counts.set(tag, (counts.get(tag) || 0) + 1);
                        }
                    }
                    const topics = Array.from(counts.entries()).sort((a, b)=>b[1] - a[1]).slice(0, 10).map(([tag, count])=>({
                            tag,
                            count
                        }));
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        topics
                    });
                }
            case 'delete-post':
                {
                    if (!userId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Authentication required',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    const { postId } = body;
                    if (!postId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Post ID is required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    try {
                        const delClient = authedClient || supabase;
                        // Ensure the post belongs to the requester
                        const { data: existing, error: checkErr } = await delClient.from('community_posts').select('id, user_id').eq('id', postId).eq('user_id', userId).maybeSingle();
                        if (checkErr) {
                            console.error('[delete-post] Check error:', checkErr);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Failed to verify post ownership',
                                success: false
                            }, {
                                status: 500
                            });
                        }
                        if (!existing) {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Post not found or not owned by you',
                                success: false
                            }, {
                                status: 403
                            });
                        }
                        // Soft-delete the post
                        const { error: updateErr } = await delClient.from('community_posts').update({
                            is_active: false
                        }).eq('id', postId).eq('user_id', userId);
                        if (updateErr) {
                            console.error('[delete-post] Update error:', updateErr);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Failed to delete post',
                                success: false
                            }, {
                                status: 500
                            });
                        }
                        // Invalidate posts cache so feeds refresh correctly
                        postsCache.clear();
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            message: 'Post deleted'
                        });
                    } catch (e) {
                        console.error('[delete-post] Unexpected error:', e);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Internal server error',
                            success: false
                        }, {
                            status: 500
                        });
                    }
                }
            case 'get-community-impact':
                {
                    if (!userId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Authentication required',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    // Today window
                    const start = new Date();
                    start.setHours(0, 0, 0, 0);
                    const end = new Date();
                    end.setHours(23, 59, 59, 999);
                    const [usersRes, postsRes, itemsRes, sellersRes] = await Promise.all([
                        supabase.from('users').select('id', {
                            count: 'exact',
                            head: true
                        }).eq('is_active', true).eq('is_public', true).eq('is_admin', false),
                        supabase.from('community_posts').select('id', {
                            count: 'exact',
                            head: true
                        }).eq('is_active', true).gte('created_at', start.toISOString()).lte('created_at', end.toISOString()),
                        supabase.from('marketplace_items').select('id', {
                            count: 'exact',
                            head: true
                        }).eq('is_available', true),
                        supabase.from('users').select('id', {
                            count: 'exact',
                            head: true
                        }).eq('is_seller', true).eq('is_active', true)
                    ]);
                    const impact = {
                        active_members: usersRes.count || 0,
                        posts_today: postsRes.count || 0,
                        marketplace_items: itemsRes.count || 0,
                        verified_sellers: sellersRes.count || 0
                    };
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        impact
                    });
                }
            case 'get-community-users':
                // Public access to community users
                console.log('[get-community-users] Fetching public users');
                const startTime = Date.now();
                const { data: users, error: usersError } = await supabase.from('users').select('id, full_name, username, email, profile_image_url, bio, location, eco_points, total_donations, total_co2_saved, is_seller, is_public, created_at').eq('is_active', true).eq('is_public', true).eq('is_admin', false) // Exclude admin accounts from community page
                .order('eco_points', {
                    ascending: false
                });
                const duration = Date.now() - startTime;
                console.log(`[get-community-users] Query complete in ${duration}ms, found ${users?.length || 0} users`);
                if (usersError) {
                    console.error('[get-community-users] Error:', usersError);
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    users: users || []
                });
            case 'get-following-posts':
                {
                    // Get posts ONLY from users the current user follows
                    if (!userId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Authentication required',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    console.log('[get-following-posts] Fetching posts for user:', userId);
                    // NOTE: No caching for following posts - needs to reflect follow/unfollow changes immediately
                    const startTimeFollowing = Date.now();
                    // Step 1: Get list of users the current user is following
                    const { data: followingData, error: followingError } = await supabase.from('user_connections').select('following_id').eq('follower_id', userId);
                    if (followingError) {
                        console.error('[get-following-posts] Error fetching following:', followingError);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            posts: []
                        });
                    }
                    const followingIds = followingData?.map((f)=>f.following_id) || [];
                    // Also include the user's own posts
                    followingIds.push(userId);
                    if (followingIds.length === 0) {
                        console.log('[get-following-posts] User follows no one');
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            posts: []
                        });
                    }
                    // Step 2: Fetch posts from followed users
                    const { data: posts, error: postsError } = await supabase.from('community_posts').select(`
            id, content, likes_count, comments_count, created_at, user_id,
            users!community_posts_user_id_fkey (
              id, full_name, username, profile_image_url, is_seller
            )
          `).eq('is_active', true).in('user_id', followingIds).order('created_at', {
                        ascending: false
                    }).limit(50);
                    const postsDuration = Date.now() - startTimeFollowing;
                    console.log(`[get-following-posts] Query complete in ${postsDuration}ms, found ${posts?.length || 0} posts`);
                    if (postsError) {
                        console.error('[get-following-posts] Error:', postsError);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            posts: []
                        });
                    }
                    // Check which posts the current user has liked
                    const postIds = posts?.map((p)=>p.id) || [];
                    let userLikes = [];
                    if (postIds.length > 0) {
                        const { data: likes } = await supabase.from('post_likes').select('post_id').eq('user_id', userId).in('post_id', postIds);
                        userLikes = likes?.map((l)=>l.post_id) || [];
                    }
                    const formattedPosts = posts?.map((post)=>({
                            id: post.id,
                            content: post.content,
                            likes_count: post.likes_count || 0,
                            comments_count: post.comments_count || 0,
                            created_at: post.created_at,
                            user_id: post.users?.id,
                            user_full_name: post.users?.full_name,
                            user_username: post.users?.username,
                            user_profile_image: post.users?.profile_image_url,
                            user_is_seller: post.users?.is_seller || false,
                            user_liked: userLikes.includes(post.id)
                        })) || [];
                    const duration = Date.now() - startTimeFollowing;
                    console.log(`[get-following-posts] Returned ${formattedPosts.length} posts in ${duration}ms`);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        posts: formattedPosts
                    });
                }
            case 'get-community-posts':
                {
                    // Support public (unauthenticated) reads of the community feed for convenience in dev
                    const isAuthenticated = !!userId;
                    if (isAuthenticated) {
                        console.log('[get-community-posts] Fetching posts for user:', userId);
                    } else {
                        console.log('[get-community-posts] Fetching public posts (unauthenticated)');
                    }
                    // Check cache first (use public cache when unauthenticated)
                    const cacheKey = isAuthenticated ? `posts_${userId}` : `posts_public`;
                    const cachedData = postsCache.get(cacheKey);
                    if (cachedData && Date.now() - cachedData.timestamp < CACHE_TTL) {
                        console.log('[get-community-posts] Returning cached data');
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            posts: cachedData.data
                        });
                    }
                    const postsStartTime = Date.now();
                    const { data: posts, error: postsError } = await supabase.from('community_posts').select(`
            id, content, likes_count, comments_count, created_at, user_id,
            users!community_posts_user_id_fkey (
              id, full_name, username, profile_image_url, is_seller
            )
          `).eq('is_active', true).order('created_at', {
                        ascending: false
                    }).limit(50);
                    const postsDuration = Date.now() - postsStartTime;
                    console.log(`[get-community-posts] Posts query complete in ${postsDuration}ms, found ${posts?.length || 0} posts`);
                    if (postsError) {
                        console.error('[get-community-posts] Error:', postsError);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            posts: []
                        });
                    }
                    // If authenticated, check which posts the current user has liked
                    const postIds = posts?.map((p)=>p.id) || [];
                    let userLikes = [];
                    if (isAuthenticated && postIds.length > 0) {
                        const { data: likes } = await supabase.from('post_likes').select('post_id').eq('user_id', userId).in('post_id', postIds);
                        userLikes = likes?.map((l)=>l.post_id) || [];
                    }
                    const formattedPosts = posts?.map((post)=>({
                            id: post.id,
                            content: post.content,
                            likes_count: post.likes_count || 0,
                            comments_count: post.comments_count || 0,
                            created_at: post.created_at,
                            user_id: post.users?.id,
                            user_full_name: post.users?.full_name,
                            user_username: post.users?.username,
                            user_profile_image: post.users?.profile_image_url,
                            user_is_seller: post.users?.is_seller || false,
                            user_liked: isAuthenticated ? userLikes.includes(post.id) : false
                        })) || [];
                    // Cache the formatted posts
                    postsCache.set(cacheKey, {
                        data: formattedPosts,
                        timestamp: Date.now()
                    });
                    console.log(`[get-community-posts] Data cached for ${isAuthenticated ? `user: ${userId}` : 'public'}`);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        posts: formattedPosts
                    });
                }
            case 'create-post':
                if (!userId) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Authentication required',
                        success: false
                    }, {
                        status: 401
                    });
                }
                const { content } = body;
                if (!content || !content.trim()) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Post content is required',
                        success: false
                    }, {
                        status: 400
                    });
                }
                if (content.length > 500) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Post content too long (max 500 characters)',
                        success: false
                    }, {
                        status: 400
                    });
                }
                // Use authenticated client for RLS policy compliance
                const postClient = authedClient || supabase;
                const { data: newPost, error: createError } = await postClient.from('community_posts').insert({
                    user_id: userId,
                    content: content.trim(),
                    likes_count: 0,
                    comments_count: 0,
                    is_active: true
                }).select().single();
                if (createError) {
                    console.error('[create-post] Error:', createError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Failed to create post',
                        success: false
                    }, {
                        status: 500
                    });
                }
                // Invalidate posts cache for all users to show new post immediately
                postsCache.clear();
                console.log('[create-post] Posts cache cleared');
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    post: newPost,
                    message: 'Your post has been shared with the community! 🌱'
                });
            case 'like-post':
                {
                    if (!userId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Authentication required',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    const { postId } = body;
                    if (!postId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Post ID is required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    try {
                        // Use authenticated client for RLS policies
                        const likeClient = authedClient || supabase;
                        // Check if user already liked this post
                        const { data: existingLike, error: checkError } = await likeClient.from('post_likes').select('id').eq('post_id', postId).eq('user_id', userId).maybeSingle();
                        if (checkError) {
                            console.error('[like-post] Check error:', checkError);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Failed to check like status',
                                success: false
                            }, {
                                status: 500
                            });
                        }
                        if (existingLike) {
                            // Unlike
                            const { error: deleteError } = await likeClient.from('post_likes').delete().eq('post_id', postId).eq('user_id', userId);
                            if (deleteError) {
                                console.error('[like-post] Unlike error:', deleteError);
                                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                    error: 'Failed to unlike post',
                                    success: false
                                }, {
                                    status: 500
                                });
                            }
                            // Decrease likes count (handled by trigger, but keep for backwards compatibility)
                            const { data: currentPost } = await likeClient.from('community_posts').select('likes_count').eq('id', postId).single();
                            await likeClient.from('community_posts').update({
                                likes_count: Math.max(0, (currentPost?.likes_count || 1) - 1)
                            }).eq('id', postId);
                        } else {
                            // Like
                            const { error: insertError } = await likeClient.from('post_likes').insert({
                                post_id: postId,
                                user_id: userId
                            });
                            if (insertError) {
                                console.error('[like-post] Like error:', insertError);
                                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                    error: 'Failed to like post',
                                    success: false
                                }, {
                                    status: 500
                                });
                            }
                            // Increase likes count (handled by trigger, but keep for backwards compatibility)
                            const { data: currentPost } = await likeClient.from('community_posts').select('likes_count').eq('id', postId).single();
                            await supabase.from('community_posts').update({
                                likes_count: (currentPost?.likes_count || 0) + 1
                            }).eq('id', postId);
                            // Send aggregated like notification to post owner
                            try {
                                const { data: postOwner } = await supabase.from('community_posts').select('user_id').eq('id', postId).single();
                                if (postOwner?.user_id && postOwner.user_id !== userId) {
                                    // Fetch actor details for nicer labels
                                    const { data: actor } = await supabase.from('users').select('id, full_name, username, profile_image_url').eq('id', userId).single();
                                    const actorName = actor?.full_name || actor?.username || undefined;
                                    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createNotification"])(postOwner.user_id, userId, 'post_like', 'liked your post', '/community', {
                                        aggregationKey: `post_like:${postId}`,
                                        latestActor: {
                                            id: userId,
                                            name: actorName,
                                            avatar_url: actor?.profile_image_url || undefined
                                        }
                                    });
                                }
                            } catch (notifError) {
                                // Non-fatal: notification failure shouldn't break the like
                                console.error('[like-post] Notification error:', notifError);
                            }
                        }
                        // Invalidate posts cache to reflect like changes
                        postsCache.clear();
                        // Return authoritative likes_count so clients can reconcile exact numbers
                        try {
                            const { data: updatedPost } = await supabase.from('community_posts').select('likes_count').eq('id', postId).single();
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                liked: !existingLike,
                                likes_count: updatedPost?.likes_count || 0,
                                message: existingLike ? 'Post unliked' : 'Post liked'
                            });
                        } catch (fetchErr) {
                            console.error('[like-post] Failed to fetch updated likes_count:', fetchErr);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                liked: !existingLike,
                                message: existingLike ? 'Post unliked' : 'Post liked'
                            });
                        }
                    } catch (error) {
                        console.error('[like-post] Unexpected error:', error);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'An unexpected error occurred',
                            success: false
                        }, {
                            status: 500
                        });
                    }
                }
            case 'get-marketplace-items':
                if (!userId) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Authentication required',
                        success: false
                    }, {
                        status: 401
                    });
                }
                const { data: items, error: itemsError } = await supabase.from('marketplace_items').select(`
            id, title, description, price, original_price, category, condition,
            image_url, views_count, created_at, seller_id,
            users!marketplace_items_seller_id_fkey (
              id, full_name, username, profile_image_url
            )
          `).eq('is_available', true).order('created_at', {
                    ascending: false
                }).limit(50);
                if (itemsError) {
                    console.error('Marketplace items fetch error:', itemsError);
                }
                const formattedItems = items?.map((item)=>({
                        id: item.id,
                        title: item.title,
                        description: item.description,
                        price: item.price,
                        original_price: item.original_price,
                        category: item.category,
                        condition: item.condition,
                        image_url: item.image_url,
                        views_count: item.views_count || 0,
                        created_at: item.created_at,
                        seller_id: item.users?.id,
                        seller_name: item.users?.full_name || item.users?.username,
                        seller_image: item.users?.profile_image_url
                    })) || [];
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    items: formattedItems
                });
            case 'search-users':
                {
                    const { q } = body;
                    const query = (q || '').trim();
                    // Enforce min length and never return all users by default
                    if (query.length < 2) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            users: []
                        });
                    }
                    const cacheKey = `search_${query.toLowerCase()}`;
                    const cached = searchCache.get(cacheKey);
                    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            users: cached.data
                        });
                    }
                    // Use ILIKE search across full_name and username
                    const { data: results, error: searchError } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey).from('users').select('id, full_name, username, profile_image_url, bio, location, eco_points, total_donations, total_co2_saved, is_seller, is_public, created_at').eq('is_active', true).eq('is_public', true).eq('is_admin', false).or(`full_name.ilike.%${query}%,username.ilike.%${query}%`).order('eco_points', {
                        ascending: false
                    }).limit(20);
                    if (searchError) {
                        console.error('[search-users] Error:', searchError);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            users: []
                        });
                    }
                    searchCache.set(cacheKey, {
                        data: results || [],
                        timestamp: Date.now()
                    });
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        users: results || []
                    });
                }
            case 'create-comment':
                {
                    if (!userId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Authentication required',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    const { postId, content: commentContent } = body;
                    if (!postId || !commentContent || !commentContent.trim()) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Post ID and comment content are required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    if (commentContent.length > 500) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Comment too long (max 500 characters)',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    const commentClient = authedClient || supabase;
                    const { data: newComment, error: commentError } = await commentClient.from('post_comments').insert({
                        post_id: postId,
                        user_id: userId,
                        content: commentContent.trim(),
                        is_active: true
                    }).select().single();
                    if (commentError) {
                        // If comments table hasn't been created yet, avoid HTTP 500 to prevent noisy client errors
                        if (commentError?.code === 'PGRST205') {
                            console.warn('[create-comment] Comments not enabled (migration missing).');
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: false,
                                error: 'comments_not_enabled',
                                message: 'Comments are not available yet. Please apply migration 08_community_optimization.sql.'
                            }, {
                                status: 200
                            });
                        }
                        console.error('[create-comment] Error:', commentError);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Failed to create comment',
                            success: false
                        }, {
                            status: 500
                        });
                    }
                    // Invalidate posts cache
                    postsCache.clear();
                    // Send aggregated comment notification to post owner (best-effort)
                    try {
                        const { data: postOwner } = await supabase.from('community_posts').select('user_id').eq('id', postId).single();
                        if (postOwner?.user_id && postOwner.user_id !== userId) {
                            const { data: actor } = await supabase.from('users').select('id, full_name, username, profile_image_url').eq('id', userId).single();
                            const actorName = actor?.full_name || actor?.username || undefined;
                            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createNotification"])(postOwner.user_id, userId, 'post_comment', 'commented on your post', '/community', {
                                aggregationKey: `post_comment:${postId}`,
                                latestActor: {
                                    id: userId,
                                    name: actorName,
                                    avatar_url: actor?.profile_image_url || undefined
                                }
                            });
                        }
                    } catch (notifError) {
                        console.error('[create-comment] Notification error:', notifError);
                    }
                    // Return authoritative comments_count if possible
                    try {
                        const { data: updatedPost } = await supabase.from('community_posts').select('comments_count').eq('id', postId).single();
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            comment: newComment,
                            comments_count: updatedPost?.comments_count || 0,
                            message: 'Comment posted successfully'
                        });
                    } catch (fetchErr) {
                        console.error('[create-comment] Failed to fetch updated comments_count:', fetchErr);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            comment: newComment,
                            message: 'Comment posted successfully'
                        });
                    }
                }
            case 'delete-comment':
                {
                    if (!userId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Authentication required',
                            success: false
                        }, {
                            status: 401
                        });
                    }
                    const { commentId, postId: ddPostId } = body;
                    if (!commentId || !ddPostId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Comment ID and Post ID are required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    try {
                        const delClient = authedClient || supabase;
                        // Soft-delete the comment for auditability
                        const { error: delErr } = await delClient.from('post_comments').update({
                            is_active: false
                        }).eq('id', commentId).eq('user_id', userId);
                        if (delErr) {
                            console.error('[delete-comment] Error deleting comment:', delErr);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                error: 'Failed to delete comment',
                                success: false
                            }, {
                                status: 500
                            });
                        }
                        // Recalculate comments_count for the post
                        const { data: postRow } = await supabase.from('post_comments').select('id').eq('post_id', ddPostId).eq('is_active', true);
                        const commentsCount = postRow && Array.isArray(postRow) ? postRow.length : 0;
                        // Update post's comments_count to keep DB consistent (best-effort)
                        await supabase.from('community_posts').update({
                            comments_count: commentsCount
                        }).eq('id', ddPostId);
                        // Invalidate posts cache
                        postsCache.clear();
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            comments_count: commentsCount,
                            message: 'Comment deleted'
                        });
                    } catch (e) {
                        console.error('[delete-comment] Unexpected error:', e);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Internal server error',
                            success: false
                        }, {
                            status: 500
                        });
                    }
                }
            case 'get-post-comments':
                {
                    const { postId: commentsPostId } = body;
                    if (!commentsPostId) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            error: 'Post ID is required',
                            success: false
                        }, {
                            status: 400
                        });
                    }
                    const { data: comments, error: commentsError } = await supabase.from('post_comments').select(`
            id, content, created_at, user_id,
            users!post_comments_user_id_fkey (
              id, full_name, username, profile_image_url
            )
          `).eq('post_id', commentsPostId).eq('is_active', true).order('created_at', {
                        ascending: true
                    }).limit(100);
                    if (commentsError) {
                        // If the comments table hasn't been created yet, return a graceful response
                        if (commentsError?.code === 'PGRST205') {
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                comments: [],
                                error: 'comments_not_enabled'
                            });
                        }
                        console.error('[get-post-comments] Error:', commentsError);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            comments: []
                        });
                    }
                    const formattedComments = comments?.map((comment)=>({
                            id: comment.id,
                            content: comment.content,
                            created_at: comment.created_at,
                            user_id: comment.users?.id,
                            user_full_name: comment.users?.full_name,
                            user_username: comment.users?.username,
                            user_profile_image: comment.users?.profile_image_url
                        })) || [];
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        comments: formattedComments
                    });
                }
            case 'get-liked-posts':
                {
                    // Return list of post IDs that the current user has liked
                    const { postIds } = body;
                    if (!userId) {
                        // Unauthenticated users can't have likes
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            liked: []
                        });
                    }
                    if (!Array.isArray(postIds) || postIds.length === 0) {
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            liked: []
                        });
                    }
                    try {
                        const likeClient = authedClient || supabase;
                        const { data: likes, error: likesError } = await likeClient.from('post_likes').select('post_id').eq('user_id', userId).in('post_id', postIds);
                        if (likesError) {
                            console.error('[get-liked-posts] Error:', likesError);
                            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                                success: true,
                                liked: []
                            });
                        }
                        const likedIds = (likes || []).map((l)=>l.post_id);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            liked: likedIds
                        });
                    } catch (err) {
                        console.error('[get-liked-posts] Unexpected error:', err);
                        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                            success: true,
                            liked: []
                        });
                    }
                }
            case 'get-user-posts':
                // Get posts for a specific user (for their profile page)
                const { userId: postUserId } = body;
                if (!postUserId) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'User ID is required',
                        success: false
                    }, {
                        status: 400
                    });
                }
                console.log('[get-user-posts] Fetching posts for user:', postUserId);
                const { data: userPosts, error: userPostsError } = await supabase.from('community_posts').select('id, content, likes_count, comments_count, created_at, user_id').eq('user_id', postUserId).eq('is_active', true).order('created_at', {
                    ascending: false
                }).limit(20);
                if (userPostsError) {
                    console.error('[get-user-posts] Error:', userPostsError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: true,
                        posts: []
                    });
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    posts: userPosts || []
                });
            default:
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    error: 'Invalid action specified',
                    success: false
                }, {
                    status: 400
                });
        }
    } catch (error) {
        console.error('Community handler error:', error);
        console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: 'Internal server error',
            success: false,
            details: error instanceof Error ? error.message : 'Unknown error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__e9c35126._.js.map