-- =====================================================
-- FIX USER DELETION
-- Adds necessary policies and function to properly delete users
-- This migration is idempotent - safe to run multiple times
-- =====================================================

-- =====================================================
-- STEP 1: Add missing DELETE policy for users table
-- =====================================================

-- Allow admins to delete users
DROP POLICY IF EXISTS "Admins can delete users" ON users;
CREATE POLICY "Admins can delete users"
  ON users FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- =====================================================
-- STEP 2: Create service_role bypass policies for all tables
-- This ensures CASCADE deletes work properly
-- =====================================================

DO $$
DECLARE
    r RECORD;
    pol_name TEXT;
BEGIN
    FOR r IN (
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
        AND tablename IN (
            'users', 'donations', 'community_posts', 'post_likes', 
            'marketplace_items', 'seller_profiles', 'user_achievements',
            'transactions', 'notifications', 'user_connections', 'post_comments',
            'follows'
        )
    ) LOOP
        pol_name := 'service_role_all_' || r.tablename;
        
        -- Drop if exists
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(pol_name) || 
                ' ON ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename);
        
        -- Create bypass policy for service_role
        EXECUTE 'CREATE POLICY ' || quote_ident(pol_name) || 
                ' ON ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename) ||
                ' FOR ALL TO service_role USING (true) WITH CHECK (true)';
        
        RAISE NOTICE 'Created service_role bypass policy on: %.%', r.schemaname, r.tablename;
    END LOOP;
END $$;

-- =====================================================
-- STEP 3: Create a function to safely delete a user
-- This function handles both auth.users and public.users deletion
-- =====================================================

DROP FUNCTION IF EXISTS delete_user_completely(UUID);

CREATE OR REPLACE FUNCTION delete_user_completely(target_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result JSON;
    deleted_count INTEGER;
    auth_user_exists BOOLEAN;
BEGIN
    -- Check if user exists in auth.users
    SELECT EXISTS (
        SELECT 1 FROM auth.users WHERE id = target_user_id
    ) INTO auth_user_exists;

    -- Start transaction
    BEGIN
        -- Delete from public.users first (this will cascade to related tables)
        DELETE FROM public.users WHERE id = target_user_id;
        GET DIAGNOSTICS deleted_count = ROW_COUNT;
        
        RAISE NOTICE 'Deleted % record(s) from public.users', deleted_count;
        
        -- Delete from auth.users if exists (requires service_role)
        IF auth_user_exists THEN
            DELETE FROM auth.users WHERE id = target_user_id;
            RAISE NOTICE 'Deleted user from auth.users';
        END IF;
        
        result := json_build_object(
            'success', true,
            'message', 'User deleted successfully',
            'user_id', target_user_id,
            'deleted_from_public_users', deleted_count > 0,
            'deleted_from_auth_users', auth_user_exists
        );
        
        RETURN result;
        
    EXCEPTION WHEN OTHERS THEN
        result := json_build_object(
            'success', false,
            'message', 'Error deleting user: ' || SQLERRM,
            'user_id', target_user_id
        );
        RETURN result;
    END;
END;
$$;

-- Grant execute permission to authenticated users (admins will check in app)
GRANT EXECUTE ON FUNCTION delete_user_completely(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION delete_user_completely(UUID) TO service_role;

-- =====================================================
-- STEP 4: Verify all foreign key constraints have CASCADE
-- =====================================================

DO $$
DECLARE
    r RECORD;
    constraint_name TEXT;
BEGIN
    RAISE NOTICE '=== Checking Foreign Key Constraints ===';
    
    FOR r IN (
        SELECT 
            tc.table_name,
            tc.constraint_name,
            kcu.column_name,
            ccu.table_name AS foreign_table_name,
            ccu.column_name AS foreign_column_name,
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
        AND rc.delete_rule != 'CASCADE'
    ) LOOP
        RAISE NOTICE 'WARNING: Table % column % references users.% with delete rule: %', 
            r.table_name, r.column_name, r.foreign_column_name, r.delete_rule;
            
        -- Optionally fix non-CASCADE constraints
        -- Uncomment the following to automatically fix them:
        /*
        constraint_name := r.constraint_name;
        EXECUTE format(
            'ALTER TABLE %I DROP CONSTRAINT %I',
            r.table_name,
            constraint_name
        );
        EXECUTE format(
            'ALTER TABLE %I ADD CONSTRAINT %I FOREIGN KEY (%I) REFERENCES users(%I) ON DELETE CASCADE',
            r.table_name,
            constraint_name,
            r.column_name,
            r.foreign_column_name
        );
        RAISE NOTICE 'Fixed constraint on %.%', r.table_name, r.column_name;
        */
    END LOOP;
END $$;

-- =====================================================
-- STEP 5: Grant necessary permissions
-- =====================================================

-- Grant permissions to service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- Grant usage on auth schema tables (if needed)
GRANT USAGE ON SCHEMA auth TO service_role;

-- Display completion message
DO $$
BEGIN
    RAISE NOTICE '==============================================';
    RAISE NOTICE 'User deletion fix completed successfully!';
    RAISE NOTICE 'Admins can now delete users through the UI';
    RAISE NOTICE 'Service role has full access for CASCADE deletes';
    RAISE NOTICE '==============================================';
END $$;
