-- =====================================================
-- Migration 37: New Corporate IT Disposition Workflow
-- Replaces old statuses: pending, accepted, rejected, processing, completed
-- New lifecycle: pending_evaluation, reallocated, donated, disposed, voided
-- =====================================================

-- 1. Drop the old CHECK constraint on donations.status
ALTER TABLE donations DROP CONSTRAINT IF EXISTS donations_status_check;

-- 2. Migrate existing data to new status values
UPDATE donations SET status = 'pending_evaluation' WHERE status = 'pending';
UPDATE donations SET status = 'reallocated' WHERE status IN ('accepted', 'approved', 'processing', 'completed');
UPDATE donations SET status = 'voided' WHERE status = 'rejected';

-- 3. Add new CHECK constraint with corporate disposition statuses
ALTER TABLE donations ADD CONSTRAINT donations_status_check
  CHECK (status IN ('pending_evaluation', 'reallocated', 'donated', 'disposed', 'voided'));

-- 4. Set default to 'pending_evaluation'
ALTER TABLE donations ALTER COLUMN status SET DEFAULT 'pending_evaluation';

-- 5. Add disposition metadata columns
ALTER TABLE donations ADD COLUMN IF NOT EXISTS disposition_type VARCHAR(30);
ALTER TABLE donations ADD COLUMN IF NOT EXISTS disposition_notes TEXT;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS evaluated_by UUID REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE donations ADD COLUMN IF NOT EXISTS evaluated_at TIMESTAMP WITH TIME ZONE;

-- 6. Add CHECK on disposition_type
ALTER TABLE donations DROP CONSTRAINT IF EXISTS chk_disposition_type;
ALTER TABLE donations ADD CONSTRAINT chk_disposition_type
  CHECK (disposition_type IS NULL OR disposition_type IN ('reallocate', 'donate', 'dispose', 'void'));
