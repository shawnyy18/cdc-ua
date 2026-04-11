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
"[project]/app/api/notifications/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
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
async function GET(request) {
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
        const token = request.headers.get('authorization')?.replace('Bearer ', '') || '';
        let userId = null;
        if (token) {
            try {
                const { data: { user }, error: authError } = await supabase.auth.getUser(token);
                if (authError) {
                    // Expected in dev when token expires; reduce noise to warn
                    console.warn('[notifications] Unauthorized:', authError?.message || authError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        success: false,
                        error: 'Unauthorized',
                        notifications: []
                    }, {
                        status: 401
                    });
                }
                userId = user?.id;
            } catch (err) {
                console.warn('[notifications] Unauthorized (exception during auth):', err?.message || err);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Unauthorized',
                    notifications: []
                }, {
                    status: 401
                });
            }
        }
        if (!userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Unauthorized',
                notifications: []
            }, {
                status: 401
            });
        }
        // Paginated notifications
        const { searchParams } = new URL(request.url);
        const offset = Number(searchParams.get('offset')) || 0;
        const limit = Number(searchParams.get('limit')) || 20;
        const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getNotifications"])(userId, limit, offset);
        if (error) {
            console.error('[notifications] Query error:', error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message,
                notifications: []
            }, {
                status: 500
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            notifications: data || []
        });
    } catch (error) {
        console.error('[notifications] Unexpected error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message,
            notifications: []
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
        const token = request.headers.get('authorization')?.replace('Bearer ', '') || '';
        let userId = null;
        if (token) {
            const { data: { user }, error: authError } = await supabase.auth.getUser(token);
            if (authError) {
                console.warn('[notifications] Unauthorized:', authError?.message || authError);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Unauthorized'
                }, {
                    status: 401
                });
            }
            userId = user?.id || null;
        }
        if (!userId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Unauthorized'
            }, {
                status: 401
            });
        }
        const body = await request.json();
        const { action, notificationIds } = body;
        if (action === 'mark-read') {
            const { data, error } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$notificationService$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["markNotificationsRead"])(userId, notificationIds);
            if (error) {
                console.error('[notifications] Mark read error:', error);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: error.message
                }, {
                    status: 500
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                updated: data
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Invalid action'
        }, {
            status: 400
        });
    } catch (error) {
        console.error('[notifications] Unexpected error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__a6847fd2._.js.map