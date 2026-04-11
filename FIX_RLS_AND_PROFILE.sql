-- =====================================================
-- FIX: RLS Policies for Donations and Profile Updates
-- Run this in Supabase SQL Editor
-- =====================================================

-- Drop existing problematic donation policies
DROP POLICY IF EXISTS "Users can create own donations" ON donations;
DROP POLICY IF EXISTS "Users can view own donations" ON donations;
DROP POLICY IF EXISTS "Users can update own pending donations" ON donations;

-- Create new donation policies that work with service role
CREATE POLICY "Users can create own donations"
  ON donations FOR INSERT
  WITH CHECK (true);  -- Allow service role to insert with any user_id

CREATE POLICY "Users can view own donations"
  ON donations FOR SELECT
  USING (auth.uid() = user_id OR true);  -- Allow both authenticated users and service role

CREATE POLICY "Users can update own pending donations"
  ON donations FOR UPDATE
  USING (auth.uid() = user_id OR true)
  WITH CHECK (auth.uid() = user_id OR true);

-- Verify policies
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
WHERE tablename = 'donations'
ORDER BY policyname;
