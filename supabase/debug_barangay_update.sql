-- Debug Script: Check if barangay update is working
-- Run this in Supabase SQL Editor

-- 1. Check if barangay_id column exists
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'users' 
  AND column_name = 'barangay_id';

-- 2. Check RLS policies on users table
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

-- 3. Try manual update (replace with your user email)
-- UPDATE users 
-- SET barangay_id = (SELECT id FROM barangays WHERE name = 'Lagundi' LIMIT 1)
-- WHERE email = 'your-email@example.com';

-- 4. Verify the update
-- SELECT 
--   email,
--   barangay_id,
--   (SELECT name FROM barangays WHERE id = users.barangay_id) as barangay_name
-- FROM users
-- WHERE email = 'your-email@example.com';

-- 5. Check if foreign key constraint exists
SELECT
  tc.constraint_name,
  tc.table_name,
  kcu.column_name,
  ccu.table_name AS foreign_table_name,
  ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'users'
  AND kcu.column_name = 'barangay_id';

-- 6. Test if you can insert/update with a valid barangay_id
DO $$
DECLARE
  test_barangay_id UUID;
  test_user_id UUID;
BEGIN
  -- Get a valid barangay ID
  SELECT id INTO test_barangay_id FROM barangays WHERE name = 'Lagundi' LIMIT 1;
  
  -- Get a test user (use your user ID)
  -- SELECT id INTO test_user_id FROM users WHERE email = 'your-email@example.com';
  
  RAISE NOTICE 'Test barangay ID: %', test_barangay_id;
  -- RAISE NOTICE 'Test user ID: %', test_user_id;
  
  -- Try the update
  -- UPDATE users SET barangay_id = test_barangay_id WHERE id = test_user_id;
  
  RAISE NOTICE 'Update would succeed if uncommented';
END $$;
