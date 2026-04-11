-- Migration: 10_get_posts_with_like_details.sql
-- Creates an RPC that returns posts with author info, total likes, and whether
-- the current requester (auth.uid()) has liked each post.

CREATE OR REPLACE FUNCTION public.get_posts_with_like_details()
RETURNS TABLE (
  id UUID,
  content TEXT,
  created_at TIMESTAMPTZ,
  author_id UUID,
  author_username TEXT,
  author_profile_image TEXT,
  likes_count BIGINT,
  comments_count INTEGER,
  user_has_liked BOOLEAN
)
LANGUAGE sql STABLE
AS $$
  SELECT
    p.id,
    p.content,
    p.created_at,
    p.user_id AS author_id,
    u.username AS author_username,
    u.profile_image_url AS author_profile_image,
    (
      SELECT COUNT(*)::BIGINT
      FROM public.post_likes pl
      WHERE pl.post_id = p.id
    ) AS likes_count,
    (
      SELECT COUNT(*)::INTEGER
      FROM public.post_comments pc
      WHERE pc.post_id = p.id AND pc.is_active = true
    ) AS comments_count,
    (
      -- auth.uid() returns NULL for anonymous requests; EXISTS will be false
      EXISTS(
        SELECT 1 FROM public.post_likes pl2
        WHERE pl2.post_id = p.id AND pl2.user_id = auth.uid()
      )
    ) AS user_has_liked
  FROM public.community_posts p
  -- join follows so we can return posts from people the current user follows
  LEFT JOIN public.follows f ON f.following_id = p.user_id
  LEFT JOIN public.users u ON u.id = p.user_id
  -- only include posts that are active and either:
  --  - authored by someone the current user follows (f.follower_id = auth.uid())
  --  - or authored by the current user themselves (p.user_id = auth.uid())
  WHERE p.is_active = true
    AND (
      -- Behaviour:
      --  - If the requester is authenticated (auth.uid() IS NOT NULL):
      --      return posts authored by the requester OR authors the requester follows.
      --  - If the requester is unauthenticated (auth.uid() IS NULL):
      --      return posts authored by public profiles.
      (
        (auth.uid() IS NOT NULL AND (
          p.user_id = auth.uid()
          OR EXISTS (
            SELECT 1 FROM public.follows f2
            WHERE f2.follower_id = auth.uid()
              AND f2.following_id = p.user_id
          )
        ))
        OR (auth.uid() IS NULL AND u.is_public = true)
      )
    )
  ORDER BY p.created_at DESC;
$$;

-- Allow authenticated users to call this RPC. Optionally grant to "anon" if you
-- want unauthenticated clients to be able to call this function as well.
GRANT EXECUTE ON FUNCTION public.get_posts_with_like_details() TO authenticated;
-- GRANT EXECUTE ON FUNCTION public.get_posts_with_like_details() TO anon;

COMMENT ON FUNCTION public.get_posts_with_like_details() IS 'Returns community posts with author info, total likes and whether the current user has liked each post.';
