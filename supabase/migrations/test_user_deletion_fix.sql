-- =====================================================
-- TEST USER DELETION FIX
-- Run this after applying fix_user_deletion.sql
-- =====================================================

-- =====================================================
-- TEST 1: Verify DELETE policy exists
-- =====================================================
DO $$
DECLARE
    policy_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies 
    WHERE tablename = 'users' 
    AND cmd = 'DELETE'
    AND policyname = 'Admins can delete users';
    
    IF policy_count > 0 THEN
        RAISE NOTICE '✅ TEST 1 PASSED: DELETE policy exists for users table';
    ELSE
        RAISE WARNING '❌ TEST 1 FAILED: DELETE policy NOT found for users table';
    END IF;
END $$;

-- =====================================================
-- TEST 2: Verify service_role bypass policy exists
-- =====================================================
DO $$
DECLARE
    policy_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO policy_count
    FROM pg_policies 
    WHERE tablename = 'users' 
    AND policyname LIKE 'service_role%';
    
    IF policy_count > 0 THEN
        RAISE NOTICE '✅ TEST 2 PASSED: Service role bypass policy exists';
    ELSE
        RAISE WARNING '❌ TEST 2 FAILED: Service role bypass policy NOT found';
    END IF;
END $$;

-- =====================================================
-- TEST 3: Verify delete function exists
-- =====================================================
DO $$
DECLARE
    function_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO function_count
    FROM pg_proc 
    WHERE proname = 'delete_user_completely';
    
    IF function_count > 0 THEN
        RAISE NOTICE '✅ TEST 3 PASSED: delete_user_completely() function exists';
    ELSE
        RAISE WARNING '❌ TEST 3 FAILED: delete_user_completely() function NOT found';
    END IF;
END $$;

-- =====================================================
-- TEST 4: Verify CASCADE constraints on users table
-- =====================================================
DO $$
DECLARE
    non_cascade_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO non_cascade_count
    FROM information_schema.table_constraints AS tc
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
    JOIN information_schema.referential_constraints AS rc
      ON tc.constraint_name = rc.constraint_name
    WHERE tc.constraint_type = 'FOREIGN KEY'
    AND ccu.table_name = 'users'
    AND tc.table_schema = 'public'
    AND rc.delete_rule != 'CASCADE';
    
    IF non_cascade_count = 0 THEN
        RAISE NOTICE '✅ TEST 4 PASSED: All foreign keys have CASCADE delete';
    ELSE
        RAISE WARNING '❌ TEST 4 FAILED: % foreign keys do NOT have CASCADE delete', non_cascade_count;
    END IF;
END $$;

-- =====================================================
-- SUMMARY
-- =====================================================
DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'USER DELETION FIX - TEST COMPLETE';
    RAISE NOTICE '==============================================';
    RAISE NOTICE '';
    RAISE NOTICE 'If all tests passed (✅), you can now:';
    RAISE NOTICE '  1. Delete users from Supabase Dashboard';
    RAISE NOTICE '  2. Delete users via admin interface';
    RAISE NOTICE '  3. CASCADE deletes will work automatically';
    RAISE NOTICE '';
    RAISE NOTICE 'For manual testing:';
    RAISE NOTICE '  - Go to Authentication > Users in Supabase Dashboard';
    RAISE NOTICE '  - Try deleting a test user';
    RAISE NOTICE '  - Verify all related records are removed';
    RAISE NOTICE '';
END $$;
