module.exports = [
"[project]/components/CommunityFeed.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunityFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function CommunityFeed() {
    const [posts, setPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingLikes, setPendingLikes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentsOpen, setCommentsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentsByPost, setCommentsByPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentsLoading, setCommentsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentInputs, setCommentInputs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [submittingComment, setSubmittingComment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const realtimeSubs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(new Map());
    const mountedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(true);
    // New post creation state
    const [newPostContent, setNewPostContent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [isCreatingPost, setIsCreatingPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [createPostError, setCreatePostError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentUserId, setCurrentUserId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Feed filter state: 'all' or 'following'
    const [feedFilter, setFeedFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('following');
    // Cleanup subscriptions on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        mountedRef.current = true;
        return ()=>{
            mountedRef.current = false;
            // Cleanup all realtime subscriptions
            realtimeSubs.current.forEach((channel)=>{
                try {
                    channel.unsubscribe();
                } catch (e) {
                // ignore cleanup errors
                }
            });
            realtimeSubs.current.clear();
        };
    }, []);
    // Helper to make authenticated API requests
    const makeAuthenticatedRequest = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (body)=>{
        const { data: sessionData } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
        const token = sessionData?.session?.access_token;
        const headers = {
            'Content-Type': 'application/json'
        };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        const res = await fetch('/api/supabase/functions/community-handler', {
            method: 'POST',
            headers,
            body: JSON.stringify(body)
        });
        const data = await res.json().catch(()=>({}));
        return {
            ok: res.ok,
            data
        };
    }, []);
    // Get current user on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchCurrentUser() {
            const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
            if (user) {
                setCurrentUserId(user.id);
                // Also fetch user profile for avatar display
                const { data: profile } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from('users').select('id, full_name, username, profile_image_url').eq('id', user.id).single();
                if (profile) {
                    setCurrentUser(profile);
                }
            }
        }
        fetchCurrentUser();
    }, []);
    // Map RPC row to Post type
    const mapRpcPostToPost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((fp)=>({
            id: fp.id,
            content: fp.content,
            likes_count: Number(fp.likes_count || 0),
            comments_count: fp.comments_count || 0,
            created_at: fp.created_at,
            user_full_name: fp.author_username || fp.user_full_name || '',
            user_username: fp.author_username || fp.user_username || '',
            user_profile_image: fp.author_profile_image || fp.user_profile_image || '',
            user_id: fp.author_id || fp.user_id || '',
            user_liked: !!fp.user_has_liked
        }), []);
    // Load posts based on current filter
    const loadPosts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!mountedRef.current) return;
        setLoading(true);
        setError(null);
        try {
            if (feedFilter === 'following') {
                // Load only posts from users we follow
                console.log('[CommunityFeed] Loading following posts');
                const { ok, data } = await makeAuthenticatedRequest({
                    action: 'get-following-posts'
                });
                if (!ok || !data.success) {
                    if (mountedRef.current) {
                        // If not authenticated, show message
                        if (data?.error === 'Authentication required') {
                            setError('Please sign in to see posts from people you follow.');
                        } else {
                            setError(data?.error || 'Failed to load posts');
                        }
                        setPosts([]);
                    }
                } else {
                    if (mountedRef.current) {
                        setPosts(data.posts || []);
                    }
                }
            } else {
                // Load all posts (explore mode)
                console.log('[CommunityFeed] Loading all posts');
                // Try RPC first for better data accuracy
                const { data: rpcPosts, error: rpcError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('get_posts_with_like_details');
                if (!rpcError && Array.isArray(rpcPosts) && rpcPosts.length >= 0) {
                    if (mountedRef.current) {
                        setPosts(rpcPosts.map(mapRpcPostToPost));
                    }
                } else {
                    // Fallback to API handler
                    console.log('[CommunityFeed] RPC failed, falling back to API:', rpcError?.message);
                    const { ok, data } = await makeAuthenticatedRequest({
                        action: 'get-community-posts'
                    });
                    if (!ok || !data.success) {
                        if (mountedRef.current) {
                            setError(data?.error || 'Failed to load posts');
                            setPosts([]);
                        }
                    } else {
                        if (mountedRef.current) {
                            setPosts(data.posts || []);
                        }
                    }
                }
            }
        } catch (e) {
            console.error('[CommunityFeed] Failed to fetch posts:', e);
            if (mountedRef.current) {
                setError('Failed to load posts. Please try again.');
                setPosts([]);
            }
        } finally{
            if (mountedRef.current) {
                setLoading(false);
            }
        }
    }, [
        makeAuthenticatedRequest,
        mapRpcPostToPost,
        feedFilter
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadPosts();
    }, [
        loadPosts
    ]);
    // Create a new post
    const createPost = async ()=>{
        const content = newPostContent.trim();
        if (!content) return;
        if (!currentUserId) {
            setCreatePostError('Please sign in to create a post.');
            return;
        }
        if (content.length > 500) {
            setCreatePostError('Post content is too long (max 500 characters).');
            return;
        }
        setIsCreatingPost(true);
        setCreatePostError(null);
        try {
            const { ok, data } = await makeAuthenticatedRequest({
                action: 'create-post',
                content
            });
            if (ok && data.success && data.post) {
                // Add the new post to the top of the list optimistically
                const newPost = {
                    id: data.post.id,
                    content: data.post.content,
                    likes_count: 0,
                    comments_count: 0,
                    created_at: data.post.created_at,
                    user_full_name: currentUser?.full_name || '',
                    user_username: currentUser?.full_name || '',
                    user_profile_image: currentUser?.profile_image_url || '',
                    user_id: currentUserId,
                    user_liked: false
                };
                setPosts((prev)=>[
                        newPost,
                        ...prev
                    ]);
                setNewPostContent('');
            } else {
                setCreatePostError(data?.error || 'Failed to create post. Please try again.');
            }
        } catch (e) {
            console.error('[CommunityFeed] Create post error:', e);
            setCreatePostError('Failed to create post. Please try again.');
        } finally{
            setIsCreatingPost(false);
        }
    };
    // Toggle like on a post
    async function toggleLike(postId) {
        if (!currentUserId) {
            setError('Please sign in to like posts.');
            return;
        }
        // Optimistic update
        setPendingLikes((prev)=>({
                ...prev,
                [postId]: true
            }));
        const originalPosts = [
            ...posts
        ];
        setPosts((prev)=>prev.map((p)=>{
                if (p.id !== postId) return p;
                return {
                    ...p,
                    user_liked: !p.user_liked,
                    likes_count: p.user_liked ? Math.max(0, (p.likes_count || 0) - 1) : (p.likes_count || 0) + 1
                };
            }));
        try {
            // Try RPC first
            const { data: rpcData, error: rpcError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('toggle_like', {
                post_id_to_toggle: postId
            });
            if (rpcError) {
                console.error('[toggleLike] RPC error:', rpcError);
                // Try API fallback
                const { ok, data } = await makeAuthenticatedRequest({
                    action: 'like-post',
                    postId
                });
                if (!ok || !data.success) {
                    // Revert optimistic update
                    setPosts(originalPosts);
                    return;
                }
                // Update with server response
                if (typeof data.likes_count === 'number') {
                    setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                                ...p,
                                likes_count: data.likes_count,
                                user_liked: data.liked
                            } : p));
                }
            } else {
                // RPC succeeded, refresh posts to get accurate counts
                const { data: freshPosts, error: freshError } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('get_posts_with_like_details');
                if (!freshError && Array.isArray(freshPosts)) {
                    setPosts(freshPosts.map(mapRpcPostToPost));
                }
            }
        } catch (e) {
            console.error('[toggleLike] Error:', e);
            // Revert optimistic update
            setPosts(originalPosts);
        } finally{
            setPendingLikes((prev)=>{
                const copy = {
                    ...prev
                };
                delete copy[postId];
                return copy;
            });
        }
    }
    // Fetch comments for a post
    async function fetchComments(postId) {
        setCommentsLoading((prev)=>({
                ...prev,
                [postId]: true
            }));
        try {
            // Try RPC first
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('get_comments_for_post', {
                post_id_to_fetch: postId
            });
            if (error) {
                console.log('[fetchComments] RPC error, trying API:', error.message);
                // Fallback to API
                const { ok, data: apiData } = await makeAuthenticatedRequest({
                    action: 'get-post-comments',
                    postId
                });
                if (ok && apiData?.success) {
                    const mapped = (apiData.comments || []).map((c)=>({
                            id: c.id,
                            content: c.content,
                            created_at: c.created_at,
                            author_username: c.user_full_name || c.user_username || 'User',
                            user_profile_image: c.user_profile_image
                        }));
                    setCommentsByPost((prev)=>({
                            ...prev,
                            [postId]: mapped
                        }));
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
            } else if (Array.isArray(data)) {
                const mapped = data.map((c)=>({
                        id: c.id,
                        content: c.content,
                        created_at: c.created_at,
                        author_username: c.author_username || 'User',
                        user_profile_image: c.author_profile_image
                    }));
                setCommentsByPost((prev)=>({
                        ...prev,
                        [postId]: mapped
                    }));
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
            console.error('[fetchComments] Error:', e);
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
    // Subscribe to realtime comment updates
    function subscribeToComments(postId) {
        if (realtimeSubs.current.has(postId)) return;
        const channel = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].channel(`post_comments:${postId}`).on('postgres_changes', {
            event: 'INSERT',
            schema: 'public',
            table: 'post_comments',
            filter: `post_id=eq.${postId}`
        }, (payload)=>{
            try {
                const newRow = payload.new;
                if (!newRow || !newRow.is_active) return;
                // Avoid duplicate if we already have this comment
                setCommentsByPost((prev)=>{
                    const list = prev[postId] || [];
                    if (list.some((c)=>c.id === newRow.id)) return prev;
                    const comment = {
                        id: newRow.id,
                        content: newRow.content,
                        created_at: newRow.created_at,
                        author_username: newRow.author_username || 'User'
                    };
                    const next = [
                        ...list,
                        comment
                    ].sort((a, b)=>new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
                    return {
                        ...prev,
                        [postId]: next
                    };
                });
                // Update comment count
                setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                            ...p,
                            comments_count: (p.comments_count || 0) + 1
                        } : p));
            } catch (e) {
                console.error('[subscribeToComments] Handler error:', e);
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
            console.warn('[unsubscribeFromComments] Error:', e);
        }
        realtimeSubs.current.delete(postId);
    }
    // Toggle comments panel
    async function toggleComments(postId) {
        const isOpen = !!commentsOpen[postId];
        if (isOpen) {
            setCommentsOpen((prev)=>({
                    ...prev,
                    [postId]: false
                }));
            await unsubscribeFromComments(postId);
        } else {
            setCommentsOpen((prev)=>({
                    ...prev,
                    [postId]: true
                }));
            await fetchComments(postId);
            subscribeToComments(postId);
        }
    }
    // Submit a comment
    async function submitComment(postId) {
        const content = (commentInputs[postId] || '').trim();
        if (!content) return;
        if (!currentUserId) {
            setError('Please sign in to comment.');
            return;
        }
        setSubmittingComment((prev)=>({
                ...prev,
                [postId]: true
            }));
        try {
            const { ok, data } = await makeAuthenticatedRequest({
                action: 'create-comment',
                postId,
                content
            });
            if (ok && data.success) {
                // Clear input
                setCommentInputs((prev)=>({
                        ...prev,
                        [postId]: ''
                    }));
                // Add comment optimistically (realtime will also deliver it, but we check for duplicates)
                if (data.comment) {
                    const newComment = {
                        id: data.comment.id,
                        content: data.comment.content,
                        created_at: data.comment.created_at,
                        author_username: currentUser?.full_name || 'You',
                        user_profile_image: currentUser?.profile_image_url
                    };
                    setCommentsByPost((prev)=>{
                        const list = prev[postId] || [];
                        if (list.some((c)=>c.id === newComment.id)) return prev;
                        return {
                            ...prev,
                            [postId]: [
                                ...list,
                                newComment
                            ]
                        };
                    });
                }
                // Update comment count
                if (typeof data.comments_count === 'number') {
                    setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                                ...p,
                                comments_count: data.comments_count
                            } : p));
                } else {
                    setPosts((prev)=>prev.map((p)=>p.id === postId ? {
                                ...p,
                                comments_count: (p.comments_count || 0) + 1
                            } : p));
                }
            } else {
                console.error('[submitComment] Failed:', data?.error);
            }
        } catch (e) {
            console.error('[submitComment] Error:', e);
        } finally{
            setSubmittingComment((prev)=>({
                    ...prev,
                    [postId]: false
                }));
        }
    }
    // Delete a post (only for the owner)
    async function deletePost(postId) {
        if (!confirm('Are you sure you want to delete this post?')) return;
        const originalPosts = [
            ...posts
        ];
        // Optimistic removal
        setPosts((prev)=>prev.filter((p)=>p.id !== postId));
        try {
            const { ok, data } = await makeAuthenticatedRequest({
                action: 'delete-post',
                postId
            });
            if (!ok || !data.success) {
                // Revert
                setPosts(originalPosts);
                alert(data?.error || 'Failed to delete post');
            }
        } catch (e) {
            console.error('[deletePost] Error:', e);
            setPosts(originalPosts);
            alert('Failed to delete post. Please try again.');
        }
    }
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-8 flex items-center justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"
                }, void 0, false, {
                    fileName: "[project]/components/CommunityFeed.tsx",
                    lineNumber: 499,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ml-3 text-gray-600",
                    children: "Loading posts..."
                }, void 0, false, {
                    fileName: "[project]/components/CommunityFeed.tsx",
                    lineNumber: 500,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/CommunityFeed.tsx",
            lineNumber: 498,
            columnNumber: 7
        }, this);
    }
    if (error && posts.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "py-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-red-600 mb-4",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/components/CommunityFeed.tsx",
                    lineNumber: 508,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: loadPosts,
                    className: "px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700",
                    children: "Try Again"
                }, void 0, false, {
                    fileName: "[project]/components/CommunityFeed.tsx",
                    lineNumber: 509,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/CommunityFeed.tsx",
            lineNumber: 507,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            currentUserId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white shadow rounded-lg p-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-10 w-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0",
                            children: currentUser?.profile_image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: currentUser.profile_image_url,
                                alt: "Your avatar",
                                className: "h-full w-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/components/CommunityFeed.tsx",
                                lineNumber: 527,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-600",
                                children: (currentUser?.full_name || 'U').slice(0, 1).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/components/CommunityFeed.tsx",
                                lineNumber: 529,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/CommunityFeed.tsx",
                            lineNumber: 525,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                    value: newPostContent,
                                    onChange: (e)=>setNewPostContent(e.target.value),
                                    placeholder: "Share something with the community...",
                                    className: "w-full border border-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent",
                                    rows: 3,
                                    maxLength: 500
                                }, void 0, false, {
                                    fileName: "[project]/components/CommunityFeed.tsx",
                                    lineNumber: 535,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mt-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs text-gray-500",
                                            children: [
                                                newPostContent.length,
                                                "/500 characters"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/CommunityFeed.tsx",
                                            lineNumber: 544,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: createPost,
                                            disabled: isCreatingPost || !newPostContent.trim(),
                                            className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isCreatingPost || !newPostContent.trim() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`,
                                            children: isCreatingPost ? 'Posting...' : 'Post'
                                        }, void 0, false, {
                                            fileName: "[project]/components/CommunityFeed.tsx",
                                            lineNumber: 547,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/CommunityFeed.tsx",
                                    lineNumber: 543,
                                    columnNumber: 15
                                }, this),
                                createPostError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 text-sm text-red-600",
                                    children: createPostError
                                }, void 0, false, {
                                    fileName: "[project]/components/CommunityFeed.tsx",
                                    lineNumber: 560,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CommunityFeed.tsx",
                            lineNumber: 534,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/CommunityFeed.tsx",
                    lineNumber: 524,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/CommunityFeed.tsx",
                lineNumber: 523,
                columnNumber: 9
            }, this),
            !currentUserId && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white shadow rounded-lg p-4 text-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 mb-3",
                        children: "Sign in to share posts and interact with the community!"
                    }, void 0, false, {
                        fileName: "[project]/components/CommunityFeed.tsx",
                        lineNumber: 570,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/login",
                        className: "inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700",
                        children: "Sign In"
                    }, void 0, false, {
                        fileName: "[project]/components/CommunityFeed.tsx",
                        lineNumber: 571,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CommunityFeed.tsx",
                lineNumber: 569,
                columnNumber: 9
            }, this),
            error && posts.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg",
                children: [
                    error,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setError(null),
                        className: "ml-2 text-yellow-600 hover:text-yellow-700",
                        children: "Dismiss"
                    }, void 0, false, {
                        fileName: "[project]/components/CommunityFeed.tsx",
                        lineNumber: 581,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CommunityFeed.tsx",
                lineNumber: 579,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white shadow rounded-lg p-1 flex gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFeedFilter('following'),
                        className: `flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${feedFilter === 'following' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`,
                        children: "Following"
                    }, void 0, false, {
                        fileName: "[project]/components/CommunityFeed.tsx",
                        lineNumber: 589,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setFeedFilter('all'),
                        className: `flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${feedFilter === 'all' ? 'bg-green-600 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`,
                        children: "Explore"
                    }, void 0, false, {
                        fileName: "[project]/components/CommunityFeed.tsx",
                        lineNumber: 599,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/CommunityFeed.tsx",
                lineNumber: 588,
                columnNumber: 7
            }, this),
            posts.length === 0 && !loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-500 py-6 text-center bg-white shadow rounded-lg",
                children: feedFilter === 'following' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "No posts from people you follow yet."
                        }, void 0, false, {
                            fileName: "[project]/components/CommunityFeed.tsx",
                            lineNumber: 616,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: [
                                "Switch to ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setFeedFilter('all'),
                                    className: "text-green-600 hover:underline font-medium",
                                    children: "Explore"
                                }, void 0, false, {
                                    fileName: "[project]/components/CommunityFeed.tsx",
                                    lineNumber: 618,
                                    columnNumber: 27
                                }, this),
                                " to discover new people to follow!"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CommunityFeed.tsx",
                            lineNumber: 617,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/CommunityFeed.tsx",
                    lineNumber: 615,
                    columnNumber: 13
                }, this) : 'No posts yet — be the first to share!'
            }, void 0, false, {
                fileName: "[project]/components/CommunityFeed.tsx",
                lineNumber: 613,
                columnNumber: 9
            }, this),
            posts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                    className: "bg-white shadow rounded-lg p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: post.user_id ? `/community/profile/${post.user_id}` : '/profile',
                                    className: "h-10 w-10 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0",
                                    children: post.user_profile_image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: post.user_profile_image,
                                        alt: "avatar",
                                        className: "h-full w-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CommunityFeed.tsx",
                                        lineNumber: 635,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-gray-600",
                                        children: (post.user_full_name || post.user_username || 'U').slice(0, 1).toUpperCase()
                                    }, void 0, false, {
                                        fileName: "[project]/components/CommunityFeed.tsx",
                                        lineNumber: 637,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/CommunityFeed.tsx",
                                    lineNumber: 630,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 min-w-0",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                            href: post.user_id ? `/community/profile/${post.user_id}` : '/profile',
                                                            className: "text-sm font-medium text-gray-800 hover:underline",
                                                            children: post.user_full_name || post.user_username || 'Unknown'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 645,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-500",
                                                            children: new Date(post.created_at).toLocaleString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 651,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/CommunityFeed.tsx",
                                                    lineNumber: 644,
                                                    columnNumber: 17
                                                }, this),
                                                currentUserId === post.user_id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>deletePost(post.id),
                                                    className: "text-gray-400 hover:text-red-600 p-1",
                                                    title: "Delete post",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-delete-bin-line"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommunityFeed.tsx",
                                                        lineNumber: 662,
                                                        columnNumber: 21
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CommunityFeed.tsx",
                                                    lineNumber: 657,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/CommunityFeed.tsx",
                                            lineNumber: 643,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-3 text-gray-800 whitespace-pre-wrap break-words",
                                            children: post.content
                                        }, void 0, false, {
                                            fileName: "[project]/components/CommunityFeed.tsx",
                                            lineNumber: 667,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 flex items-center gap-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    "aria-pressed": post.user_liked,
                                                    onClick: ()=>toggleLike(post.id),
                                                    disabled: !!pendingLikes[post.id],
                                                    className: `flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${pendingLikes[post.id] ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'} ${post.user_liked ? 'text-red-600 bg-red-50' : 'text-gray-600 hover:bg-gray-50'}`,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: post.user_liked ? 'ri-heart-fill' : 'ri-heart-line'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 684,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm",
                                                            children: post.likes_count ?? 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 685,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/CommunityFeed.tsx",
                                                    lineNumber: 673,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: ()=>toggleComments(post.id),
                                                    className: "flex items-center gap-2 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "ri-chat-3-line"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 693,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-sm",
                                                            children: post.comments_count ?? 0
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 694,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/CommunityFeed.tsx",
                                                    lineNumber: 688,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/CommunityFeed.tsx",
                                            lineNumber: 672,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/CommunityFeed.tsx",
                                    lineNumber: 642,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/CommunityFeed.tsx",
                            lineNumber: 629,
                            columnNumber: 11
                        }, this),
                        commentsOpen[post.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 border-t pt-4",
                            children: commentsLoading[post.id] ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center text-sm text-gray-500",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400 mr-2"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CommunityFeed.tsx",
                                        lineNumber: 705,
                                        columnNumber: 19
                                    }, this),
                                    "Loading comments..."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CommunityFeed.tsx",
                                lineNumber: 704,
                                columnNumber: 17
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    (commentsByPost[post.id] || []).length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-500",
                                        children: "No comments yet. Be the first to comment!"
                                    }, void 0, false, {
                                        fileName: "[project]/components/CommunityFeed.tsx",
                                        lineNumber: 711,
                                        columnNumber: 21
                                    }, this),
                                    (commentsByPost[post.id] || []).map((comment)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-start gap-2 py-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 text-xs",
                                                    children: comment.user_profile_image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: comment.user_profile_image,
                                                        alt: "",
                                                        className: "h-full w-full rounded-full object-cover"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/CommunityFeed.tsx",
                                                        lineNumber: 718,
                                                        columnNumber: 27
                                                    }, this) : (comment.author_username || 'U').slice(0, 1).toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CommunityFeed.tsx",
                                                    lineNumber: 716,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm font-medium text-gray-800",
                                                            children: comment.author_username || 'User'
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 724,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-sm text-gray-700 whitespace-pre-wrap break-words",
                                                            children: comment.content
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 727,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-xs text-gray-400 mt-1",
                                                            children: new Date(comment.created_at).toLocaleString()
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/CommunityFeed.tsx",
                                                            lineNumber: 730,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/CommunityFeed.tsx",
                                                    lineNumber: 723,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, comment.id, true, {
                                            fileName: "[project]/components/CommunityFeed.tsx",
                                            lineNumber: 715,
                                            columnNumber: 21
                                        }, this)),
                                    currentUserId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-3 border-t",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                value: commentInputs[post.id] || '',
                                                onChange: (e)=>setCommentInputs((prev)=>({
                                                            ...prev,
                                                            [post.id]: e.target.value
                                                        })),
                                                placeholder: "Write a comment...",
                                                className: "w-full border border-gray-200 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500",
                                                rows: 2,
                                                maxLength: 500
                                            }, void 0, false, {
                                                fileName: "[project]/components/CommunityFeed.tsx",
                                                lineNumber: 740,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 flex justify-end",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>submitComment(post.id),
                                                    disabled: submittingComment[post.id] || !(commentInputs[post.id] || '').trim(),
                                                    className: `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${submittingComment[post.id] || !(commentInputs[post.id] || '').trim() ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`,
                                                    children: submittingComment[post.id] ? 'Posting...' : 'Comment'
                                                }, void 0, false, {
                                                    fileName: "[project]/components/CommunityFeed.tsx",
                                                    lineNumber: 749,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/CommunityFeed.tsx",
                                                lineNumber: 748,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/CommunityFeed.tsx",
                                        lineNumber: 739,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-3 border-t text-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/login",
                                            className: "text-sm text-green-600 hover:text-green-700",
                                            children: "Sign in to comment"
                                        }, void 0, false, {
                                            fileName: "[project]/components/CommunityFeed.tsx",
                                            lineNumber: 764,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/CommunityFeed.tsx",
                                        lineNumber: 763,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/CommunityFeed.tsx",
                                lineNumber: 709,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/CommunityFeed.tsx",
                            lineNumber: 702,
                            columnNumber: 13
                        }, this)
                    ]
                }, post.id, true, {
                    fileName: "[project]/components/CommunityFeed.tsx",
                    lineNumber: 628,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/CommunityFeed.tsx",
        lineNumber: 520,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/community/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CommunityPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Chatbot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Chatbot.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommunityFeed$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/CommunityFeed.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function CommunityPage() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('feed');
    // Users state
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loadingUsers, setLoadingUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [searchResults, setSearchResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loadingSearch, setLoadingSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Impact state
    const [impact, setImpact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        active_members: 0,
        posts_today: 0
    });
    const [loadingImpact, setLoadingImpact] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    async function makeAuthenticatedRequest(body) {
        const { data: sessionData } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getSession();
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Load users when switching to users tab
        if (activeTab === 'users' && users.length === 0) {
            ;
            (async ()=>{
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
            })();
        }
        // Load impact when switching to impact tab
        if (activeTab === 'impact') {
            ;
            (async ()=>{
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
            })();
        }
    }, [
        activeTab
    ]);
    // Search users when query changes (debounced)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let mounted = true;
        const q = searchQuery.trim();
        const timer = setTimeout(async ()=>{
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
        }, 350);
        return ()=>{
            mounted = false;
            clearTimeout(timer);
        };
    }, [
        searchQuery
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-green-50 to-emerald-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 py-6 max-w-7xl",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-6 items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "col-span-1 md:col-span-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-white shadow rounded-lg",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                    className: "px-6 py-4 border-b border-gray-100",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-2xl font-semibold",
                                            children: "Community"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 122,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "px-4 border-b border-gray-200",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex overflow-x-auto",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveTab('feed'),
                                                className: `px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'feed' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-gray-800'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveTab('users'),
                                                className: `px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'users' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-gray-800'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setActiveTab('impact'),
                                                className: `px-6 py-4 font-medium whitespace-nowrap ${activeTab === 'impact' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-600 hover:text-gray-800'}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                    className: "p-6",
                                    children: [
                                        activeTab === 'feed' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$CommunityFeed$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 164,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 19
                                        }, this),
                                        activeTab === 'users' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mb-4",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            htmlFor: "user-search",
                                                            className: "sr-only",
                                                            children: "Search users"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/page.tsx",
                                                            lineNumber: 171,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
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
                                                                loadingSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                loadingUsers && searchResults === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-500",
                                                    children: "Loading users…"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/community/page.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 23
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "space-y-4",
                                                    children: [
                                                        (searchResults !== null ? searchResults : users).map((u)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                className: "p-0",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                                    href: `/community/profile/${u.id}`,
                                                                    className: "flex items-center space-x-4 p-3 bg-white border rounded hover:bg-green-50 transition-colors",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                            src: u.profile_image_url || '/default-avatar.png',
                                                                            alt: u.full_name || u.username,
                                                                            className: "h-10 w-10 rounded-full object-cover"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/community/page.tsx",
                                                                            lineNumber: 192,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "font-medium text-gray-800",
                                                                                    children: u.full_name || u.username
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/community/page.tsx",
                                                                                    lineNumber: 194,
                                                                                    columnNumber: 33
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                        searchResults !== null && searchResults.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
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
                                        activeTab === 'impact' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: loadingImpact ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm text-gray-500",
                                                children: "Loading metrics…"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/page.tsx",
                                                lineNumber: 212,
                                                columnNumber: 23
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 bg-white rounded shadow text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-semibold",
                                                                children: impact.active_members
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 216,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-4 bg-white rounded shadow text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-2xl font-semibold",
                                                                children: impact.posts_today
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/page.tsx",
                                                                lineNumber: 220,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "col-span-1 md:col-span-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "md:sticky md:top-20 space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-2xl shadow-md p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "font-semibold text-gray-800",
                                            children: "Quick links"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/page.tsx",
                                            lineNumber: 235,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "text-sm text-gray-600 mt-2 space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Chatbot$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
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
}),
];

//# sourceMappingURL=_f2e862a5._.js.map