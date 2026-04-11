-- One-time cleanup: remove donations/recycle history for users without a department.
-- Safe flow:
-- 1) Run the PREVIEW queries first.
-- 2) If results look correct, run the EXECUTE block.
-- 3) Validate with the POST-CHECK queries.

-- =====================================================
-- PREVIEW ONLY (no data changed)
-- =====================================================

-- A) How many invalid donations exist?
SELECT COUNT(*) AS orphan_donation_count
FROM donations d
JOIN users u ON u.id = d.user_id
WHERE u.barangay_id IS NULL;

-- B) Which users are affected?
SELECT
  u.id AS user_id,
  u.email,
  u.full_name,
  COUNT(d.id) AS orphan_donation_count
FROM users u
JOIN donations d ON d.user_id = u.id
WHERE u.barangay_id IS NULL
GROUP BY u.id, u.email, u.full_name
ORDER BY orphan_donation_count DESC;

-- C) Sample rows to be removed
SELECT
  d.id,
  d.user_id,
  d.device_type,
  d.brand,
  d.model,
  d.condition,
  d.status,
  d.created_at
FROM donations d
JOIN users u ON u.id = d.user_id
WHERE u.barangay_id IS NULL
ORDER BY d.created_at DESC
LIMIT 50;


-- =====================================================
-- EXECUTE CLEANUP (makes changes)
-- =====================================================
-- Uncomment and run this section when ready.

BEGIN;

-- Backup table keeps deleted records for recovery/audit.
CREATE TABLE IF NOT EXISTS donations_orphan_cleanup_backup (
  LIKE donations INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES
);

ALTER TABLE donations_orphan_cleanup_backup
  ADD COLUMN IF NOT EXISTS cleanup_reason TEXT,
  ADD COLUMN IF NOT EXISTS backed_up_at TIMESTAMPTZ DEFAULT NOW();

-- Track users that will be affected so we can recalculate per-user counters.
CREATE TEMP TABLE _affected_users AS
SELECT DISTINCT d.user_id
FROM donations d
JOIN users u ON u.id = d.user_id
WHERE u.barangay_id IS NULL;

-- Backup orphan donations before deletion.
INSERT INTO donations_orphan_cleanup_backup
SELECT d.*, 'user has no designated department (barangay_id is NULL)'::TEXT AS cleanup_reason, NOW() AS backed_up_at
FROM donations d
JOIN users u ON u.id = d.user_id
WHERE u.barangay_id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Delete orphan donations.
DELETE FROM donations d
USING users u
WHERE d.user_id = u.id
  AND u.barangay_id IS NULL;

-- Recalculate counters for affected users only.
WITH recalculated AS (
  SELECT
    au.user_id,
    COUNT(d.id) FILTER (WHERE LOWER(COALESCE(d.condition, '')) = 'working')::INT AS donated_devices,
    COUNT(d.id) FILTER (WHERE LOWER(COALESCE(d.condition, '')) <> 'working')::INT AS recycled_devices
  FROM _affected_users au
  LEFT JOIN donations d ON d.user_id = au.user_id
  GROUP BY au.user_id
)
UPDATE users u
SET
  donated_devices = COALESCE(r.donated_devices, 0),
  recycled_devices = COALESCE(r.recycled_devices, 0),
  updated_at = NOW()
FROM recalculated r
WHERE u.id = r.user_id;

COMMIT;


-- =====================================================
-- POST-CHECK (after execute)
-- =====================================================

-- Should be 0
SELECT COUNT(*) AS remaining_orphan_donations
FROM donations d
JOIN users u ON u.id = d.user_id
WHERE u.barangay_id IS NULL;

-- Backup confirmation
SELECT COUNT(*) AS backed_up_rows
FROM donations_orphan_cleanup_backup;
