-- =====================================================
-- DATABASE FUNCTIONS AND TRIGGERS
-- Automated logic for core donation features
-- Run this AFTER 02_row_level_security.sql
-- =====================================================

-- =====================================================
-- 1. TIMESTAMP UPDATE FUNCTION
-- Automatically update updated_at on row changes
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
DROP TRIGGER IF EXISTS update_barangays_updated_at ON barangays;
CREATE TRIGGER update_barangays_updated_at
  BEFORE UPDATE ON barangays
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_donations_updated_at ON donations;
CREATE TRIGGER update_donations_updated_at
  BEFORE UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_drop_off_centers_updated_at ON drop_off_centers;
CREATE TRIGGER update_drop_off_centers_updated_at
  BEFORE UPDATE ON drop_off_centers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 2. ASSIGN BARANGAY TO DONATION
-- Auto-assign barangay based on drop-off center or user
-- =====================================================
CREATE OR REPLACE FUNCTION assign_barangay_to_donation()
RETURNS TRIGGER AS $$
BEGIN
  -- Auto-assign barangay from the drop-off center
  IF NEW.drop_off_center IS NOT NULL THEN
    NEW.barangay_id := (
      SELECT barangay_id 
      FROM drop_off_centers 
      WHERE name = NEW.drop_off_center 
      LIMIT 1
    );
  END IF;
  
  -- If still null, try to assign from user's barangay
  IF NEW.barangay_id IS NULL THEN
    NEW.barangay_id := (
      SELECT barangay_id 
      FROM users 
      WHERE id = NEW.user_id 
      LIMIT 1
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS assign_barangay_trigger ON donations;
CREATE TRIGGER assign_barangay_trigger
  BEFORE INSERT OR UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION assign_barangay_to_donation();

-- =====================================================
-- 3. VALIDATE DONATION DATA
-- Ensure donation data is valid before insert
-- =====================================================
CREATE OR REPLACE FUNCTION validate_donation()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure eco_points_earned is non-negative
  IF NEW.eco_points_earned < 0 THEN
    RAISE EXCEPTION 'Eco points earned cannot be negative';
  END IF;
  
  -- Ensure co2_saved is non-negative
  IF NEW.co2_saved < 0 THEN
    RAISE EXCEPTION 'CO2 saved cannot be negative';
  END IF;
  
  -- Ensure year is reasonable if provided
  IF NEW.year IS NOT NULL AND (NEW.year < 1900 OR NEW.year > EXTRACT(YEAR FROM NOW()) + 1) THEN
    RAISE EXCEPTION 'Invalid year provided';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS validate_donation_before_insert ON donations;
CREATE TRIGGER validate_donation_before_insert
  BEFORE INSERT ON donations
  FOR EACH ROW
  EXECUTE FUNCTION validate_donation();

-- =====================================================
-- 4. UPDATE USER STATS ON DONATION
-- Update user statistics when donation is completed
-- =====================================================
CREATE OR REPLACE FUNCTION update_user_stats_on_donation()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update stats when donation is completed
  IF NEW.status = 'completed' AND (OLD IS NULL OR OLD.status != 'completed') THEN
    UPDATE users
    SET 
      eco_points = eco_points + NEW.eco_points_earned,
      total_donations = total_donations + 1,
      total_co2_saved = total_co2_saved + NEW.co2_saved,
      donated_devices = CASE WHEN NEW.condition = 'working' THEN donated_devices + 1 ELSE donated_devices END,
      recycled_devices = CASE WHEN NEW.condition IN ('broken', 'damaged') THEN recycled_devices + 1 ELSE recycled_devices END
    WHERE id = NEW.user_id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_user_stats_trigger ON donations;
CREATE TRIGGER update_user_stats_trigger
  AFTER INSERT OR UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_user_stats_on_donation();

-- =====================================================
-- 5. AUDIT LOG FUNCTION
-- Log admin activities
-- =====================================================
CREATE OR REPLACE FUNCTION log_admin_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (admin_id, action_details)
  VALUES (
    NULLIF(current_setting('request.jwt.claim.sub', true), '')::uuid,
    TG_OP || ' on ' || TG_TABLE_NAME || ' table - Record ID: ' || COALESCE(OLD.id::text, NEW.id::text)
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Attach to sensitive tables
DROP TRIGGER IF EXISTS audit_users_changes ON users;
CREATE TRIGGER audit_users_changes
  AFTER UPDATE OR DELETE ON users
  FOR EACH ROW
  EXECUTE FUNCTION log_admin_activity();

-- Split donations audit into UPDATE and DELETE triggers
DROP TRIGGER IF EXISTS audit_donations_update ON donations;
CREATE TRIGGER audit_donations_update
  AFTER UPDATE ON donations
  FOR EACH ROW
  WHEN (NEW.status IS DISTINCT FROM OLD.status)
  EXECUTE FUNCTION log_admin_activity();

DROP TRIGGER IF EXISTS audit_donations_delete ON donations;
CREATE TRIGGER audit_donations_delete
  AFTER DELETE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION log_admin_activity();

-- =====================================================
-- 5A. USER DELETION FUNCTION
-- Safely delete a user from both auth.users and public.users
-- =====================================================
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

-- Grant execute permission to authenticated users and service_role
GRANT EXECUTE ON FUNCTION delete_user_completely(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION delete_user_completely(UUID) TO service_role;

-- =====================================================
-- 6. HANDLE NEW USER REGISTRATION
-- Automatically create user profile when someone signs up
-- =====================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (
    id,
    email,
    full_name,
    username,
    phone,
    bio,
    location,
    profile_image_url,
    is_active,
    is_admin,
    barangay_id,
    eco_points,
    total_donations,
    total_co2_saved,
    donated_devices,
    recycled_devices,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
    '',
    '',
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    true,
    false,
    NULL,
    0,
    0,
    0,
    0,
    0,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- FUNCTIONS AND TRIGGERS COMPLETE
-- Next: Run 04_storage_setup.sql or configure storage via dashboard
-- =====================================================
