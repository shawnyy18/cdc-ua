(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/commentService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "handleCommentSubmit",
    ()=>handleCommentSubmit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
async function handleCommentSubmit(postId, commentText) {
    if (!commentText || !commentText.trim()) {
        // Nothing to do
        return null;
    }
    try {
        // Get current user
        const { data: userData, error: userErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
        if (userErr) {
            console.error('[handleCommentSubmit] failed to get user:', userErr);
            return null;
        }
        const user = userData?.user;
        if (!user || !user.id) {
            console.error('[handleCommentSubmit] no authenticated user found');
            return null;
        }
        // Insert into post_comments (use active flag to match your schema)
        const { data: inserted, error: insertErr } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].from('post_comments').insert({
            post_id: postId,
            user_id: user.id,
            content: commentText.trim(),
            is_active: true
        }).select().single();
        if (insertErr) {
            console.error('[handleCommentSubmit] insert error:', insertErr);
            return null;
        }
        // Try to clear a possible DOM input element with id `comment-input-<postId>` (graceful)
        try {
            const el = document.getElementById(`comment-input-${postId}`);
            if (el) el.value = '';
        } catch (e) {
        // In non-browser contexts (SSR) this will throw; ignore
        }
        return inserted || null;
    } catch (e) {
        console.error('[handleCommentSubmit] unexpected error:', e);
        return null;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/CommunityFeed.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunityFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$commentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/commentService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
function CommunityFeed() {
    _s();
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingLikes, setPendingLikes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentsOpen, setCommentsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentsByPost, setCommentsByPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentsLoading, setCommentsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentInputs, setCommentInputs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const realtimeSubs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommunityFeed.useEffect": ()=>{
            let mounted = true;
            async function load() {
                setLoading(true);
                setError(null);
                // Prefer the DB RPC which returns authoritative likes_count and whether
                // the current user has liked each post. This avoids stale server-side cache
                // that can cause likes_count to appear as 0 after page refresh.
                try {
                    const { data: rpcPosts, error: rpcError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('get_posts_with_like_details');
                    if (!rpcError && Array.isArray(rpcPosts)) {
                        if (mounted) setPosts(rpcPosts.map({
                            "CommunityFeed.useEffect.load": (fp)=>({
                                    id: fp.id,
                                    content: fp.content,
                                    likes_count: Number(fp.likes_count || 0),
                                    comments_count: fp.comments_count || 0,
                                    created_at: fp.created_at,
                                    user_full_name: fp.author_username || '',
                                    user_username: fp.author_username || '',
                                    user_profile_image: fp.author_profile_image || '',
                                    user_id: fp.author_id || '',
                                    user_liked: !!fp.user_has_liked
                                })
                        }["CommunityFeed.useEffect.load"]));
                    } else {
                        // Fallback to the existing handler if RPC fails (keeps backward compatibility)
                        const { data: sessionData } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
                        const token = sessionData?.session?.access_token;
                        const headers = {
                            'Content-Type': 'application/json'
                        };
                        if (token) headers['Authorization'] = `Bearer ${token}`;
                        const res = await fetch('/api/supabase/functions/community-handler', {
                            method: 'POST',
                            headers,
                            body: JSON.stringify({
                                action: 'get-community-posts'
                            })
                        });
                        const data = await res.json();
                        if (!res.ok || !data.success) {
                            setError(data?.error || 'Failed to load posts');
                            setPosts([]);
                        } else {
                            if (mounted) setPosts(data.posts || []);
                        }
                    }
                } catch (e) {
                    console.error('Failed to fetch posts', e);
                    setError('Failed to load posts');
                    if (mounted) setPosts([]);
                } finally{
                    if (mounted) setLoading(false);
                }
            }
            load();
            return ({
                "CommunityFeed.useEffect": ()=>{
                    mounted = false;
                }
            })["CommunityFeed.useEffect"];
        }
    }["CommunityFeed.useEffect"], []);
    async function toggleLike(postId) {
        // optimistic update
        setPendingLikes((prev)=>({
                ...prev,
                [postId]: true
            }));
        setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                    ...p,
                    user_liked: !p.user_liked,
                    likes_count: p.user_liked ? Math.max(0, (p.likes_count || 0) - 1) : (p.likes_count || 0) + 1
                } : p));
        try {
            const { data: sessionData } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
            const token = sessionData?.session?.access_token;
            if (!token) {
                // revert optimistic update and prompt sign-in
                setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                            ...p,
                            user_liked: !p.user_liked,
                            likes_count: p.user_liked ? Math.max(0, (p.likes_count || 0) - 1) : (p.likes_count || 0) + 1
                        } : p));
                setError('Please sign in to like posts.');
                return;
            }
            // Use Supabase RPC toggle_like for atomic toggle on the DB side.
            // The RPC returns a boolean indicating the new liked state.
            try {
                const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('toggle_like', {
                    post_id_to_toggle: postId
                });
                if (error) {
                    console.error('toggle_like RPC returned error:', error);
                    // revert optimistic update
                    setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                                ...p,
                                user_liked: !p.user_liked,
                                likes_count: p.user_liked ? Math.max(0, (p.likes_count || 0) - 1) : (p.likes_count || 0) + 1
                            } : p));
                    return;
                }
                console.log('toggle_like returned:', data);
                // `data` is expected to be a boolean (true if liked after call)
                const serverLiked = Array.isArray(data) ? data[0] : data;
                // Refresh authoritative post data for this user by calling the RPC that returns
                // posts with like details. This avoids stale server-side caches of likes_count.
                try {
                    const { data: freshPosts, error: freshError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('get_posts_with_like_details');
                    if (!freshError && Array.isArray(freshPosts)) {
                        // Map RPC rows into our Post type shape and update state
                        setPosts(freshPosts.map((fp)=>({
                                id: fp.id,
                                content: fp.content,
                                likes_count: Number(fp.likes_count || 0),
                                comments_count: fp.comments_count || 0,
                                created_at: fp.created_at,
                                user_full_name: fp.author_username || '',
                                user_username: fp.author_username || '',
                                user_profile_image: fp.author_profile_image || '',
                                user_id: fp.author_id || '',
                                user_liked: !!fp.user_has_liked
                            })));
                    } else {
                        // Fallback: only update the single post's liked state
                        setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                                    ...p,
                                    user_liked: typeof serverLiked === 'boolean' ? serverLiked : p.user_liked
                                } : p));
                    }
                } catch (e) {
                    console.error('Failed to refresh posts after toggle_like:', e);
                    // Fallback behavior
                    setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                                ...p,
                                user_liked: typeof serverLiked === 'boolean' ? serverLiked : p.user_liked
                            } : p));
                }
            } catch (err) {
                console.error('toggle_like RPC call failed:', err);
                // revert optimistic update
                setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                            ...p,
                            user_liked: !p.user_liked,
                            likes_count: p.user_liked ? Math.max(0, (p.likes_count || 0) - 1) : (p.likes_count || 0) + 1
                        } : p));
            } finally{
                setPendingLikes((prev)=>{
                    const copy = {
                        ...prev
                    };
                    delete copy[postId];
                    return copy;
                });
            }
        } catch (e) {
            console.error('Like failed', e);
            // revert optimistic
            setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                        ...p,
                        user_liked: !p.user_liked,
                        likes_count: p.user_liked ? Math.max(0, (p.likes_count || 0) - 1) : (p.likes_count || 0) + 1
                    } : p));
            setPendingLikes((prev)=>{
                const copy = {
                    ...prev
                };
                delete copy[postId];
                return copy;
            });
        }
    }
    // Fetch comments for a post using the RPC we added (get_comments_for_post)
    async function fetchComments(postId) {
        setCommentsLoading((prev)=>({
                ...prev,
                [postId]: true
            }));
        try {
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].rpc('get_comments_for_post', {
                post_id_to_fetch: postId
            });
            if (error) {
                console.error('[fetchComments] RPC error:', error);
                setCommentsByPost((prev)=>({
                        ...prev,
                        [postId]: []
                    }));
            } else if (Array.isArray(data)) {
                const mapped = data.map((c)=>({
                        id: c.id,
                        content: c.content,
                        created_at: c.created_at,
                        author_username: c.author_username
                    }));
                setCommentsByPost((prev)=>({
                        ...prev,
                        [postId]: mapped
                    }));
                // Keep the posts list in sync with authoritative comment count
                setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                            ...p,
                            comments_count: mapped.length
                        } : p));
            } else {
                setCommentsByPost((prev)=>({
                        ...prev,
                        [postId]: []
                    }));
            }
        } catch (e) {
            console.error('[fetchComments] unexpected error', e);
            setCommentsByPost((prev)=>({
                    ...prev,
                    [postId]: []
                }));
        } finally{
            setCommentsLoading((prev)=>({
                    ...prev,
                    [postId]: false
                }));
        }
    }
    function subscribeToComments(postId) {
        // avoid duplicate subscriptions
        if (realtimeSubs.current.has(postId)) return;
        const channel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].channel(`post_comments:${postId}`).on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'post_comments',
            filter: `post_id=eq.${postId}`
        }, (payload)=>{
            try {
                const newRow = payload.new;
                if (!newRow || !newRow.is_active) return;
                const comment = {
                    id: newRow.id,
                    content: newRow.content,
                    created_at: newRow.created_at,
                    author_username: newRow.author_username || newRow.user_id
                };
                setCommentsByPost((prev)=>{
                    const list = prev[postId] || [];
                    const next = [
                        ...list,
                        comment
                    ].sort((a, b)=>new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                    // increment posts.comments_count to reflect the new comment
                    setPosts((ps)=>ps.map((p)=>p.id === postId ? {
                                ...p,
                                comments_count: (p.comments_count || 0) + 1
                            } : p));
                    return {
                        ...prev,
                        [postId]: next
                    };
                });
            } catch (e) {
                console.error('[subscribeToComments] handler error', e);
            }
        }).subscribe();
        realtimeSubs.current.set(postId, channel);
    }
    async function unsubscribeFromComments(postId) {
        const channel = realtimeSubs.current.get(postId);
        if (!channel) return;
        try {
            await channel.unsubscribe();
        } catch (e) {
            console.warn('[unsubscribeFromComments] error', e);
        }
        realtimeSubs.current.delete(postId);
    }
    // Toggle comments panel open/close for a post
    async function toggleComments(postId) {
        const isOpen = !!commentsOpen[postId];
        if (isOpen) {
            // closing
            setCommentsOpen((prev)=>({
                    ...prev,
                    [postId]: false
                }));
            await unsubscribeFromComments(postId);
        } else {
            // opening: fetch comments then subscribe
            setCommentsOpen((prev)=>({
                    ...prev,
                    [postId]: true
                }));
            await fetchComments(postId);
            subscribeToComments(postId);
        }
    }
    // Submit comment for a post
    async function submitComment(postId) {
        const text = (commentInputs[postId] || '').trim();
        if (!text) return;
        const inserted = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$commentService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["handleCommentSubmit"])(postId, text);
        if (inserted) {
            // clear input state for controlled inputs
            setCommentInputs((prev)=>({
                    ...prev,
                    [postId]: ''
                }));
            // append optimistically — realtime will also deliver the new comment
            setCommentsByPost((prev)=>{
                const list = prev[postId] || [];
                const c = {
                    id: inserted.id,
                    content: inserted.content,
                    created_at: inserted.created_at,
                    author_username: inserted.author_username || ''
                };
                return {
                    ...prev,
                    [postId]: [
                        ...list,
                        c
                    ]
                };
            });
            // update comments count in posts state
            setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                        ...p,
                        comments_count: (p.comments_count || 0) + 1
                    } : p));
        }
    }
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-8",
        children: "Loading posts..."
    }, void 0, false, {
        fileName: "[project]/components/CommunityFeed.tsx",
        lineNumber: 279,
        columnNumber: 23
    }, this);
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "py-8 text-red-600",
        children: error
    }, void 0, false, {
        fileName: "[project]/components/CommunityFeed.tsx",
        lineNumber: 280,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4",
        children: [
            posts.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-500 py-6",
                children: "No posts yet — be the first to share!"
            }, void 0, false, {
                fileName: "[project]/components/CommunityFeed.tsx",
                lineNumber: 284,
                columnNumber: 30
            }, this),
            posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    className: "bg-white shadow rounded-lg p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: post.user_id ? `/community/profile/${post.user_id}` : '/profile',
                                    className: "h-10 w-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center",
                                    children: post.user_profile_image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: post.user_profile_image,
                                        alt: "avatar",
                                        className: "h-full w-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CommunityFeed.tsx",
                                        lineNumber: 290,
                                        columnNumber: 44
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-600",
                                        children: (post.user_full_name || post.user_username || 'U').slice(0, 1)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CommunityFeed.tsx",
                                        lineNumber: 290,
                                        columnNumber: 136
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/CommunityFeed.tsx",
                                    lineNumber: 289,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium text-gray-800",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: post.user_id ? `/community/profile/${post.user_id}` : '/profile',
                                                            className: "hover:underline",
                                                            children: post.user_full_name || post.user_username || 'Unknown'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 296,
                                                            columnNumber: 21
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommunityFeed.tsx",
                                                        lineNumber: 295,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-500",
                                                        children: new Date(post.created_at).toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommunityFeed.tsx",
                                                        lineNumber: 300,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CommunityFeed.tsx",
                                                lineNumber: 294,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/components/CommunityFeed.tsx",
                                            lineNumber: 293,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 text-gray-800 whitespace-pre-wrap",
                                            children: post.content
                                        }, void 0, false, {
                                            fileName: "[project]/components/CommunityFeed.tsx",
                                            lineNumber: 304,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    "aria-pressed": post.user_liked,
                                                    onClick: ()=>toggleLike(post.id),
                                                    disabled: !!pendingLikes[post.id],
                                                    className: `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${pendingLikes[post.id] ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${post.user_liked ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: `${post.user_liked ? 'ri-heart-fill' : 'ri-heart-line'}`
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 314,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm",
                                                            children: post.likes_count ?? 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 315,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/CommunityFeed.tsx",
                                                    lineNumber: 307,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        console.log('[CommunityFeed] comment click', post.id);
                                                        toggleComments(post.id);
                                                    },
                                                    "aria-label": `Open comments for post ${post.id}`,
                                                    className: "flex items-center gap-2 text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-50 z-10 pointer-events-auto",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-chat-3-line"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 324,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm",
                                                            children: post.comments_count ?? 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 325,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/CommunityFeed.tsx",
                                                    lineNumber: 318,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/CommunityFeed.tsx",
                                            lineNumber: 306,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/CommunityFeed.tsx",
                                    lineNumber: 292,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CommunityFeed.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, this),
                        commentsOpen[post.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-3 border-t pt-3",
                            children: commentsLoading[post.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm text-gray-500",
                                children: "Loading comments..."
                            }, void 0, false, {
                                fileName: "[project]/components/CommunityFeed.tsx",
                                lineNumber: 334,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-2",
                                children: [
                                    (commentsByPost[post.id] || []).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "py-2 flex items-start gap-3",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm font-medium text-gray-800",
                                                        children: c.author_username || 'User'
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommunityFeed.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-sm text-gray-700 whitespace-pre-wrap",
                                                        children: c.content
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommunityFeed.tsx",
                                                        lineNumber: 341,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-gray-400",
                                                        children: new Date(c.created_at).toLocaleString()
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommunityFeed.tsx",
                                                        lineNumber: 342,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/CommunityFeed.tsx",
                                                lineNumber: 339,
                                                columnNumber: 23
                                            }, this)
                                        }, c.id, false, {
                                            fileName: "[project]/components/CommunityFeed.tsx",
                                            lineNumber: 338,
                                            columnNumber: 21
                                        }, this)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                id: `comment-input-${post.id}`,
                                                value: commentInputs[post.id] || '',
                                                onChange: (e)=>setCommentInputs((prev)=>({
                                                            ...prev,
                                                            [post.id]: e.target.value
                                                        })),
                                                placeholder: "Write a comment...",
                                                className: "w-full border rounded-md p-2 text-sm",
                                                rows: 2
                                            }, void 0, false, {
                                                fileName: "[project]/components/CommunityFeed.tsx",
                                                lineNumber: 348,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 text-right",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>submitComment(post.id),
                                                    className: "px-3 py-1 bg-green-600 text-white rounded-md text-sm",
                                                    children: "Comment"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CommunityFeed.tsx",
                                                    lineNumber: 357,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CommunityFeed.tsx",
                                                lineNumber: 356,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CommunityFeed.tsx",
                                        lineNumber: 347,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CommunityFeed.tsx",
                                lineNumber: 336,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/CommunityFeed.tsx",
                            lineNumber: 332,
                            columnNumber: 13
                        }, this)
                    ]
                }, post.id, true, {
                    fileName: "[project]/components/CommunityFeed.tsx",
                    lineNumber: 287,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/CommunityFeed.tsx",
        lineNumber: 283,
        columnNumber: 5
    }, this);
}
_s(CommunityFeed, "WRKiSBW5bXAIqICvL/XbbVCZhRA=");
_c = CommunityFeed;
var _c;
__turbopack_context__.k.register(_c, "CommunityFeed");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/community/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Chatbot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Chatbot.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommunityFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CommunityFeed.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function CommunityPage() {
    _s();
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('feed');
    // Users state
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingUsers, setLoadingUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingSearch, setLoadingSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Impact state
    const [impact, setImpact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        active_members: 0,
        posts_today: 0
    });
    const [loadingImpact, setLoadingImpact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function makeAuthenticatedRequest(body) {
        const { data: sessionData } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
        const token = sessionData?.session?.access_token || null;
        const res = await fetch('/api/supabase/functions/community-handler', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...token ? {
                    Authorization: `Bearer ${token}`
                } : {}
            },
            body: JSON.stringify(body)
        });
        const data = await res.json().catch(()=>({}));
        return {
            ok: res.ok,
            data
        };
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommunityPage.useEffect": ()=>{
            // Load users when switching to users tab
            if (activeTab === 'users' && users.length === 0) {
                ;
                ({
                    "CommunityPage.useEffect": async ()=>{
                        setLoadingUsers(true);
                        try {
                            const { ok, data } = await makeAuthenticatedRequest({
                                action: 'get-community-users'
                            });
                            if (ok && data?.success) {
                                setUsers(data.users || []);
                            }
                        } catch (e) {
                            console.error('Error loading users', e);
                        } finally{
                            setLoadingUsers(false);
                        }
                    }
                })["CommunityPage.useEffect"]();
            }
            // Load impact when switching to impact tab
            if (activeTab === 'impact') {
                ;
                ({
                    "CommunityPage.useEffect": async ()=>{
                        setLoadingImpact(true);
                        try {
                            const { ok, data } = await makeAuthenticatedRequest({
                                action: 'get-community-impact'
                            });
                            if (ok && data?.success) {
                                setImpact(data.impact || impact);
                            }
                        } catch (e) {
                            console.error('Error loading impact', e);
                        } finally{
                            setLoadingImpact(false);
                        }
                    }
                })["CommunityPage.useEffect"]();
            }
        }
    }["CommunityPage.useEffect"], [
        activeTab
    ]);
    // Search users when query changes (debounced)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CommunityPage.useEffect": ()=>{
            let mounted = true;
            const q = searchQuery.trim();
            const timer = setTimeout({
                "CommunityPage.useEffect.timer": async ()=>{
                    if (q.length < 2) {
                        if (mounted) setSearchResults(null);
                        return;
                    }
                    setLoadingSearch(true);
                    try {
                        const { ok, data } = await makeAuthenticatedRequest({
                            action: 'search-users',
                            q
                        });
                        if (ok && data?.success) {
                            if (mounted) setSearchResults(data.users || []);
                        } else {
                            if (mounted) setSearchResults([]);
                        }
                    } catch (e) {
                        console.error('Search error', e);
                        if (mounted) setSearchResults([]);
                    } finally{
                        if (mounted) setLoadingSearch(false);
                    }
                }
            }["CommunityPage.useEffect.timer"], 350);
            return ({
                "CommunityPage.useEffect": ()=>{
                    mounted = false;
                    clearTimeout(timer);
                }
            })["CommunityPage.useEffect"];
        }
    }["CommunityPage.useEffect"], [
        searchQuery
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-green-50 to-emerald-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 py-6 max-w-7xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-6 items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "col-span-1 md:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white shadow rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                    className: "px-6 py-4 border-b border-gray-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl font-semibold",
                                            children: "Community"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 122,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-gray-600",
                                            children: "Connect, share, and find other members."
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 123,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "px-4 border-b border-gray-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex overflow-x-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveTab('feed'),
                                                className: `px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'feed' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-gray-800'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-home-line mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 135,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Community Feed"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveTab('users'),
                                                className: `px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'users' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-gray-800'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-group-line mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 145,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Find Users"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 139,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveTab('impact'),
                                                className: `px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'impact' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-gray-800'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-bar-chart-line mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 155,
                                                        columnNumber: 21
                                                    }, this),
                                                    "Community Impact"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 149,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/page.tsx",
                                        lineNumber: 128,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "p-6",
                                    children: [
                                        activeTab === 'feed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommunityFeed$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 164,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 19
                                        }, this),
                                        activeTab === 'users' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "user-search",
                                                            className: "sr-only",
                                                            children: "Search users"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    id: "user-search",
                                                                    value: searchQuery,
                                                                    onChange: (e)=>setSearchQuery(e.target.value),
                                                                    placeholder: "Search users by name or username (min 2 chars)",
                                                                    className: "w-full border rounded-md px-3 py-2 shadow-sm focus:ring-1 focus:ring-green-500"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 173,
                                                                    columnNumber: 25
                                                                }, this),
                                                                loadingSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "absolute right-3 top-2 text-sm text-gray-500",
                                                                    children: "Searching…"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 43
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 172,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500 mt-1",
                                                            children: "Tip: type at least 2 characters to search."
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 182,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 170,
                                                    columnNumber: 21
                                                }, this),
                                                loadingUsers && searchResults === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-500",
                                                    children: "Loading users…"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-4",
                                                    children: [
                                                        (searchResults !== null ? searchResults : users).map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "p-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: `/community/profile/${u.id}`,
                                                                    className: "flex items-center space-x-4 p-3 bg-white border rounded hover:bg-green-50 transition-colors",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: u.profile_image_url || '/default-avatar.png',
                                                                            alt: u.full_name || u.username,
                                                                            className: "h-10 w-10 rounded-full object-cover"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/community/page.tsx",
                                                                            lineNumber: 192,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "font-medium text-gray-800",
                                                                                    children: u.full_name || u.username
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/community/page.tsx",
                                                                                    lineNumber: 194,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "text-xs text-gray-500",
                                                                                    children: [
                                                                                        "@",
                                                                                        u.username
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/community/page.tsx",
                                                                                    lineNumber: 195,
                                                                                    columnNumber: 33
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/community/page.tsx",
                                                                            lineNumber: 193,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "ml-auto text-sm text-gray-600",
                                                                            children: [
                                                                                u.eco_points ?? 0,
                                                                                " pts"
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/community/page.tsx",
                                                                            lineNumber: 197,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/community/page.tsx",
                                                                    lineNumber: 191,
                                                                    columnNumber: 29
                                                                }, this)
                                                            }, u.id, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 190,
                                                                columnNumber: 27
                                                            }, this)),
                                                        searchResults !== null && searchResults.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "text-gray-500 p-3",
                                                            children: [
                                                                'No users found for "',
                                                                searchQuery,
                                                                '".'
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 188,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 169,
                                            columnNumber: 19
                                        }, this),
                                        activeTab === 'impact' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: loadingImpact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-500",
                                                children: "Loading metrics…"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 212,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 bg-white rounded shadow text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-semibold",
                                                                children: impact.active_members
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 216,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-500",
                                                                children: "Active members"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 217,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 215,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 bg-white rounded shadow text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-semibold",
                                                                children: impact.posts_today
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 220,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-sm text-gray-500",
                                                                children: "Posts today"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 221,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 219,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 214,
                                                columnNumber: 23
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 210,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 161,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 120,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/community/page.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "col-span-1 md:col-span-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:sticky md:top-20 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-2xl shadow-md p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-semibold text-gray-800",
                                            children: "Quick links"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "text-sm text-gray-600 mt-2 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/learn",
                                                        children: "Learn"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 237,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 237,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/donate",
                                                        children: "Donate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 238,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                        href: "/profile",
                                                        children: "Your profile"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/page.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 239,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 236,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 234,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Chatbot$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                    fileName: "[project]/app/community/page.tsx",
                                    lineNumber: 242,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/community/page.tsx",
                            lineNumber: 233,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/community/page.tsx",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/community/page.tsx",
                lineNumber: 116,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/community/page.tsx",
            lineNumber: 115,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/community/page.tsx",
        lineNumber: 114,
        columnNumber: 5
    }, this);
}
_s(CommunityPage, "L+3ejXUcM17B4M6KMe/Z6+a3L70=");
_c = CommunityPage;
var _c;
__turbopack_context__.k.register(_c, "CommunityPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_9ef7db06._.js.map