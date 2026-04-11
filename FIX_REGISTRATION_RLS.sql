-- =====================================================
-- QUICK FIX: Run this in Supabase SQL Editor
-- =====================================================
-- This fixes the registration issue by adding INSERT policy
-- 
-- HOW TO USE:
-- 1. Go to your Supabase Dashboard
-- 2. Click on "SQL Editor" in the left sidebar
-- 3. Click "New Query"
-- 4. Copy and paste this entire file
-- 5. Click "Run" or press Cmd/Ctrl + Enter
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
-- Admin dashboard should use API routes with service role key instead of direct Supabase client

-- Verify the policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'users'
ORDER BY policyname;

-- Done! You should see 4 policies listed above:
-- 1. users_can_insert_own_profile
-- 2. users_can_read_own_profile  
-- 3. public_profiles_are_viewable
-- 4. users_can_update_own_profile
