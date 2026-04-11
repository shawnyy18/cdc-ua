-- Migration: 30_get_community_feed_fixed.sql
-- Creates RPC that returns the community feed for the authenticated user
-- Returns the user's own posts and posts from users they follow.

CREATE OR REPLACE FUNCTION public.get_community_feed_fixed()
RETURNS TABLE (
  id UUID,
  content TEXT,
  created_at TIMESTAMPTZ,
  author_id UUID,
  author_username TEXT,
  author_avatar_url TEXT,
  likes_count BIGINT,
  comments_count INTEGER
)
LANGUAGE sql STABLE
AS $$
  SELECT
    p.id,
    p.content,
    p.created_at,
    p.user_id AS author_id,
    u.username AS author_username,
    u.profile_image_url AS author_avatar_url,
    (
      SELECT COUNT(*)::BIGINT FROM public.post_likes pl WHERE pl.post_id = p.id
    ) AS likes_count,
    (
      SELECT COUNT(*)::INTEGER FROM public.post_comments pc WHERE pc.post_id = p.id AND pc.is_active = true
    ) AS comments_count
  FROM public.community_posts p
  LEFT JOIN public.users u ON u.id = p.user_id
  WHERE p.is_active = true
    AND (
      p.user_id = auth.uid()
      OR p.user_id IN (
        SELECT f.following_id FROM public.follows f WHERE f.follower_id = auth.uid()
      )
    )
  ORDER BY p.created_at DESC
  LIMIT 20;
$$;

-- Allow authenticated role to execute the function
GRANT EXECUTE ON FUNCTION public.get_community_feed_fixed() TO authenticated;

COMMENT ON FUNCTION public.get_community_feed_fixed() IS 'Returns feed: own posts and posts from users the current user follows. Joins users for author metadata and counts likes/comments.';
