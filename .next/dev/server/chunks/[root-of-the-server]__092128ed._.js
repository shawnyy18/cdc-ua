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
"[project]/app/api/admin/inventory-by-category/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
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
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
async function POST(request) {
    try {
        const body = await request.json().catch(()=>({}));
        const authHeader = request.headers.get('Authorization');
        const baseClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        });
        let authedClient = null;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.replace('Bearer ', '');
            authedClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey, {
                auth: {
                    persistSession: false,
                    autoRefreshToken: false
                },
                global: {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            });
        }
        const adminClient = supabaseServiceKey ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceKey, {
            auth: {
                persistSession: false,
                autoRefreshToken: false
            }
        }) : null;
        const checkClient = authedClient || adminClient || baseClient;
        let userId = null;
        if (authedClient) {
            try {
                const { data } = await baseClient.auth.getUser(authHeader.replace('Bearer ', ''));
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
        // Verify admin
        let scopeBarangayId = null;
        if (userId) {
            const { data: userRow, error: userErr } = await checkClient.from('users').select('id, is_admin, barangay_id, barangays(id, name, municipality)').eq('id', userId).maybeSingle();
            if (userErr) {
                console.error('[inventory-by-category] user lookup error', userErr);
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
                    error: 'Admin access required'
                }, {
                    status: 403
                });
            }
            // If the admin has a department (barangay_id in DB), restrict scope
            scopeBarangayId = userRow.barangay_id || null;
        }
        const queryClient = adminClient || checkClient;
        // Fetch donations minimally and aggregate in JS. We intentionally select only needed columns for performance.
        let donationsQuery = queryClient.from('donations').select('id, device_type, barangay_id, status');
        // If caller provided explicit department in the body (admin page filters), respect it only for IT Asset Managers
        if (body?.barangayId && !scopeBarangayId) {
            donationsQuery = donationsQuery.eq('barangay_id', body.barangayId);
        }
        // For department-scoped admin, enforce their department
        if (scopeBarangayId) donationsQuery = donationsQuery.eq('barangay_id', scopeBarangayId);
        const { data: donations, error } = await donationsQuery;
        if (error) {
            console.error('[inventory-by-category] fetch donations error', error);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Failed to load donations'
            }, {
                status: 500
            });
        }
        // Aggregate: per-department -> device_type -> count; also overall totals
        const departmentMap = {};
        const totals = {};
        (donations || []).forEach((d)=>{
            const bid = d.barangay_id || 'unknown';
            const dtype = String(d.device_type || 'unknown');
            if (!departmentMap[bid]) {
                departmentMap[bid] = {
                    id: bid,
                    categories: {},
                    total: 0
                };
            }
            const b = departmentMap[bid];
            b.categories[dtype] = (b.categories[dtype] || 0) + 1;
            b.total += 1;
            totals[dtype] = (totals[dtype] || 0) + 1;
        });
        // If IT Asset Manager (no department scope) enrich department names
        if (!scopeBarangayId) {
            const departmentIds = Object.keys(departmentMap).filter((id)=>id !== 'unknown');
            if (departmentIds.length > 0) {
                const { data: departments, error: bErr } = await queryClient.from('barangays').select('id, name, municipality').in('id', departmentIds);
                if (!bErr && Array.isArray(departments)) {
                    departments.forEach((b)=>{
                        if (departmentMap[b.id]) {
                            departmentMap[b.id].name = b.name;
                            departmentMap[b.id].municipality = b.municipality;
                        }
                    });
                }
            }
        } else {
            // For local admin, try to include department name from user's row
            try {
                const { data: bRow } = await queryClient.from('barangays').select('id, name, municipality').eq('id', scopeBarangayId).maybeSingle();
                if (bRow && departmentMap[scopeBarangayId]) {
                    departmentMap[scopeBarangayId].name = bRow.name;
                    departmentMap[scopeBarangayId].municipality = bRow.municipality;
                }
            } catch (e) {
            // ignore
            }
        }
        // Prepare response
        const departments = Object.values(departmentMap);
        // If local admin return only one department object to keep client simple
        if (scopeBarangayId) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: true,
                department: departments[0] || {
                    id: scopeBarangayId,
                    categories: {},
                    total: 0
                },
                totals
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            departments,
            totals
        });
    } catch (err) {
        console.error('[inventory-by-category] unexpected error', err);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__092128ed._.js.map