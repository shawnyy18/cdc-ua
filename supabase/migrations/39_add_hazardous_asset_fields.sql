-- =====================================================
-- ADD HAZARDOUS WASTE & CONSUMABLES PROCESSING
-- Extends donations table to support hazardous item
-- tracking and automatic disposal routing
-- =====================================================

-- Step 1: Add device_category column to distinguish hazardous items from standard devices
ALTER TABLE donations
  ADD COLUMN IF NOT EXISTS device_category VARCHAR(50) DEFAULT 'standard' 
    CHECK (device_category IN ('standard', 'hazardous-consumables'));

-- Step 2: Add hazardous-specific metadata columns
ALTER TABLE donations
  ADD COLUMN IF NOT EXISTS hazard_type VARCHAR(100),
  ADD COLUMN IF NOT EXISTS quantity_weight VARCHAR(100),
  ADD COLUMN IF NOT EXISTS hazard_description TEXT;

-- Step 3: Add flag to lock hazardous items to disposal-only workflow
ALTER TABLE donations
  ADD COLUMN IF NOT EXISTS is_hazardous_locked BOOLEAN NOT NULL DEFAULT false;

-- Step 4: Constraint to ensure hazardous items have required fields
ALTER TABLE donations
  ADD CONSTRAINT chk_hazardous_asset_fields
  CHECK (
    device_category != 'hazardous-consumables'
    OR (
      device_category = 'hazardous-consumables'
      AND hazard_type IS NOT NULL
      AND hazard_type <> ''
      AND quantity_weight IS NOT NULL
      AND quantity_weight <> ''
      AND is_cdc_asset = true
      AND property_number IS NOT NULL
      AND serial_number IS NOT NULL
    )
  );

-- Step 5: Create index for fast hazardous item lookups in admin dashboard
CREATE INDEX IF NOT EXISTS idx_donations_hazardous_category
  ON donations (device_category)
  WHERE device_category = 'hazardous-consumables';

CREATE INDEX IF NOT EXISTS idx_donations_hazardous_locked
  ON donations (is_hazardous_locked)
  WHERE is_hazardous_locked = true;

-- Step 6: Add comments for documentation
COMMENT ON COLUMN donations.device_category IS 'Category of device: standard (laptop, phone, etc.) or hazardous-consumables (batteries, ink, bulbs, e-waste)';
COMMENT ON COLUMN donations.hazard_type IS 'Type of hazard (e.g., Ink/Toner, Batteries, Bulbs, E-waste scrap) - required for hazardous items';
COMMENT ON COLUMN donations.quantity_weight IS 'Quantity or weight of hazardous item (e.g., 5 cartridges, 2.3 kg)';
COMMENT ON COLUMN donations.hazard_description IS 'Detailed description of hazardous state (e.g., swollen battery, leaking toner)';
COMMENT ON COLUMN donations.is_hazardous_locked IS 'Flag to lock hazardous items to disposal-only workflow in admin dashboard';

-- Step 7: Auto-set conditions for any existing hazardous entries (if any)
-- This ensures backward compatibility
UPDATE donations
SET condition = 'n/a'
WHERE device_category = 'hazardous-consumables' AND condition IS NULL;

-- Step 8: Ensure hazardous items are automatically locked to disposal
UPDATE donations
SET is_hazardous_locked = true, disposition_type = 'dispose'
WHERE device_category = 'hazardous-consumables';
