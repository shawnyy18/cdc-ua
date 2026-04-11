-- Migration: 11_get_comments_for_post.sql
-- Creates an RPC to fetch comments for a given post along with the author's username

CREATE OR REPLACE FUNCTION public.get_comments_for_post(post_id_to_fetch UUID)
RETURNS TABLE (
  id UUID,
  content TEXT,
  created_at TIMESTAMPTZ,
  author_username TEXT
)
LANGUAGE sql STABLE
AS $$
  SELECT
    c.id,
    c.content,
    c.created_at,
    p.username AS author_username
  FROM public.post_comments c
  LEFT JOIN public.users p ON p.id = c.user_id
  WHERE c.post_id = post_id_to_fetch
    AND c.is_active = true
  ORDER BY c.created_at ASC;
$$;

-- Grant execute to authenticated role by default. Uncomment to allow anonymous reads.
GRANT EXECUTE ON FUNCTION public.get_comments_for_post(UUID) TO authenticated;
-- GRANT EXECUTE ON FUNCTION public.get_comments_for_post(UUID) TO anon;

COMMENT ON FUNCTION public.get_comments_for_post(UUID) IS 'Returns comments for a post with author username (ordered oldest first)';
