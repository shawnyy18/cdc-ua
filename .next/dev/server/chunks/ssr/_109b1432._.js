module.exports = [
"[project]/components/FollowList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FollowList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
"use client";
;
;
function FollowList({ items, listType, onToggleFollow }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-3 max-h-72 overflow-auto",
        children: items.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-gray-500",
            children: [
                "No ",
                listType === 'followers' ? 'followers' : 'following',
                " found"
            ]
        }, void 0, true, {
            fileName: "[project]/components/FollowList.tsx",
            lineNumber: 24,
            columnNumber: 9
        }, this) : items.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: `/community/profile/${f.id}`,
                        className: "flex items-center gap-3 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0",
                                children: f.profile_image_url ? // eslint-disable-next-line @next/next/no-img-element
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: f.profile_image_url,
                                    alt: f.full_name || f.username,
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/components/FollowList.tsx",
                                    lineNumber: 32,
                                    columnNumber: 19
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "ri-user-line text-gray-400 flex items-center justify-center w-full h-full"
                                }, void 0, false, {
                                    fileName: "[project]/components/FollowList.tsx",
                                    lineNumber: 34,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/FollowList.tsx",
                                lineNumber: 29,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-medium text-gray-800",
                                        children: f.full_name || f.username
                                    }, void 0, false, {
                                        fileName: "[project]/components/FollowList.tsx",
                                        lineNumber: 38,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs text-gray-400",
                                        children: [
                                            "@",
                                            f.username
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/FollowList.tsx",
                                        lineNumber: 39,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/FollowList.tsx",
                                lineNumber: 37,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/FollowList.tsx",
                        lineNumber: 28,
                        columnNumber: 13
                    }, this),
                    typeof onToggleFollow === 'function' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onToggleFollow(f.id, !!f.is_following),
                            className: `px-3 py-1 rounded-md text-sm ${f.is_following ? 'bg-gray-200' : 'bg-green-500 text-white'}`,
                            children: f.is_following ? 'Following' : 'Follow'
                        }, void 0, false, {
                            fileName: "[project]/components/FollowList.tsx",
                            lineNumber: 45,
                            columnNumber: 17
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/FollowList.tsx",
                        lineNumber: 44,
                        columnNumber: 15
                    }, this)
                ]
            }, f.id, true, {
                fileName: "[project]/components/FollowList.tsx",
                lineNumber: 27,
                columnNumber: 11
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/FollowList.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/community/profile/[id]/UserProfileClient.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>UserProfileClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FollowList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/FollowList.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function UserProfileClient({ id }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profileUser, setProfileUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [userPosts, setUserPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [userDonations, setUserDonations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isFollowing, setIsFollowing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFollowLoading, setIsFollowLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const makeAuthenticatedRequest = async (url, options = {})=>{
        const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time truthy", 1) throw new Error("No authentication token");
        const res = await fetch(url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                ...options.headers || {}
            }
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
    };
    // Social UI states
    const [likedPosts, setLikedPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [loadingLikes, setLoadingLikes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentsOpen, setCommentsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentsByPost, setCommentsByPost] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [commentInputs, setCommentInputs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [loadingComments, setLoadingComments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    // Followers / Following lists
    const [followersList, setFollowersList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [followingList, setFollowingList] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showFollowers, setShowFollowers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showFollowing, setShowFollowing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [listLoading, setListLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const fetchLikedForPosts = async (posts)=>{
        try {
            const postIds = posts.map((p)=>p.id);
            if (postIds.length === 0) return;
            const res = await makeAuthenticatedRequest(`/api/supabase/functions/community-handler`, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'get-liked-posts',
                    postIds
                })
            });
            if (res?.success) {
                const likedSet = {};
                ;
                (res.liked || []).forEach((id)=>{
                    likedSet[id] = true;
                });
                setLikedPosts(likedSet);
            }
        } catch (err) {
            // ignore - likes will default to false
            console.error('[fetchLikedForPosts] Error:', err);
        }
    };
    const fetchUserProfile = async (userId)=>{
        setIsLoading(true);
        try {
            console.log('[UserProfile] Fetching profile for user:', userId);
            // Profile - using correct API route
            const profileData = await makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, {
                method: "POST",
                body: JSON.stringify({
                    action: "get-user-profile",
                    userId
                })
            });
            console.log('[UserProfile] Profile data:', profileData);
            if (profileData?.success && profileData?.profile) {
                setProfileUser(profileData.profile);
                setIsFollowing(profileData.profile.is_following || false);
            } else {
                console.error('[UserProfile] No profile data returned');
                setProfileUser(null);
            }
            // Posts - using correct API route
            const postsData = await makeAuthenticatedRequest(`/api/supabase/functions/community-handler`, {
                method: "POST",
                body: JSON.stringify({
                    action: "get-user-posts",
                    userId
                })
            });
            const posts = postsData?.posts || [];
            setUserPosts(posts);
            // Initialize liked flags for posts (best-effort)
            await fetchLikedForPosts(posts);
            // Donations - using correct API route
            const donationsData = await makeAuthenticatedRequest(`/api/supabase/functions/donation-handler`, {
                method: "POST",
                body: JSON.stringify({
                    action: "get-user-donations",
                    userId
                })
            });
            setUserDonations(donationsData?.donations || []);
        } catch (err) {
            console.error("[UserProfile] Failed to load profile page data", err);
            setProfileUser(null);
        } finally{
            setIsLoading(false);
        }
    };
    const handleDeletePost = async (postId)=>{
        if (!postId) return;
        if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;
        const prev = userPosts.map((p)=>({
                ...p
            }));
        // optimistic remove
        setUserPosts((prevPosts)=>prevPosts.filter((p)=>p.id !== postId));
        try {
            const data = await makeAuthenticatedRequest(`/api/supabase/functions/community-handler`, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'delete-post',
                    postId
                })
            });
            if (!data || !data.success) {
                // revert
                setUserPosts(prev);
                alert(data?.error || 'Failed to delete post');
                return;
            }
        // success - postsCache is invalidated server-side; nothing more needed
        } catch (err) {
            console.error('[handleDeletePost] Error deleting post:', err);
            setUserPosts(prev);
            alert('Failed to delete post. Please try again.');
        }
    };
    const handleFollowToggle = async ()=>{
        if (!profileUser?.id || isFollowLoading) return;
        // Prevent following yourself
        if (user?.id === profileUser?.id) {
            console.warn('[handleFollowToggle] Cannot follow yourself');
            return;
        }
        setIsFollowLoading(true);
        try {
            const action = isFollowing ? 'unfollow-user' : 'follow-user';
            const data = await makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, {
                method: "POST",
                body: JSON.stringify({
                    action,
                    targetUserId: profileUser.id
                })
            });
            if (data?.success) {
                setIsFollowing(!isFollowing);
                // Update follower count optimistically
                setProfileUser((prev)=>prev ? {
                        ...prev,
                        followers_count: (prev.followers_count || 0) + (isFollowing ? -1 : 1)
                    } : prev);
            }
        } catch (error) {
            console.error('[handleFollowToggle] Error:', error);
        } finally{
            setIsFollowLoading(false);
        }
    };
    // Like / Comment helpers
    const handleToggleLike = async (postId)=>{
        if (!postId) return;
        // optimistic
        setLoadingLikes((prev)=>({
                ...prev,
                [postId]: true
            }));
        const currentlyLiked = !!likedPosts[postId];
        setLikedPosts((prev)=>({
                ...prev,
                [postId]: !currentlyLiked
            }));
        setUserPosts((prev)=>prev.map((p)=>p.id === postId ? {
                    ...p,
                    likes_count: (p.likes_count || 0) + (currentlyLiked ? -1 : 1)
                } : p));
        try {
            const res = await makeAuthenticatedRequest(`/api/supabase/functions/community-handler`, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'like-post',
                    postId
                })
            });
            if (res?.success) {
                // reconcile authoritative likes_count and liked flag
                setUserPosts((prev)=>prev.map((p)=>p.id === postId ? {
                            ...p,
                            likes_count: res.likes_count ?? p.likes_count
                        } : p));
                setLikedPosts((prev)=>({
                        ...prev,
                        [postId]: !!res.liked
                    }));
            }
        } catch (err) {
            console.error('[handleToggleLike] Error:', err);
            // revert optimistic
            setLikedPosts((prev)=>({
                    ...prev,
                    [postId]: currentlyLiked
                }));
            setUserPosts((prev)=>prev.map((p)=>p.id === postId ? {
                        ...p,
                        likes_count: (p.likes_count || 0) + (currentlyLiked ? 1 : -1)
                    } : p));
        } finally{
            setLoadingLikes((prev)=>({
                    ...prev,
                    [postId]: false
                }));
        }
    };
    const fetchCommentsForPost = async (postId)=>{
        setLoadingComments((prev)=>({
                ...prev,
                [postId]: true
            }));
        try {
            const res = await makeAuthenticatedRequest(`/api/supabase/functions/community-handler`, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'get-post-comments',
                    postId
                })
            });
            if (res?.success) {
                setCommentsByPost((prev)=>({
                        ...prev,
                        [postId]: res.comments || []
                    }));
            }
        } catch (err) {
            console.error('[fetchCommentsForPost] Error:', err);
        } finally{
            setLoadingComments((prev)=>({
                    ...prev,
                    [postId]: false
                }));
        }
    };
    const toggleComments = async (postId)=>{
        setCommentsOpen((prev)=>({
                ...prev,
                [postId]: !prev[postId]
            }));
        if (!commentsByPost[postId]) {
            await fetchCommentsForPost(postId);
        }
    };
    const submitCommentForPost = async (postId)=>{
        const content = (commentInputs[postId] || '').trim();
        if (!content) return;
        try {
            const res = await makeAuthenticatedRequest(`/api/supabase/functions/community-handler`, {
                method: 'POST',
                body: JSON.stringify({
                    action: 'create-comment',
                    postId,
                    content
                })
            });
            if (res?.success) {
                // append new comment optimistically
                const newComment = res.comment;
                setCommentsByPost((prev)=>({
                        ...prev,
                        [postId]: [
                            ...prev[postId] || [],
                            newComment
                        ]
                    }));
                setCommentInputs((prev)=>({
                        ...prev,
                        [postId]: ''
                    }));
                // update comments_count on post
                setUserPosts((prev)=>prev.map((p)=>p.id === postId ? {
                            ...p,
                            comments_count: res.comments_count ?? (p.comments_count || 0) + 1
                        } : p));
            }
        } catch (err) {
            console.error('[submitCommentForPost] Error:', err);
            alert('Failed to post comment');
        }
    };
    // Followers / Following lists
    const fetchFollowers = async ()=>{
        if (!profileUser?.id) return;
        setListLoading(true);
        setShowFollowers(true); // Show modal immediately with loading state
        try {
            // Try RPC first
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('get_followers_list', {
                profile_user_id: profileUser.id
            });
            if (error) {
                console.log('[fetchFollowers] RPC error, trying API fallback:', error.message);
                // Fallback to API
                const res = await makeAuthenticatedRequest('/api/supabase/functions/user-profile', {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'get-followers',
                        userId: profileUser.id
                    })
                });
                if (res?.success && Array.isArray(res.followers)) {
                    setFollowersList(res.followers.map((r)=>({
                            id: r.id,
                            username: r.username || '',
                            full_name: r.full_name || r.username || '',
                            profile_image_url: r.profile_image_url || r.avatar_url || null,
                            is_following: !!r.is_following
                        })));
                } else {
                    console.error('[fetchFollowers] API fallback also failed');
                    setFollowersList([]);
                }
            } else {
                // RPC succeeded - map returned rows
                const mapped = (data || []).map((r)=>({
                        id: r.id,
                        username: r.username || '',
                        full_name: r.full_name || r.username || '',
                        profile_image_url: r.avatar_url || r.profile_image_url || null,
                        is_following: !!r.is_following
                    }));
                setFollowersList(mapped);
            }
        } catch (err) {
            console.error('[fetchFollowers] Error:', err);
            setFollowersList([]);
        } finally{
            setListLoading(false);
        }
    };
    const fetchFollowing = async ()=>{
        if (!profileUser?.id) return;
        setListLoading(true);
        setShowFollowing(true); // Show modal immediately with loading state
        try {
            // Try RPC first
            const { data, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].rpc('get_following_list', {
                profile_user_id: profileUser.id
            });
            if (error) {
                console.log('[fetchFollowing] RPC error, trying API fallback:', error.message);
                // Fallback to API
                const res = await makeAuthenticatedRequest('/api/supabase/functions/user-profile', {
                    method: 'POST',
                    body: JSON.stringify({
                        action: 'get-following',
                        userId: profileUser.id
                    })
                });
                if (res?.success && Array.isArray(res.following)) {
                    setFollowingList(res.following.map((r)=>({
                            id: r.id,
                            username: r.username || '',
                            full_name: r.full_name || r.username || '',
                            profile_image_url: r.profile_image_url || r.avatar_url || null,
                            is_following: !!r.is_following
                        })));
                } else {
                    console.error('[fetchFollowing] API fallback also failed');
                    setFollowingList([]);
                }
            } else {
                // RPC succeeded - map returned rows
                const mapped = (data || []).map((r)=>({
                        id: r.id,
                        username: r.username || '',
                        full_name: r.full_name || r.username || '',
                        profile_image_url: r.avatar_url || r.profile_image_url || null,
                        is_following: !!r.is_following
                    }));
                setFollowingList(mapped);
            }
        } catch (err) {
            console.error('[fetchFollowing] Error:', err);
            setFollowingList([]);
        } finally{
            setListLoading(false);
        }
    };
    // Modal keyboard/interaction improvements: close on Escape and autofocus first link
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const onKey = (e)=>{
            if (e.key === 'Escape') {
                if (showFollowers) setShowFollowers(false);
                if (showFollowing) setShowFollowing(false);
            }
        };
        if (showFollowers || showFollowing) {
            document.addEventListener('keydown', onKey);
            // autofocus first link in modal after a tick
            setTimeout(()=>{
                const modal = document.querySelector('.follow-modal');
                if (modal) {
                    const firstLink = modal.querySelector('a');
                    if (firstLink) firstLink.focus();
                }
            }, 0);
        }
        return ()=>document.removeEventListener('keydown', onKey);
    }, [
        showFollowers,
        showFollowing
    ]);
    const handleListFollowToggle = async (targetId, currentlyFollowing, listType)=>{
        try {
            const action = currentlyFollowing ? 'unfollow-user' : 'follow-user';
            const res = await makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, {
                method: 'POST',
                body: JSON.stringify({
                    action,
                    targetUserId: targetId
                })
            });
            if (res?.success) {
                // update the specific list to reflect new follow state
                if (listType === 'followers') {
                    setFollowersList((prev)=>prev.map((u)=>u.id === targetId ? {
                                ...u,
                                is_following: !currentlyFollowing
                            } : u));
                } else {
                    setFollowingList((prev)=>prev.map((u)=>u.id === targetId ? {
                                ...u,
                                is_following: !currentlyFollowing
                            } : u));
                }
            }
        } catch (err) {
            console.error('[handleListFollowToggle] Error:', err);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Basic auth gate from localStorage
        const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        const userData = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time truthy", 1) {
            router.push("/login");
            return;
        }
        //TURBOPACK unreachable
        ;
    }, [
        id,
        router
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-gray-500",
                children: "Loading profile…"
            }, void 0, false, {
                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                lineNumber: 459,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
            lineNumber: 458,
            columnNumber: 7
        }, this);
    }
    if (!profileUser) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "ri-user-line text-gray-400 text-2xl"
                            }, void 0, false, {
                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                lineNumber: 469,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 468,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-gray-800 mb-2",
                            children: "Profile not found"
                        }, void 0, false, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 471,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600 mb-6",
                            children: "This user may be private or does not exist."
                        }, void 0, false, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 472,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            href: "/community",
                            className: "inline-flex items-center gap-2 text-green-600 hover:text-green-700",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "ri-arrow-left-line"
                                }, void 0, false, {
                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                    lineNumber: 474,
                                    columnNumber: 13
                                }, this),
                                "Back to Community"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 473,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                    lineNumber: 467,
                    columnNumber: 9
                }, this),
                showFollowers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/40 cursor-pointer hover:bg-black/50 transition-colors",
                            onClick: ()=>setShowFollowers(false)
                        }, void 0, false, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 481,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            role: "dialog",
                            "aria-modal": "true",
                            tabIndex: -1,
                            className: "follow-modal relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 focus:outline-none animate-in fade-in zoom-in-95 duration-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-gray-900",
                                            children: "Followers"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 492,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowFollowers(false),
                                            className: "p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700",
                                            "aria-label": "Close",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "ri-close-line text-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 498,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 493,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                    lineNumber: 491,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 max-h-80 overflow-auto",
                                    children: listLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center py-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 504,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 text-gray-500",
                                                children: "Loading…"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 505,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 503,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FollowList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        items: followersList,
                                        listType: "followers",
                                        onToggleFollow: (targetId, currentlyFollowing)=>handleListFollowToggle(targetId, currentlyFollowing, 'followers')
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 508,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                    lineNumber: 501,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 485,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                    lineNumber: 480,
                    columnNumber: 11
                }, this),
                showFollowing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/40 cursor-pointer hover:bg-black/50 transition-colors",
                            onClick: ()=>setShowFollowing(false)
                        }, void 0, false, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 522,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            role: "dialog",
                            "aria-modal": "true",
                            tabIndex: -1,
                            className: "follow-modal relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 focus:outline-none animate-in fade-in zoom-in-95 duration-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-gray-900",
                                            children: "Following"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 533,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowFollowing(false),
                                            className: "p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700",
                                            "aria-label": "Close",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "ri-close-line text-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 539,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 534,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                    lineNumber: 532,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 max-h-80 overflow-auto",
                                    children: listLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center py-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 545,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 text-gray-500",
                                                children: "Loading…"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 546,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 544,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FollowList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        items: followingList,
                                        listType: "following",
                                        onToggleFollow: (targetId, currentlyFollowing)=>handleListFollowToggle(targetId, currentlyFollowing, 'following')
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 549,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                    lineNumber: 542,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 526,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                    lineNumber: 521,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
            lineNumber: 466,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gradient-to-br from-green-50 to-emerald-50",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-6 py-8 max-w-6xl",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        href: "/community",
                        className: "flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors cursor-pointer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "ri-arrow-left-line"
                            }, void 0, false, {
                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                lineNumber: 571,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Back to Community"
                            }, void 0, false, {
                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                lineNumber: 572,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                        lineNumber: 567,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                    lineNumber: 566,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-2xl overflow-hidden flex-shrink-0",
                                children: profileUser?.profile_image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: profileUser.profile_image_url,
                                    alt: profileUser.full_name || profileUser.username || 'Profile',
                                    className: "w-full h-full object-cover"
                                }, void 0, false, {
                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                    lineNumber: 580,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                    className: "ri-user-line text-white"
                                }, void 0, false, {
                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                    lineNumber: 586,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                lineNumber: 578,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-start justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        className: "text-2xl font-bold text-gray-800",
                                                        children: profileUser?.full_name || profileUser?.username
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 592,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-600",
                                                        children: [
                                                            "@",
                                                            profileUser?.username
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 595,
                                                        columnNumber: 19
                                                    }, this),
                                                    profileUser?.is_seller && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "mt-2 inline-block bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-medium",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "ri-store-line mr-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                lineNumber: 598,
                                                                columnNumber: 23
                                                            }, this),
                                                            "Verified Seller"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 597,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 591,
                                                columnNumber: 17
                                            }, this),
                                            user?.id !== profileUser?.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: `px-6 py-2 rounded-lg font-medium transition-colors cursor-pointer ${isFollowing ? 'bg-gray-200 hover:bg-gray-300 text-gray-700' : 'bg-green-500 hover:bg-green-600 text-white'} ${isFollowLoading ? 'opacity-50 cursor-not-allowed' : ''}`,
                                                onClick: handleFollowToggle,
                                                disabled: isFollowLoading,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: `${isFollowing ? 'ri-user-unfollow-line' : 'ri-user-add-line'} mr-2`
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 614,
                                                        columnNumber: 21
                                                    }, this),
                                                    isFollowLoading ? 'Loading...' : isFollowing ? 'Following' : 'Follow'
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 605,
                                                columnNumber: 19
                                            }, this),
                                            user?.id === profileUser?.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        className: "ri-user-line mr-2"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 621,
                                                        columnNumber: 21
                                                    }, this),
                                                    "This is you"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 620,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 590,
                                        columnNumber: 15
                                    }, this),
                                    profileUser?.bio && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-gray-700",
                                        children: profileUser.bio
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 627,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-6 mt-4 text-sm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: fetchFollowers,
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-gray-800",
                                                        children: profileUser?.followers_count || 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 633,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600",
                                                        children: "Followers"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 634,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 632,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: fetchFollowing,
                                                className: "flex items-center gap-2",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-gray-800",
                                                        children: profileUser?.following_count || 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 637,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-gray-600",
                                                        children: "Following"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 638,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 636,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 631,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 md:grid-cols-4 gap-4 mt-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gray-50 rounded-xl p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500",
                                                        children: "Eco Points"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 644,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-gray-800",
                                                        children: profileUser?.eco_points ?? 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 645,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 643,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gray-50 rounded-xl p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500",
                                                        children: "Total Donations"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 648,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-gray-800",
                                                        children: profileUser?.total_donations ?? 0
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 649,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 647,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gray-50 rounded-xl p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500",
                                                        children: "CO₂ Saved"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 652,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-gray-800",
                                                        children: [
                                                            profileUser?.co2_saved ?? 0,
                                                            " kg"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 653,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 651,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gray-50 rounded-xl p-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm text-gray-500",
                                                        children: "Member Since"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 656,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-xl font-bold text-gray-800",
                                                        children: profileUser?.created_at ? new Date(profileUser.created_at).toLocaleDateString() : "-"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 657,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 655,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 642,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                lineNumber: 589,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                        lineNumber: 577,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                    lineNumber: 576,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-3 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-2",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 border-b border-gray-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold text-gray-800",
                                            children: "Posts"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 670,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 669,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-6",
                                            children: userPosts.length > 0 ? userPosts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border border-gray-200 rounded-xl p-6",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center justify-between mb-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-gray-500 text-sm",
                                                                    children: new Date(post.created_at).toLocaleString()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                    lineNumber: 678,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-4 text-gray-500",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>handleToggleLike(post.id),
                                                                            disabled: !!loadingLikes[post.id],
                                                                            className: "flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                    className: `${likedPosts[post.id] ? 'ri-heart-fill text-red-500' : 'ri-heart-line'}`
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                                    lineNumber: 687,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: post.likes_count ?? 0
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                                    lineNumber: 688,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                            lineNumber: 682,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>toggleComments(post.id),
                                                                            className: "flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                    className: "ri-chat-3-line"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                                    lineNumber: 694,
                                                                                    columnNumber: 31
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                    children: post.comments_count ?? 0
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                                    lineNumber: 695,
                                                                                    columnNumber: 31
                                                                                }, this)
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                            lineNumber: 690,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                    lineNumber: 681,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                            lineNumber: 677,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-700",
                                                            children: post.content
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                            lineNumber: 699,
                                                            columnNumber: 25
                                                        }, this),
                                                        commentsOpen[post.id] && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 border-t pt-4",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "space-y-3 max-h-64 overflow-auto pr-2",
                                                                    children: (commentsByPost[post.id] || []).length > 0 ? (commentsByPost[post.id] || []).map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                            className: "flex items-start gap-3",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "w-8 h-8 rounded-full bg-gray-100 overflow-hidden",
                                                                                    children: c.user_profile_image ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                                        src: c.user_profile_image,
                                                                                        alt: c.user_full_name,
                                                                                        className: "w-full h-full object-cover"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                                        lineNumber: 710,
                                                                                        columnNumber: 41
                                                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                                        className: "ri-user-line text-gray-400"
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                                        lineNumber: 712,
                                                                                        columnNumber: 41
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                                    lineNumber: 708,
                                                                                    columnNumber: 37
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-sm font-medium text-gray-800",
                                                                                            children: c.user_full_name || c.user_id
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                                            lineNumber: 716,
                                                                                            columnNumber: 39
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-sm text-gray-700",
                                                                                            children: c.content
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                                            lineNumber: 717,
                                                                                            columnNumber: 39
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "text-xs text-gray-400",
                                                                                            children: new Date(c.created_at).toLocaleString()
                                                                                        }, void 0, false, {
                                                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                                            lineNumber: 718,
                                                                                            columnNumber: 39
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                                    lineNumber: 715,
                                                                                    columnNumber: 37
                                                                                }, this)
                                                                            ]
                                                                        }, c.id, true, {
                                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                            lineNumber: 707,
                                                                            columnNumber: 35
                                                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "text-gray-500",
                                                                        children: "No comments yet"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                        lineNumber: 723,
                                                                        columnNumber: 33
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                    lineNumber: 704,
                                                                    columnNumber: 29
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "mt-4 flex gap-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                            value: commentInputs[post.id] || '',
                                                                            onChange: (e)=>setCommentInputs((prev)=>({
                                                                                        ...prev,
                                                                                        [post.id]: e.target.value
                                                                                    })),
                                                                            className: "flex-1 rounded-lg border px-3 py-2",
                                                                            placeholder: "Write a comment..."
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                            lineNumber: 728,
                                                                            columnNumber: 31
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>submitCommentForPost(post.id),
                                                                            className: "bg-green-500 text-white px-4 py-2 rounded-lg",
                                                                            children: "Comment"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                            lineNumber: 734,
                                                                            columnNumber: 31
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                    lineNumber: 727,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                            lineNumber: 703,
                                                            columnNumber: 27
                                                        }, this),
                                                        user?.id === profileUser?.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "mt-4 text-right",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>handleDeletePost(post.id),
                                                                className: "text-sm text-red-600 hover:underline",
                                                                children: "Delete Post"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                lineNumber: 746,
                                                                columnNumber: 29
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                            lineNumber: 745,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, post.id, true, {
                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                    lineNumber: 676,
                                                    columnNumber: 23
                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center py-12 text-gray-500",
                                                children: "No posts yet"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 757,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 673,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 672,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                lineNumber: 668,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 667,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-1",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6 border-b border-gray-100",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-lg font-semibold text-gray-800",
                                            children: "Recent Donations"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 767,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 766,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-6",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-4",
                                            children: userDonations.length > 0 ? userDonations.map((donation)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "border border-gray-200 rounded-xl p-4",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center justify-between",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-medium text-gray-800",
                                                                        children: donation.device_type || "Device"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                        lineNumber: 776,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-500",
                                                                        children: [
                                                                            donation.brand,
                                                                            " ",
                                                                            donation.model
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                        lineNumber: 779,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    donation.status && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: `text-xs px-2 py-1 rounded-full mt-1 inline-block ${donation.status === 'accepted' || donation.status === 'approved' ? 'bg-green-100 text-green-600' : donation.status === 'pending' ? 'bg-orange-100 text-orange-600' : donation.status === 'rejected' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`,
                                                                        children: donation.status
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                        lineNumber: 783,
                                                                        columnNumber: 31
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                lineNumber: 775,
                                                                columnNumber: 27
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-right",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-green-600 font-medium",
                                                                        children: [
                                                                            "+",
                                                                            donation.eco_points_earned ?? 0,
                                                                            " pts"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                        lineNumber: 797,
                                                                        columnNumber: 29
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "text-sm text-gray-500",
                                                                        children: new Date(donation.created_at).toLocaleDateString()
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                        lineNumber: 800,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                                lineNumber: 796,
                                                                columnNumber: 27
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                        lineNumber: 774,
                                                        columnNumber: 25
                                                    }, this)
                                                }, donation.id, false, {
                                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                    lineNumber: 773,
                                                    columnNumber: 23
                                                }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-center py-8 text-gray-500",
                                                children: "No donations yet"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 808,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 770,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 769,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                lineNumber: 765,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 764,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                    lineNumber: 666,
                    columnNumber: 9
                }, this),
                showFollowers && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/40 cursor-pointer hover:bg-black/50 transition-colors",
                            onClick: ()=>setShowFollowers(false)
                        }, void 0, false, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 818,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-gray-900",
                                            children: "Followers"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 824,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowFollowers(false),
                                            className: "p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700",
                                            "aria-label": "Close",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "ri-close-line text-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 830,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 825,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                    lineNumber: 823,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 max-h-80 overflow-auto",
                                    children: listLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center py-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 836,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 text-gray-500",
                                                children: "Loading…"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 837,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 835,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FollowList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        items: followersList,
                                        listType: "followers",
                                        onToggleFollow: (targetId, currentlyFollowing)=>handleListFollowToggle(targetId, currentlyFollowing, 'followers')
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 840,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                    lineNumber: 833,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 822,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                    lineNumber: 817,
                    columnNumber: 11
                }, this),
                showFollowing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 z-50 flex items-center justify-center p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 bg-black/40 cursor-pointer hover:bg-black/50 transition-colors",
                            onClick: ()=>setShowFollowing(false)
                        }, void 0, false, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 854,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-in fade-in zoom-in-95 duration-200",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between mb-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold text-gray-900",
                                            children: "Following"
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 860,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setShowFollowing(false),
                                            className: "p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700",
                                            "aria-label": "Close",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "ri-close-line text-xl"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 866,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                            lineNumber: 861,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                    lineNumber: 859,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-3 max-h-80 overflow-auto",
                                    children: listLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-center py-8",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 872,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 text-gray-500",
                                                children: "Loading…"
                                            }, void 0, false, {
                                                fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                                lineNumber: 873,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 871,
                                        columnNumber: 19
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$FollowList$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        items: followingList,
                                        listType: "following",
                                        onToggleFollow: (targetId, currentlyFollowing)=>handleListFollowToggle(targetId, currentlyFollowing, 'following')
                                    }, void 0, false, {
                                        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                        lineNumber: 876,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                                    lineNumber: 869,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                            lineNumber: 858,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
                    lineNumber: 853,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
            lineNumber: 565,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/community/profile/[id]/UserProfileClient.tsx",
        lineNumber: 564,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_109b1432._.js.map