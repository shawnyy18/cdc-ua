-- =====================================================
-- ADD CDC (Clark Development Corporation) ASSET FIELDS
-- Adds corporate asset tracking to donations table
-- =====================================================

-- Add CDC asset fields to donations table
ALTER TABLE donations
  ADD COLUMN IF NOT EXISTS is_cdc_asset BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS property_number VARCHAR(100),
  ADD COLUMN IF NOT EXISTS serial_number VARCHAR(100);

-- Add a CHECK constraint: when is_cdc_asset is true,
-- property_number and serial_number must not be null
ALTER TABLE donations
  ADD CONSTRAINT chk_cdc_asset_fields
  CHECK (
    is_cdc_asset = false
    OR (
      is_cdc_asset = true
      AND property_number IS NOT NULL
      AND property_number <> ''
      AND serial_number IS NOT NULL
      AND serial_number <> ''
    )
  );

-- Index for quick lookup of CDC assets
CREATE INDEX IF NOT EXISTS idx_donations_cdc_asset
  ON donations (is_cdc_asset)
  WHERE is_cdc_asset = true;

COMMENT ON COLUMN donations.is_cdc_asset IS 'Whether this donation is a Clark Development Corporation (CDC) corporate asset';
COMMENT ON COLUMN donations.property_number IS 'CDC property number (required when is_cdc_asset is true)';
COMMENT ON COLUMN donations.serial_number IS 'CDC serial number (required when is_cdc_asset is true)';
