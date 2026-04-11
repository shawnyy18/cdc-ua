-- Migration: 13_toggle_follow.sql
-- Creates RPC to toggle a follow relationship for the current authenticated user.

CREATE OR REPLACE FUNCTION public.toggle_follow(user_id_to_toggle UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  current_user UUID := auth.uid();
  already_exists BOOLEAN;
BEGIN
  IF current_user IS NULL THEN
    RAISE EXCEPTION 'authentication required';
  END IF;

  -- Prevent self-follow early (RLS also enforces this on INSERT)
  IF current_user = user_id_to_toggle THEN
    RETURN FALSE;
  END IF;

  SELECT EXISTS(
    SELECT 1 FROM public.follows f
    WHERE f.follower_id = current_user
      AND f.following_id = user_id_to_toggle
  ) INTO already_exists;

  IF already_exists THEN
    -- Unfollow: delete the existing row
    DELETE FROM public.follows
    WHERE follower_id = current_user
      AND following_id = user_id_to_toggle;
    RETURN FALSE;
  ELSE
    -- Follow: insert a row if not present. Use ON CONFLICT DO NOTHING to be
    -- resilient to races; then return whether a row exists after the insert.
    INSERT INTO public.follows (follower_id, following_id)
    VALUES (current_user, user_id_to_toggle)
    ON CONFLICT DO NOTHING;

    RETURN EXISTS(
      SELECT 1 FROM public.follows f2
      WHERE f2.follower_id = current_user
        AND f2.following_id = user_id_to_toggle
    );
  END IF;
END;
$$;

GRANT EXECUTE ON FUNCTION public.toggle_follow(UUID) TO authenticated;

COMMENT ON FUNCTION public.toggle_follow(UUID) IS 'Toggle following for the current user. Returns true if now following, false if unfollowed or on self-follow.';
