-- Check if barangays table exists and has data
SELECT 
  'Barangays Table' as check_name,
  COUNT(*) as count
FROM barangays;

-- Show all barangays
SELECT * FROM barangays ORDER BY name;

-- Check if users table has barangay_id column
SELECT 
  column_name,
  data_type,
  is_nullable
FROM information_schema.columns
WHERE table_name = 'users' 
  AND column_name = 'barangay_id';

-- Check current user's barangay (replace with your email)
-- SELECT 
--   u.email,
--   u.full_name,
--   u.barangay_id,
--   b.name as barangay_name,
--   b.municipality
-- FROM users u
-- LEFT JOIN barangays b ON u.barangay_id = b.id
-- WHERE u.email = 'your-email@example.com';

-- Check all users with barangays
SELECT 
  u.email,
  u.full_name,
  b.name as barangay_name,
  b.municipality
FROM users u
LEFT JOIN barangays b ON u.barangay_id = b.id
ORDER BY u.email;
