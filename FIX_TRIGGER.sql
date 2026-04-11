-- =====================================================
-- FIX: Update handle_new_user trigger function
-- Run this in Supabase SQL Editor to fix the registration error
-- =====================================================

-- Drop the existing trigger first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the old function
DROP FUNCTION IF EXISTS handle_new_user();

-- Create the updated function with ALL required fields
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
    interests,
    profile_image_url,
    is_public,
    is_seller,
    is_active,
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
    ARRAY[]::TEXT[],
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    true,
    false,
    true,
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

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Verify the function was created
SELECT 
  proname as function_name,
  prosrc as function_source
FROM pg_proc
WHERE proname = 'handle_new_user';
