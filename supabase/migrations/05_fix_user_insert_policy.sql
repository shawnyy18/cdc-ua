-- =====================================================
-- FIX USER INSERT POLICY FOR REGISTRATION
-- Allow new users to be inserted during registration
-- =====================================================

-- Drop existing policies to recreate them properly
DROP POLICY IF EXISTS admins_can_manage_users ON public.users;
DROP POLICY IF EXISTS users_can_read_own_profile ON public.users;
DROP POLICY IF EXISTS users_can_update_own_profile ON public.users;
DROP POLICY IF EXISTS users_can_insert_own_profile ON public.users;
DROP POLICY IF EXISTS public_profiles_are_viewable ON public.users;

-- 1. Allow users to insert their own profile during registration
CREATE POLICY users_can_insert_own_profile
  ON public.users
  FOR INSERT
  WITH CHECK (id = auth.uid());

-- 2. Allow users to read their own profile
CREATE POLICY users_can_read_own_profile
  ON public.users
  FOR SELECT
  USING (id = auth.uid());

-- 3. Allow everyone to view public profiles (for leaderboard, community, etc.)
CREATE POLICY public_profiles_are_viewable
  ON public.users
  FOR SELECT
  USING (is_public = true);

-- 4. Allow users to update their own profile
CREATE POLICY users_can_update_own_profile
  ON public.users
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- Note: Admin functionality is handled separately via service role key
-- This avoids infinite recursion that would occur if we checked is_admin in RLS policies

COMMENT ON POLICY users_can_insert_own_profile ON public.users IS 'Allow users to insert their own profile during registration';
COMMENT ON POLICY users_can_read_own_profile ON public.users IS 'Allow users to read their own profile';
COMMENT ON POLICY public_profiles_are_viewable ON public.users IS 'Allow everyone to view public profiles';
COMMENT ON POLICY users_can_update_own_profile ON public.users IS 'Allow users to update their own profile';
