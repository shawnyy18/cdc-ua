-- =====================================================
-- ADD ADMIN COLUMN AND AUDIT LOGGING
-- =====================================================

-- 1. Add is_admin column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE;

-- 2. Create audit_log table for admin actions
CREATE TABLE IF NOT EXISTS public.audit_log (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT now(),
  admin_id UUID,
  action_details TEXT
);

-- 3. Enable RLS on users table
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS Policy: Only admins can manage users
DROP POLICY IF EXISTS admins_can_manage_users ON public.users;
CREATE POLICY admins_can_manage_users
  ON public.users
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users AS u
      WHERE u.id = auth.uid() AND u.is_admin = TRUE
    )
  );

-- 5. Allow users to read their own profile
DROP POLICY IF EXISTS users_can_read_own_profile ON public.users;
CREATE POLICY users_can_read_own_profile
  ON public.users
  FOR SELECT
  USING (id = auth.uid());

-- 6. Allow users to update their own profile (except is_admin)
DROP POLICY IF EXISTS users_can_update_own_profile ON public.users;
CREATE POLICY users_can_update_own_profile
  ON public.users
  FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- 7. Create audit logging trigger function
CREATE OR REPLACE FUNCTION public.log_admin_activity()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_log (admin_id, action_details)
  VALUES (
    current_setting('request.jwt.claim.sub', true)::uuid,
    TG_OP || ' on users table - User ID: ' || COALESCE(OLD.id::text, NEW.id::text)
  );
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 8. Attach trigger to users table
DROP TRIGGER IF EXISTS audit_users_changes ON public.users;
CREATE TRIGGER audit_users_changes
AFTER UPDATE OR DELETE ON public.users
FOR EACH ROW EXECUTE FUNCTION public.log_admin_activity();

-- 9. Add index on is_admin for faster queries
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users(is_admin) WHERE is_admin = TRUE;

-- 10. Update your admin user (replace with your email)
-- UPDATE public.users SET is_admin = TRUE WHERE email = 'saqguarin.student@ua.edu.ph';

COMMENT ON COLUMN users.is_admin IS 'Indicates if the user has admin privileges';
COMMENT ON TABLE audit_log IS 'Audit trail for admin actions on users table';
