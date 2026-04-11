-- Create an RPC to toggle a like for the current authenticated user
-- Usage: SELECT toggle_like('<post-uuid>');

CREATE OR REPLACE FUNCTION public.toggle_like(post_id_to_toggle UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY INVOKER
AS $$
DECLARE
  uid UUID;
  did_insert BOOLEAN := false;
BEGIN
  -- Get current authenticated user id
  uid := auth.uid();
  IF uid IS NULL THEN
    RAISE EXCEPTION 'auth.uid() is null - user must be authenticated';
  END IF;

  -- If like exists, remove it and return FALSE (now unliked)
  IF EXISTS (SELECT 1 FROM post_likes WHERE post_id = post_id_to_toggle AND user_id = uid) THEN
    DELETE FROM post_likes WHERE post_id = post_id_to_toggle AND user_id = uid;
    RETURN FALSE;
  END IF;

  -- Otherwise try to insert. Use ON CONFLICT DO NOTHING to avoid race errors.
  INSERT INTO post_likes (post_id, user_id)
  VALUES (post_id_to_toggle, uid)
  ON CONFLICT (post_id, user_id) DO NOTHING;

  -- Return whether a like now exists for this user/post
  SELECT EXISTS(SELECT 1 FROM post_likes WHERE post_id = post_id_to_toggle AND user_id = uid) INTO did_insert;
  RETURN did_insert;
END;
$$;

-- Grant execute to the `authenticated` role so logged-in users can call this RPC from the client
GRANT EXECUTE ON FUNCTION public.toggle_like(UUID) TO authenticated;

-- If you want unauthenticated (anon) clients to call this RPC (not recommended),
-- uncomment the following line. Prefer requiring authenticated users for liking.
-- GRANT EXECUTE ON FUNCTION public.toggle_like(UUID) TO anon;
