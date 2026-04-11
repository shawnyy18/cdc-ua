-- =====================================================
-- BARANGAY-SCOPED ADMIN ACCESS
-- Migration 07: Add barangay support for admin scoping
-- =====================================================

-- 1. Create barangays lookup table
CREATE TABLE IF NOT EXISTS barangays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  municipality VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL DEFAULT 'Pampanga',
  description TEXT,
  contact_person VARCHAR(255),
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Add barangay_id to users table
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS barangay_id UUID REFERENCES barangays(id) ON DELETE SET NULL;

-- 3. Add barangay_id to drop_off_centers
ALTER TABLE drop_off_centers 
ADD COLUMN IF NOT EXISTS barangay_id UUID REFERENCES barangays(id) ON DELETE SET NULL;

-- 4. Add barangay_id to donations for tracking
ALTER TABLE donations 
ADD COLUMN IF NOT EXISTS barangay_id UUID REFERENCES barangays(id) ON DELETE SET NULL;

-- 5. Insert sample barangays in Pampanga (matching drop-off centers)
INSERT INTO barangays (name, municipality, province, description) VALUES
  ('Lagundi', 'Mexico', 'Pampanga', 'Lagundi Barangay - Main EcoKonek center'),
  ('Parian', 'Mexico', 'Pampanga', 'Parian Barangay'),
  ('San Carlos', 'Mexico', 'Pampanga', 'San Carlos Barangay'),
  ('Santo Rosario', 'Mexico', 'Pampanga', 'Santo Rosario Barangay'),
  ('San Lorenzo', 'Mexico', 'Pampanga', 'San Lorenzo Barangay')
ON CONFLICT (name) DO NOTHING;

-- 6. Update existing drop-off centers with barangay assignments
UPDATE drop_off_centers 
SET barangay_id = (SELECT id FROM barangays WHERE name = 'Lagundi' LIMIT 1)
WHERE name LIKE '%Lagundi%';

UPDATE drop_off_centers 
SET barangay_id = (SELECT id FROM barangays WHERE name = 'Parian' LIMIT 1)
WHERE name LIKE '%Parian%';

UPDATE drop_off_centers 
SET barangay_id = (SELECT id FROM barangays WHERE name = 'San Carlos' LIMIT 1)
WHERE name LIKE '%San Carlos%';

UPDATE drop_off_centers 
SET barangay_id = (SELECT id FROM barangays WHERE name = 'Santo Rosario' LIMIT 1)
WHERE name LIKE '%Santo Rosario%' OR name LIKE '%Sto Rosario%' OR name LIKE '%Sto. Rosario%';

UPDATE drop_off_centers 
SET barangay_id = (SELECT id FROM barangays WHERE name = 'San Lorenzo' LIMIT 1)
WHERE name LIKE '%San Lorenzo%';

-- 7. Create function to auto-assign barangay to donation based on drop-off center
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

-- 8. Attach trigger to donations table
DROP TRIGGER IF EXISTS assign_barangay_trigger ON donations;
CREATE TRIGGER assign_barangay_trigger
  BEFORE INSERT OR UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION assign_barangay_to_donation();

-- 9. Create RLS policy for barangay-scoped admin access
-- Note: This requires is_admin column from migration 04

-- Policy: Admins can only view donations from their assigned barangay
DROP POLICY IF EXISTS "Barangay admins view own barangay donations" ON donations;
CREATE POLICY "Barangay admins view own barangay donations"
  ON donations
  FOR SELECT
  TO authenticated
  USING (
    -- Super admin can see all
    (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND is_admin = true 
      AND barangay_id IS NULL
    ))
    OR
    -- Barangay admin can only see their barangay
    (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND is_admin = true 
      AND barangay_id = donations.barangay_id
    ))
    OR
    -- Users can see their own donations
    (auth.uid() = user_id)
  );

-- Policy: Admins can only update donations from their assigned barangay
DROP POLICY IF EXISTS "Barangay admins update own barangay donations" ON donations;
CREATE POLICY "Barangay admins update own barangay donations"
  ON donations
  FOR UPDATE
  TO authenticated
  USING (
    -- Super admin can update all
    (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND is_admin = true 
      AND barangay_id IS NULL
    ))
    OR
    -- Barangay admin can only update their barangay
    (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND is_admin = true 
      AND barangay_id = donations.barangay_id
    ))
  )
  WITH CHECK (
    -- Same check for updates
    (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND is_admin = true 
      AND (barangay_id IS NULL OR barangay_id = donations.barangay_id)
    ))
  );

-- 10. Create helper function to get admin's barangay scope
CREATE OR REPLACE FUNCTION get_admin_barangay_id()
RETURNS UUID AS $$
BEGIN
  RETURN (
    SELECT barangay_id 
    FROM users 
    WHERE id = auth.uid() 
    AND is_admin = true
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 11. Create view for barangay-scoped statistics
CREATE OR REPLACE VIEW barangay_donation_stats AS
SELECT 
  b.id AS barangay_id,
  b.name AS barangay_name,
  b.municipality,
  COUNT(d.id) AS total_donations,
  COUNT(CASE WHEN d.status = 'pending' THEN 1 END) AS pending_donations,
  COUNT(CASE WHEN d.status = 'accepted' THEN 1 END) AS accepted_donations,
  COUNT(CASE WHEN d.status = 'rejected' THEN 1 END) AS rejected_donations,
  COALESCE(SUM(d.eco_points_earned), 0) AS total_eco_points,
  COALESCE(SUM(d.co2_saved), 0) AS total_co2_saved,
  COUNT(DISTINCT d.user_id) AS unique_donors
FROM barangays b
LEFT JOIN donations d ON d.barangay_id = b.id
GROUP BY b.id, b.name, b.municipality;

-- 12. Grant permissions
GRANT SELECT ON barangays TO authenticated;
GRANT SELECT ON barangay_donation_stats TO authenticated;

-- 13. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_barangay_id ON users(barangay_id);
CREATE INDEX IF NOT EXISTS idx_donations_barangay_id ON donations(barangay_id);
CREATE INDEX IF NOT EXISTS idx_drop_off_centers_barangay_id ON drop_off_centers(barangay_id);
CREATE INDEX IF NOT EXISTS idx_users_admin_barangay ON users(is_admin, barangay_id) WHERE is_admin = true;

-- 14. Add comments for documentation
COMMENT ON TABLE barangays IS 'Barangays in Pampanga for admin scope management';
COMMENT ON COLUMN users.barangay_id IS 'Assigned barangay for barangay-scoped admins. NULL for super admins.';
COMMENT ON COLUMN donations.barangay_id IS 'Barangay where donation was made, auto-assigned from drop-off center or user';
COMMENT ON FUNCTION get_admin_barangay_id() IS 'Returns the barangay_id of the current admin user, or NULL for super admins';
COMMENT ON VIEW barangay_donation_stats IS 'Statistics aggregated by barangay for admin dashboards';

-- =====================================================
-- VERIFICATION QUERIES (run these after migration)
-- =====================================================

-- Check barangays created (should show 5)
-- SELECT * FROM barangays ORDER BY name;

-- Check if columns added
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name IN ('users', 'donations', 'drop_off_centers') 
-- AND column_name = 'barangay_id';

-- Test barangay stats view
-- SELECT * FROM barangay_donation_stats;
