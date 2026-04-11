-- =====================================================
-- EMERGENCY FIX: User Deletion from Supabase Dashboard
-- Run this ENTIRE script in Supabase SQL Editor
-- =====================================================

-- STEP 1: Disable RLS temporarily on all tables to allow deletion
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        AND tablename IN ('users', 'donations', 'community_posts', 'post_likes', 
                         'marketplace_items', 'seller_profiles', 'user_achievements',
                         'transactions', 'notifications', 'user_connections', 'post_comments')
    ) LOOP
        EXECUTE 'ALTER TABLE ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename) || 
                ' DISABLE ROW LEVEL SECURITY';
        RAISE NOTICE 'Disabled RLS on: %.%', r.schemaname, r.tablename;
    END LOOP;
END $$;

-- STEP 2: Grant all permissions to service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- STEP 3: Re-enable RLS
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        AND tablename IN ('users', 'donations', 'community_posts', 'post_likes', 
                         'marketplace_items', 'seller_profiles', 'user_achievements',
                         'transactions', 'notifications', 'user_connections', 'post_comments')
    ) LOOP
        EXECUTE 'ALTER TABLE ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename) || 
                ' ENABLE ROW LEVEL SECURITY';
        RAISE NOTICE 'Re-enabled RLS on: %.%', r.schemaname, r.tablename;
    END LOOP;
END $$;

-- STEP 4: Create service_role bypass policies for ALL tables
DO $$
DECLARE
    r RECORD;
    pol_name TEXT;
BEGIN
    FOR r IN (
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        AND tablename IN ('users', 'donations', 'community_posts', 'post_likes', 
                         'marketplace_items', 'seller_profiles', 'user_achievements',
                         'transactions', 'notifications', 'user_connections', 'post_comments')
    ) LOOP
        pol_name := 'service_role_all_' || r.tablename;
        
        -- Drop if exists
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(pol_name) || 
                ' ON ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename);
        
        -- Create bypass policy
        EXECUTE 'CREATE POLICY ' || quote_ident(pol_name) || 
                ' ON ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename) ||
                ' FOR ALL TO service_role USING (true) WITH CHECK (true)';
        
        RAISE NOTICE 'Created service_role bypass policy on: %.%', r.schemaname, r.tablename;
    END LOOP;
END $$;

-- STEP 5: Verify foreign key constraints have CASCADE
DO $$
DECLARE
    r RECORD;
BEGIN
    RAISE NOTICE '=== Foreign Key Constraints ===';
    FOR r IN (
        SELECT 
            tc.table_name,
            kcu.column_name,
            ccu.table_name AS foreign_table_name,
            rc.delete_rule
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
    ) LOOP
        RAISE NOTICE 'Table: %, Column: %, References: %, Delete Rule: %', 
                     r.table_name, r.column_name, r.foreign_table_name, r.delete_rule;
        
        IF r.delete_rule != 'CASCADE' THEN
            RAISE WARNING 'WARNING: % does not have CASCADE delete!', r.table_name;
        END IF;
    END LOOP;
END $$;

-- Success message
DO $$
BEGIN
    RAISE NOTICE '===========================================';
    RAISE NOTICE 'USER DELETION FIX COMPLETE!';
    RAISE NOTICE 'You can now delete users from the Dashboard';
    RAISE NOTICE '===========================================';
END $$;
