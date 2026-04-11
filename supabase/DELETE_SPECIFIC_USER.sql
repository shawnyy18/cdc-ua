-- =====================================================
-- DEBUG AND FIX: Manual User Deletion
-- =====================================================
-- INSTRUCTIONS: Replace the UUID below with the user ID you want to delete
-- Current failing user: kkmdedote.student@ua.edu.ph (f6bfb847-ff37-4a5d-b846-9ec7b5bf1e79)
-- Previous failing user: jdjurado2@gmail.com (db34b54c-56fc-4f68-a8b6-f02d0deaf5e0)
-- =====================================================

-- STEP 1: Find all data for this user
DO $$
DECLARE
    target_user_id UUID := 'f6bfb847-ff37-4a5d-b846-9ec7b5bf1e79'; -- CHANGE THIS ID
    r RECORD;
    table_name TEXT;
    column_name TEXT;
    count_result INTEGER;
BEGIN
    RAISE NOTICE '===========================================';
    RAISE NOTICE 'SEARCHING FOR USER DATA';
    RAISE NOTICE 'User ID: %', target_user_id;
    RAISE NOTICE '===========================================';
    
    -- Check each table for this user's data
    FOR r IN (
        SELECT 
            t.table_name,
            c.column_name
        FROM information_schema.tables t
        JOIN information_schema.columns c ON t.table_name = c.table_name
        WHERE t.table_schema = 'public'
        AND c.column_name IN ('user_id', 'follower_id', 'following_id', 'sender_id', 'recipient_id', 'seller_id', 'id')
        AND t.table_type = 'BASE TABLE'
        ORDER BY t.table_name
    ) LOOP
        -- Count records
        EXECUTE format('SELECT COUNT(*) FROM public.%I WHERE %I = $1', r.table_name, r.column_name)
        INTO count_result
        USING target_user_id;
        
        IF count_result > 0 THEN
            RAISE NOTICE 'Found % records in %.% column', count_result, r.table_name, r.column_name;
        END IF;
    END LOOP;
    
    RAISE NOTICE '===========================================';
END $$;

-- STEP 2: Manually delete all related data for this user
DO $$
DECLARE
    target_user_id UUID := 'f6bfb847-ff37-4a5d-b846-9ec7b5bf1e79'; -- CHANGE THIS ID
    deleted_count INTEGER;
BEGIN
    RAISE NOTICE '===========================================';
    RAISE NOTICE 'DELETING USER DATA';
    RAISE NOTICE '===========================================';
    
    -- Delete from user_connections (both directions)
    DELETE FROM public.user_connections WHERE follower_id = target_user_id OR following_id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % records from user_connections', deleted_count;
    
    -- Delete from notifications
    DELETE FROM public.notifications WHERE recipient_id = target_user_id OR sender_id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % records from notifications', deleted_count;
    
    -- Delete from post_comments
    DELETE FROM public.post_comments WHERE user_id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % records from post_comments', deleted_count;
    
    -- Delete from post_likes
    DELETE FROM public.post_likes WHERE user_id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % records from post_likes', deleted_count;
    
    -- Delete from community_posts
    DELETE FROM public.community_posts WHERE user_id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % records from community_posts', deleted_count;
    
    -- Delete from transactions
    DELETE FROM public.transactions WHERE user_id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % records from transactions', deleted_count;
    
    -- Delete from user_achievements
    DELETE FROM public.user_achievements WHERE user_id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % records from user_achievements', deleted_count;
    
    -- Delete from seller_profiles
    DELETE FROM public.seller_profiles WHERE user_id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % records from seller_profiles', deleted_count;
    
    -- Delete from marketplace_items
    DELETE FROM public.marketplace_items WHERE seller_id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % records from marketplace_items', deleted_count;
    
    -- Delete from donations
    DELETE FROM public.donations WHERE user_id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % records from donations', deleted_count;
    
    -- Delete from users table
    DELETE FROM public.users WHERE id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    RAISE NOTICE 'Deleted % records from users', deleted_count;
    
    RAISE NOTICE '===========================================';
    RAISE NOTICE 'USER DATA CLEANUP COMPLETE!';
    RAISE NOTICE 'Now try deleting from Dashboard';
    RAISE NOTICE '===========================================';
END $$;

-- STEP 3: Verify the user is gone from public.users
DO $$
DECLARE
    target_user_id UUID := 'f6bfb847-ff37-4a5d-b846-9ec7b5bf1e79'; -- CHANGE THIS ID
    user_exists BOOLEAN;
BEGIN
    SELECT EXISTS(SELECT 1 FROM public.users WHERE id = target_user_id) INTO user_exists;
    
    IF user_exists THEN
        RAISE WARNING 'WARNING: User still exists in public.users table!';
    ELSE
        RAISE NOTICE 'SUCCESS: User removed from public.users table';
    END IF;
    
    -- Check if still in auth.users
    SELECT EXISTS(SELECT 1 FROM auth.users WHERE id = target_user_id) INTO user_exists;
    
    IF user_exists THEN
        RAISE NOTICE 'User still exists in auth.users - now delete from Dashboard';
    ELSE
        RAISE NOTICE 'User completely deleted!';
    END IF;
END $$;
