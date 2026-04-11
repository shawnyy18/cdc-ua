-- Allow hazardous/consumable submissions to bypass standard condition checks.
-- This keeps backward compatibility for working/broken/damaged while allowing NULL or N/A.

ALTER TABLE donations
  ALTER COLUMN condition DROP NOT NULL;

DO $$
DECLARE
  constraint_name text;
BEGIN
  FOR constraint_name IN
    SELECT c.conname
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = t.relnamespace
    WHERE t.relname = 'donations'
      AND n.nspname = 'public'
      AND c.contype = 'c'
      AND pg_get_constraintdef(c.oid) ILIKE '%condition%'
  LOOP
    EXECUTE format('ALTER TABLE donations DROP CONSTRAINT IF EXISTS %I;', constraint_name);
  END LOOP;
END $$;

ALTER TABLE donations
  ADD CONSTRAINT donations_condition_check
  CHECK (
    condition IS NULL
    OR condition IN ('working', 'broken', 'damaged', 'n/a', 'consumable')
  );
