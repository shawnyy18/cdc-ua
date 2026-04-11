module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/socket.io [external] (socket.io, esm_import)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

const mod = await __turbopack_context__.y("socket.io");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/lib/socketServer.ts [api] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/pages/api/socket.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io__$5b$external$5d$__$28$socket$2e$io$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/socket.io [external] (socket.io, esm_import)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socketServer$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/socketServer.ts [api] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io__$5b$external$5d$__$28$socket$2e$io$2c$__esm_import$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io__$5b$external$5d$__$28$socket$2e$io$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const config = {
    api: {
        bodyParser: false
    }
};
let io = null;
const SocketHandler = (req, res)=>{
    // Basic CORS handling for polling transport preflights and XHR requests.
    const origin = req.headers.origin;
    // If an origin header is present, echo it back and allow credentials.
    // Otherwise, allow any origin but do not allow credentials.
    if (origin) {
        res.setHeader('Access-Control-Allow-Origin', origin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'false');
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    if (req.method === 'OPTIONS') {
        // Return early for preflight checks
        res.statusCode = 204;
        res.end();
        return;
    }
    if (!res.socket.server.io && !io) {
        console.log('Socket is initializing');
        io = new __TURBOPACK__imported__module__$5b$externals$5d2f$socket$2e$io__$5b$external$5d$__$28$socket$2e$io$2c$__esm_import$29$__["Server"](res.socket.server, {
            path: '/api/socket',
            addTrailingSlash: false,
            transports: [
                'websocket',
                'polling'
            ],
            pingTimeout: 60000,
            pingInterval: 25000,
            cors: {
                origin: '*'
            }
        });
        res.socket.server.io = io;
        // Also expose on a global accessor for server-side emits
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$socketServer$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["setIO"])(io);
        io.on('connection', (socket)=>{
            const userId = socket.handshake.query.userId;
            const transport = socket.conn.transport.name;
            console.log('Socket connected:', socket.id, 'transport:', transport, 'userId:', userId);
            if (userId) {
                socket.join(userId);
                console.log(`User ${userId} joined their room`);
            }
            socket.on('disconnect', (reason)=>{
                console.log('Socket disconnected:', socket.id, 'reason:', reason);
            });
            socket.on('error', (err)=>{
                console.warn('Socket error on', socket.id, err);
            });
            // Relay post updates coming from clients to other connected clients.
            // Clients emit 'post_updated' after they successfully mutate a post (like/comment).
            socket.on('post_updated', (payload)=>{
                try {
                    // Broadcast to everyone. Optionally we could scope to rooms like `post:{id}`
                    // but for simplicity emit globally so all clients can reconcile local state.
                    io?.emit('post_updated', payload);
                    console.log('Relayed post_updated', payload && payload.postId ? `post:${payload.postId}` : '', 'from', socket.id);
                } catch (e) {
                    console.warn('Failed to relay post_updated', e);
                }
            });
        });
    }
    res.end();
};
const __TURBOPACK__default__export__ = SocketHandler;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__850bbbe1._.js.map