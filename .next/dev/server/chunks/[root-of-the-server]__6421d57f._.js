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
"[project]/app/api/supabase/functions/auth-handler/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://kgwndoatphthxmjuxhif.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtnd25kb2F0cGh0aHhtanV4aGlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTU3MjYsImV4cCI6MjA4NjQ3MTcyNn0.bLZ4yIk2cy4IpC2udj-TkF_F_Q4hv1twiGx2nYUiNZI");
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
async function POST(request) {
    try {
        const body = await request.json();
        const { action, email, password, fullName, username, phone, provider } = body;
        // Create Supabase client
        const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey);
        switch(action){
            case 'register':
                console.log('📝 Registration attempt:', {
                    email,
                    username,
                    fullName
                });
                if (!email || !password || !fullName || !username) {
                    console.log('❌ Missing required fields');
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'All fields are required',
                        success: false
                    }, {
                        status: 400
                    });
                }
                // Check if username already exists
                console.log('🔍 Checking if username exists:', username);
                const { data: existingUsername, error: usernameCheckError } = await supabase.from('users').select('username').eq('username', username.trim()).single();
                if (usernameCheckError && usernameCheckError.code !== 'PGRST116') {
                    // PGRST116 means no rows found, which is good
                    console.error('Error checking username:', usernameCheckError);
                }
                if (existingUsername) {
                    console.log('❌ Username already exists');
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Username already exists. Please choose a different username.',
                        success: false
                    }, {
                        status: 400
                    });
                }
                // Sign up user
                console.log('🔐 Creating auth user...');
                const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                    email: email.trim(),
                    password: password,
                    options: {
                        data: {
                            full_name: fullName.trim(),
                            username: username.trim(),
                            phone: phone?.trim() || ''
                        }
                    }
                });
                if (signUpError) {
                    console.error('❌ Auth signup error:', signUpError);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: signUpError.message,
                        success: false
                    }, {
                        status: 400
                    });
                }
                if (!signUpData.user) {
                    console.error('❌ No user returned from signup');
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Failed to create user account',
                        success: false
                    }, {
                        status: 400
                    });
                }
                console.log('✅ Auth user created:', signUpData.user.id);
                // Wait a moment for the database trigger to create the user profile
                await new Promise((resolve)=>setTimeout(resolve, 500));
                // Always ensure user profile exists, using admin client if needed
                let userProfile = null;
                let profileCheckError = null;
                try {
                    const { data, error } = await supabase.from('users').select('*').eq('id', signUpData.user.id).maybeSingle();
                    userProfile = data;
                    profileCheckError = error;
                } catch (err) {
                    profileCheckError = err;
                }
                if (!userProfile && supabaseServiceKey) {
                    // Use admin client to create profile if missing
                    const adminClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceKey, {
                        auth: {
                            autoRefreshToken: false,
                            persistSession: false
                        }
                    });
                    const userProfileData = {
                        id: signUpData.user.id,
                        email: signUpData.user.email,
                        full_name: fullName.trim(),
                        username: username.trim(),
                        phone: phone?.trim() || null,
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
                        recycled_devices: 0
                    };
                    const { data: insertData, error: insertError } = await adminClient.from('users').insert(userProfileData).select().maybeSingle();
                    if (!insertError && insertData) {
                        userProfile = insertData;
                        console.log('✅ User profile created manually:', insertData.id);
                    }
                }
                if (userProfile) {
                    console.log('✅ User profile exists:', userProfile.id);
                } else {
                    console.error('❌ User profile creation failed:', profileCheckError);
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    message: 'Registration successful! Please check your email to verify your account.',
                    user: signUpData.user,
                    profile: userProfile
                });
            case 'login':
                if (!email || !password) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Email and password are required',
                        success: false
                    }, {
                        status: 400
                    });
                }
                const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                    email: email.trim(),
                    password: password
                });
                if (signInError) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: signInError.message,
                        success: false
                    }, {
                        status: 400
                    });
                }
                if (!signInData.user || !signInData.session) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Login failed - no session created',
                        success: false
                    }, {
                        status: 400
                    });
                }
                // Ensure user profile exists, using admin client if needed
                let existingUser = null;
                try {
                    const { data } = await supabase.from('users').select('id').eq('id', signInData.user.id).maybeSingle();
                    existingUser = data;
                } catch  {}
                if (!existingUser && supabaseServiceKey) {
                    const adminClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseServiceKey, {
                        auth: {
                            autoRefreshToken: false,
                            persistSession: false
                        }
                    });
                    await adminClient.from('users').insert({
                        id: signInData.user.id,
                        email: signInData.user.email,
                        full_name: signInData.user.user_metadata?.full_name || '',
                        username: signInData.user.user_metadata?.username || signInData.user.email?.split('@')[0] || 'user',
                        phone: signInData.user.user_metadata?.phone || '',
                        bio: '',
                        location: '',
                        interests: [],
                        profile_image_url: '',
                        is_public: true,
                        eco_points: 0,
                        total_donations: 0,
                        total_co2_saved: 0,
                        is_active: true,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                    });
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    message: 'Login successful!',
                    user: signInData.user,
                    session: signInData.session
                });
            case 'forgot-password':
                if (!email) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Email is required',
                        success: false
                    }, {
                        status: 400
                    });
                }
                const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), {
                    redirectTo: `${request.headers.get('origin') || 'http://localhost:3000'}/reset-password`
                });
                if (resetError) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: resetError.message,
                        success: false
                    }, {
                        status: 400
                    });
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    message: 'Password reset email sent! Please check your inbox.'
                });
            case 'social-login':
                if (!provider) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: 'Provider is required for social login',
                        success: false
                    }, {
                        status: 400
                    });
                }
                const { data, error } = await supabase.auth.signInWithOAuth({
                    provider: provider,
                    options: {
                        redirectTo: `${request.headers.get('origin') || 'http://localhost:3000'}/dashboard`
                    }
                });
                if (error) {
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: error.message,
                        success: false
                    }, {
                        status: 400
                    });
                }
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    success: true,
                    url: data.url
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
        console.error('Auth handler error:', error);
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

//# sourceMappingURL=%5Broot-of-the-server%5D__6421d57f._.js.map