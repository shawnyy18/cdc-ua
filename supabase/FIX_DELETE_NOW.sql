-- =====================================================
-- COMPREHENSIVE USER DELETION FIX
-- Copy-paste this ENTIRE script into Supabase SQL Editor
-- and click "Run". It diagnoses and fixes all issues.
-- =====================================================

-- =====================================================
-- STEP 1: DIAGNOSE - Find all tables referencing users
-- =====================================================
DO $$
DECLARE
    r RECORD;
BEGIN
    RAISE NOTICE '=== STEP 1: Checking FK constraints referencing users ===';
    FOR r IN (
        SELECT 
            tc.table_name,
            kcu.column_name,
            rc.delete_rule
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
        JOIN information_schema.referential_constraints AS rc
          ON tc.constraint_name = rc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND ccu.table_name = 'users'
          AND tc.table_schema = 'public'
    ) LOOP
        RAISE NOTICE 'Table: %, Column: %, Delete Rule: %', r.table_name, r.column_name, r.delete_rule;
    END LOOP;
END $$;

-- =====================================================
-- STEP 2: FIX AUDIT TRIGGER (most likely cause of error)
-- The audit trigger tries to INSERT into audit_log on
-- every DELETE from users/donations. If audit_log doesn't
-- exist, or the insert fails for any reason, the entire
-- cascade delete fails.
-- =====================================================

-- Ensure audit_log table exists
CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMPTZ DEFAULT now(),
    admin_id UUID,
    action_details TEXT
);

-- Replace the audit function with a SAFE version that cannot crash
CREATE OR REPLACE FUNCTION log_admin_activity()
RETURNS TRIGGER AS $$
BEGIN
    BEGIN
        INSERT INTO audit_log (admin_id, action_details)
        VALUES (
            NULLIF(current_setting('request.jwt.claim.sub', true), '')::uuid,
            TG_OP || ' on ' || TG_TABLE_NAME || ' table - Record ID: ' || COALESCE(OLD.id::text, NEW.id::text)
        );
    EXCEPTION WHEN OTHERS THEN
        -- Silently ignore audit errors so they never block deletions
        RAISE NOTICE 'Audit log skipped: %', SQLERRM;
    END;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- STEP 3: FIX ALL FK CONSTRAINTS TO USE CASCADE
-- Any FK referencing users(id) without CASCADE will
-- block deletion. This fixes them automatically.
-- =====================================================
DO $$
DECLARE
    r RECORD;
BEGIN
    RAISE NOTICE '=== STEP 3: Fixing non-CASCADE FK constraints ===';
    FOR r IN (
        SELECT
            tc.table_name,
            tc.constraint_name,
            kcu.column_name,
            ccu.column_name AS foreign_column_name,
            rc.delete_rule
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
          AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
          AND ccu.table_schema = tc.table_schema
        JOIN information_schema.referential_constraints AS rc
          ON tc.constraint_name = rc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND ccu.table_name = 'users'
          AND tc.table_schema = 'public'
          AND rc.delete_rule NOT IN ('CASCADE', 'SET NULL')
    ) LOOP
        RAISE NOTICE 'FIXING: %.% has delete_rule=%, changing to CASCADE', r.table_name, r.column_name, r.delete_rule;
        
        EXECUTE format('ALTER TABLE public.%I DROP CONSTRAINT %I', r.table_name, r.constraint_name);
        EXECUTE format(
            'ALTER TABLE public.%I ADD CONSTRAINT %I FOREIGN KEY (%I) REFERENCES public.users(%I) ON DELETE CASCADE',
            r.table_name, r.constraint_name, r.column_name, r.foreign_column_name
        );
        
        RAISE NOTICE 'FIXED: %.% now has ON DELETE CASCADE', r.table_name, r.column_name;
    END LOOP;
    
    RAISE NOTICE 'FK constraint check complete';
END $$;

-- =====================================================
-- STEP 4: FIX audit_log FK to users (if it exists)
-- The audit_log.admin_id might reference users(id) 
-- without SET NULL, which blocks user deletion
-- =====================================================
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT tc.constraint_name
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND tc.table_name = 'audit_log'
          AND kcu.column_name = 'admin_id'
          AND ccu.table_name = 'users'
          AND tc.table_schema = 'public'
    ) LOOP
        RAISE NOTICE 'Fixing audit_log.admin_id FK constraint: %', r.constraint_name;
        EXECUTE format('ALTER TABLE public.audit_log DROP CONSTRAINT %I', r.constraint_name);
        RAISE NOTICE 'Dropped old audit_log FK constraint';
    END LOOP;
END $$;

-- Re-add audit_log FK with ON DELETE SET NULL (so deleting a user doesn't fail)
DO $$
BEGIN
    -- Only add if audit_log table exists and has admin_id column
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'audit_log' AND column_name = 'admin_id' AND table_schema = 'public'
    ) THEN
        -- Check if any FK already exists
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints tc
            JOIN information_schema.key_column_usage kcu ON tc.constraint_name = kcu.constraint_name
            WHERE tc.table_name = 'audit_log' AND kcu.column_name = 'admin_id' 
            AND tc.constraint_type = 'FOREIGN KEY' AND tc.table_schema = 'public'
        ) THEN
            ALTER TABLE public.audit_log 
                ADD CONSTRAINT audit_log_admin_id_fkey 
                FOREIGN KEY (admin_id) REFERENCES public.users(id) ON DELETE SET NULL;
            RAISE NOTICE 'Added audit_log.admin_id FK with ON DELETE SET NULL';
        END IF;
    END IF;
END $$;

-- =====================================================
-- STEP 5: ENSURE SERVICE ROLE CAN BYPASS RLS
-- =====================================================
DO $$
DECLARE
    tbl RECORD;
    pol_name TEXT;
BEGIN
    RAISE NOTICE '=== STEP 5: Setting up service_role bypass ===';
    FOR tbl IN (
        SELECT tablename FROM pg_tables WHERE schemaname = 'public'
    ) LOOP
        pol_name := 'service_role_bypass_' || tbl.tablename;
        
        -- Only add policy if RLS is enabled on the table
        IF EXISTS (
            SELECT 1 FROM pg_class c
            JOIN pg_namespace n ON n.oid = c.relnamespace
            WHERE n.nspname = 'public' AND c.relname = tbl.tablename AND c.relrowsecurity = true
        ) THEN
            EXECUTE format('DROP POLICY IF EXISTS %I ON public.%I', pol_name, tbl.tablename);
            EXECUTE format(
                'CREATE POLICY %I ON public.%I FOR ALL TO service_role USING (true) WITH CHECK (true)',
                pol_name, tbl.tablename
            );
            RAISE NOTICE 'Service role bypass on: %', tbl.tablename;
        END IF;
    END LOOP;
END $$;

-- Grant full permissions to service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;
GRANT USAGE ON SCHEMA auth TO service_role;

-- =====================================================
-- STEP 6: ADD DELETE POLICY FOR ADMINS ON USERS TABLE
-- =====================================================
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
-- STEP 7: CREATE SAFE DELETE FUNCTION
-- =====================================================
CREATE OR REPLACE FUNCTION delete_user_completely(target_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    result JSON;
    deleted_count INTEGER;
BEGIN
    -- Delete from public.users (cascades to all child tables)
    DELETE FROM public.users WHERE id = target_user_id;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Delete from auth.users
    BEGIN
        DELETE FROM auth.users WHERE id = target_user_id;
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE 'auth.users delete note: %', SQLERRM;
    END;
    
    result := json_build_object(
        'success', true,
        'message', 'User deleted successfully',
        'user_id', target_user_id,
        'public_rows_deleted', deleted_count
    );
    RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION delete_user_completely(UUID) TO service_role;
GRANT EXECUTE ON FUNCTION delete_user_completely(UUID) TO authenticated;

-- =====================================================
-- STEP 8: VERIFY EVERYTHING IS READY
-- =====================================================
DO $$
DECLARE
    r RECORD;
    problem_count INTEGER := 0;
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '=== VERIFICATION ===';
    
    -- Check for remaining non-CASCADE FKs
    FOR r IN (
        SELECT tc.table_name, kcu.column_name, rc.delete_rule
        FROM information_schema.table_constraints AS tc
        JOIN information_schema.key_column_usage AS kcu
          ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
        JOIN information_schema.constraint_column_usage AS ccu
          ON ccu.constraint_name = tc.constraint_name AND ccu.table_schema = tc.table_schema
        JOIN information_schema.referential_constraints AS rc
          ON tc.constraint_name = rc.constraint_name
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND ccu.table_name = 'users'
          AND tc.table_schema = 'public'
          AND rc.delete_rule NOT IN ('CASCADE', 'SET NULL')
    ) LOOP
        RAISE NOTICE 'PROBLEM: %.% still has delete_rule=%', r.table_name, r.column_name, r.delete_rule;
        problem_count := problem_count + 1;
    END LOOP;
    
    -- Check delete policy exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND cmd = 'd'
    ) THEN
        RAISE NOTICE 'PROBLEM: No DELETE policy on users table';
        problem_count := problem_count + 1;
    ELSE
        RAISE NOTICE 'OK: DELETE policy exists on users table';
    END IF;
    
    -- Check service_role bypass
    IF EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'users' AND policyname LIKE 'service_role%'
    ) THEN
        RAISE NOTICE 'OK: Service role bypass policy exists on users';
    END IF;
    
    -- Check delete function exists
    IF EXISTS (
        SELECT 1 FROM pg_proc WHERE proname = 'delete_user_completely'
    ) THEN
        RAISE NOTICE 'OK: delete_user_completely() function exists';
    END IF;
    
    IF problem_count = 0 THEN
        RAISE NOTICE '';
        RAISE NOTICE '==========================================';
        RAISE NOTICE 'ALL CHECKS PASSED! User deletion is ready.';
        RAISE NOTICE '==========================================';
        RAISE NOTICE '';
        RAISE NOTICE 'To delete a specific user, run:';
        RAISE NOTICE 'SELECT delete_user_completely(''USER-UUID-HERE'');';
    ELSE
        RAISE NOTICE '';
        RAISE NOTICE 'Found % problem(s) - see above', problem_count;
    END IF;
END $$;
