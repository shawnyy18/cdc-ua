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
"[project]/app/api/admin/cdc-status/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PATCH",
    ()=>PATCH,
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
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
// Disposition type → final status mapping
const DISPOSITION_MAP = {
    reallocate: 'reallocated',
    donate: 'donated',
    dispose: 'disposed',
    void: 'voided'
};
const VALID_STATUSES = [
    'pending_evaluation',
    'reallocated',
    'donated',
    'disposed',
    'voided'
];
async function PATCH(request) {
    try {
        const body = await request.json().catch(()=>({}));
        const { id, status, dispositionType, conditionOverride, notes } = body;
        if (!id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Missing donation id'
            }, {
                status: 400
            });
        }
        // Accept either a raw status or a dispositionType (preferred new flow)
        let finalStatus = null;
        if (dispositionType) {
            finalStatus = DISPOSITION_MAP[dispositionType];
            if (!finalStatus) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: `Invalid dispositionType. Must be one of: ${Object.keys(DISPOSITION_MAP).join(', ')}`
                }, {
                    status: 400
                });
            }
        } else if (status) {
            if (!VALID_STATUSES.includes(status)) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`
                }, {
                    status: 400
                });
            }
            finalStatus = status;
        } else {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Missing status or dispositionType'
            }, {
                status: 400
            });
        }
        const authHeader = request.headers.get('Authorization');
        const baseClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });
        const adminClient = supabaseServiceKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        }) : null;
        // Authenticate user
        let userId = null;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '');
            try {
                const { data } = await baseClient.auth.getUser(token);
                userId = data?.user?.id || null;
            } catch  {
            // ignore
            }
        }
        if (!userId && !adminClient) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Authentication required'
            }, {
                status: 401
            });
        }
        // Verify IT Asset Manager status
        const checkClient = adminClient || baseClient;
        if (userId) {
            const { data: userRow, error: userErr } = await checkClient.from('users').select('id, is_admin').eq('id', userId).maybeSingle();
            if (userErr) {
                console.error('[cdc-status] user lookup error', userErr);
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'Unable to verify user'
                }, {
                    status: 500
                });
            }
            if (!userRow || !userRow.is_admin) {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: false,
                    error: 'IT Asset Manager access required'
                }, {
                    status: 403
                });
            }
        }
        // Build update payload
        const queryClient = adminClient || checkClient;
        const { data: targetDonation, error: targetDonationError } = await queryClient.from('donations').select('id, device_type').eq('id', id).single();
        if (targetDonationError || !targetDonation) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Record not found'
            }, {
                status: 404
            });
        }
        if (targetDonation.device_type === 'hazardous-consumables' && finalStatus !== 'disposed') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Hazardous submissions are locked to Dispose workflow'
            }, {
                status: 400
            });
        }
        const updatePayload = {
            status: finalStatus,
            updated_at: new Date().toISOString()
        };
        if (dispositionType) updatePayload.disposition_type = dispositionType;
        if (notes) updatePayload.disposition_notes = notes;
        if (conditionOverride && [
            'working',
            'defective'
        ].includes(conditionOverride)) {
            updatePayload.condition = conditionOverride === 'defective' ? 'broken' : 'working';
        }
        if (userId) {
            updatePayload.evaluated_by = userId;
            updatePayload.evaluated_at = new Date().toISOString();
        }
        const { data, error } = await queryClient.from('donations').update(updatePayload).eq('id', id).eq('is_cdc_asset', true).select().single();
        if (error) {
            console.error('[cdc-status] update error', error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: error.message
            }, {
                status: 500
            });
        }
        if (!data) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Record not found'
            }, {
                status: 404
            });
        }
        // Recalculate eco stats — count reallocated + donated as "positive" dispositions
        if (data.user_id) {
            const { data: positiveDonations } = await queryClient.from('donations').select('eco_points_earned, co2_saved').eq('user_id', data.user_id).in('status', [
                'reallocated',
                'donated'
            ]);
            const totalEcoPoints = (positiveDonations || []).reduce((sum, d)=>sum + (d.eco_points_earned || 0), 0);
            const totalCo2 = (positiveDonations || []).reduce((sum, d)=>sum + (d.co2_saved || 0), 0);
            const totalDonations = (positiveDonations || []).length;
            await queryClient.from('users').update({
                eco_points: totalEcoPoints,
                total_co2_saved: Math.round(totalCo2 * 100) / 100,
                total_donations: totalDonations,
                updated_at: new Date().toISOString()
            }).eq('id', data.user_id);
            console.log(`[cdc-status] Updated user ${data.user_id} eco_points to ${totalEcoPoints}`);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data
        });
    } catch (err) {
        console.error('[cdc-status] unexpected error', err);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__5efe74cd._.js.map