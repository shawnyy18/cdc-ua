-- ============================================================
-- EcoKonek: Search & Filter Performance Indexes
-- Run this in the Supabase SQL Editor (Dashboard > SQL Editor)
-- ============================================================

-- Index on property_number for fast lookups
CREATE INDEX IF NOT EXISTS idx_donations_property_number
ON donations(property_number);

-- Index on serial_number for fast lookups
CREATE INDEX IF NOT EXISTS idx_donations_serial_number
ON donations(serial_number);

-- Index on status for fast filtering (may already exist)
CREATE INDEX IF NOT EXISTS idx_donations_status
ON donations(status);

-- Index on is_cdc_asset for fast CDC asset queries
CREATE INDEX IF NOT EXISTS idx_donations_is_cdc_asset
ON donations(is_cdc_asset);

-- Composite index for the most common admin query pattern:
-- filtering CDC assets by status, ordered by date
CREATE INDEX IF NOT EXISTS idx_donations_cdc_status_date
ON donations(is_cdc_asset, status, created_at DESC)
WHERE is_cdc_asset = true;

-- ============================================================
-- These indexes improve performance for:
--   - Admin dashboard status card filtering
--   - Search bar queries on property/serial numbers
--   - CDC Asset Registry table loading
-- ============================================================
