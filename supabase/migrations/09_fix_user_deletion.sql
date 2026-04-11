-- =====================================================
-- FIX: User Deletion from Supabase Dashboard
-- Ensures users can be deleted without database errors
-- =====================================================

-- CRITICAL: RLS policies can block CASCADE deletes on ALL related tables
-- Solution: Add service_role bypass policies to ALL tables with user references

DO $$
DECLARE
    table_name TEXT;
    policy_name TEXT;
    table_exists BOOLEAN;
BEGIN
    -- ===== USERS TABLE =====
    -- Drop ALL existing policies on users
    FOR policy_name IN (SELECT policyname FROM pg_policies WHERE tablename = 'users' AND schemaname = 'public') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || policy_name || '" ON public.users';
    END LOOP;

    -- Service role can do everything
    EXECUTE 'CREATE POLICY "service_role_all" ON public.users FOR ALL TO service_role USING (true) WITH CHECK (true)';
    EXECUTE 'CREATE POLICY "public_profiles_visible" ON public.users FOR SELECT USING (is_public = true)';
    EXECUTE 'CREATE POLICY "users_view_own" ON public.users FOR SELECT USING (auth.uid() = id)';
    EXECUTE 'CREATE POLICY "users_update_own" ON public.users FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id)';
    EXECUTE 'CREATE POLICY "users_delete_own" ON public.users FOR DELETE USING (auth.uid() = id)';

    -- Also grant on users table
    EXECUTE 'GRANT ALL ON public.users TO service_role';

    -- ===== CREATE BYPASS POLICIES FOR ALL OTHER TABLES =====
    -- Loop through all tables that have foreign keys to users
    FOR table_name IN 
        SELECT DISTINCT t.relname
        FROM pg_constraint c
        JOIN pg_class t ON c.conrelid = t.oid
        JOIN pg_namespace n ON t.relnamespace = n.oid
        WHERE c.confrelid = 'public.users'::regclass
        AND n.nspname = 'public'
        AND t.relname != 'users'
    LOOP
        -- Check if RLS is enabled on this table
        SELECT EXISTS (
            SELECT 1 FROM pg_class c
            JOIN pg_namespace n ON c.relnamespace = n.oid
            WHERE c.relname = table_name
            AND n.nspname = 'public'
            AND c.relrowsecurity = true
        ) INTO table_exists;
        
        IF table_exists THEN
            -- Drop existing service_role policy if exists
            EXECUTE 'DROP POLICY IF EXISTS "service_role_all_' || table_name || '" ON public.' || table_name;
            
            -- Create new bypass policy for service_role
            EXECUTE 'CREATE POLICY "service_role_all_' || table_name || '" ON public.' || table_name || 
                    ' FOR ALL TO service_role USING (true) WITH CHECK (true)';
            
            RAISE NOTICE 'Created bypass policy for table: %', table_name;
        ELSE
            RAISE NOTICE 'Skipping table (RLS not enabled): %', table_name;
        END IF;
        
        -- Grant permissions regardless
        EXECUTE 'GRANT ALL ON public.' || table_name || ' TO service_role';
    END LOOP;
    
    RAISE NOTICE 'User deletion fix complete!';
END $$;

COMMENT ON POLICY "service_role_all" ON public.users IS 'Service role bypass - enables Supabase Dashboard user deletion';
