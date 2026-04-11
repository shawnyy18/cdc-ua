-- Migration: 31_get_following_list.sql
-- Creates RPC to return the list of users followed by a given profile_user_id

-- Drop existing function first (required when changing return type)
DROP FUNCTION IF EXISTS public.get_following_list(UUID);

CREATE OR REPLACE FUNCTION public.get_following_list(profile_user_id UUID)
RETURNS TABLE (
  id UUID,
  username TEXT,
  full_name TEXT,
  avatar_url TEXT,
  is_following BOOLEAN
)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT
    u.id,
    u.username,
    u.full_name,
    u.profile_image_url AS avatar_url,
    EXISTS (
      SELECT 1 FROM public.follows f2 
      WHERE f2.follower_id = auth.uid() 
        AND f2.following_id = u.id
    ) AS is_following
  FROM public.follows f
  JOIN public.users u ON u.id = f.following_id
  WHERE f.follower_id = profile_user_id
    AND u.is_active = true
  ORDER BY u.username ASC;
$$;

GRANT EXECUTE ON FUNCTION public.get_following_list(UUID) TO authenticated;

COMMENT ON FUNCTION public.get_following_list(UUID) IS 'Returns the list of users followed by the given profile_user_id with full_name and is_following status.';
