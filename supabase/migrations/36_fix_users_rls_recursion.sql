-- =====================================================
-- FIX: Infinite recursion in RLS policy for "users"
-- The old "admins_can_manage_users" policy queries users
-- from within a users policy, causing infinite recursion.
-- This migration drops ALL existing policies on users and
-- recreates clean, non-recursive ones.
-- =====================================================

-- 1. Drop ALL existing policies on "users" to start fresh
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'users'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.users', pol.policyname);
    RAISE NOTICE 'Dropped policy: %', pol.policyname;
  END LOOP;
END $$;

-- 2. Recreate clean policies (NO self-referencing subqueries)

-- Service role can do everything (admin dashboard, user deletion, etc.)
CREATE POLICY "service_role_all"
  ON public.users FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Users can view their own profile
CREATE POLICY "users_view_own"
  ON public.users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Public profiles are visible to everyone
CREATE POLICY "public_profiles_visible"
  ON public.users FOR SELECT
  TO authenticated
  USING (is_public = true);

-- Users can insert their own profile (registration)
CREATE POLICY "users_insert_own"
  ON public.users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "users_update_own"
  ON public.users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can delete their own profile
CREATE POLICY "users_delete_own"
  ON public.users FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Allow anon role to read public profiles (for non-authenticated access)
CREATE POLICY "anon_view_public_profiles"
  ON public.users FOR SELECT
  TO anon
  USING (is_public = true);

-- 3. Also fix donations policies that subquery users (same recursion risk)
-- Use a SECURITY DEFINER function to check admin status without triggering users RLS

CREATE OR REPLACE FUNCTION public.is_admin_user(check_user_id UUID)
RETURNS BOOLEAN AS $$
  SELECT COALESCE(
    (SELECT is_admin FROM public.users WHERE id = check_user_id),
    false
  );
$$ LANGUAGE sql SECURITY DEFINER STABLE;

CREATE OR REPLACE FUNCTION public.get_user_barangay(check_user_id UUID)
RETURNS UUID AS $$
  SELECT barangay_id FROM public.users WHERE id = check_user_id;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 4. Recreate donations policies using the SECURITY DEFINER functions
-- (These avoid querying users table directly, preventing recursion)

DROP POLICY IF EXISTS "Barangay admins view own barangay donations" ON donations;
DROP POLICY IF EXISTS "Barangay admins update own barangay donations" ON donations;
DROP POLICY IF EXISTS "Users view own donations" ON donations;
DROP POLICY IF EXISTS "Users can view own donations" ON donations;
DROP POLICY IF EXISTS "Admins update donations" ON donations;
DROP POLICY IF EXISTS "Users can update own pending donations" ON donations;
DROP POLICY IF EXISTS "Users can create own donations" ON donations;

CREATE POLICY "Users view own donations"
  ON donations FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id
    OR public.is_admin_user(auth.uid())
  );

CREATE POLICY "Admins update donations"
  ON donations FOR UPDATE
  TO authenticated
  USING (
    public.is_admin_user(auth.uid())
  )
  WITH CHECK (
    public.is_admin_user(auth.uid())
  );

-- Re-create base donations policies
CREATE POLICY "Users can create own donations"
  ON donations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own pending donations"
  ON donations FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id);

-- Service role bypass for donations
DROP POLICY IF EXISTS "service_role_all_donations" ON donations;
CREATE POLICY "service_role_all_donations"
  ON donations FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- 5. Grant permissions
GRANT ALL ON public.users TO service_role;
GRANT EXECUTE ON FUNCTION public.is_admin_user(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_barangay(UUID) TO authenticated;

-- Verify: list final policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd
FROM pg_policies
WHERE tablename = 'users' AND schemaname = 'public'
ORDER BY policyname;
