-- Safe script to back up and drop the marketplace_items table
-- WARNING: This is destructive. Make sure you have a backup before running.

-- 1) Create a backup copy of the table (schema + data)
CREATE TABLE IF NOT EXISTS public.marketplace_items_backup AS
  TABLE public.marketplace_items;

-- 2) Create a CSV dump (optional) - for psql clients one can run:
-- \copy (SELECT * FROM public.marketplace_items) TO '/tmp/marketplace_items_backup.csv' WITH CSV HEADER;

-- 3) Check for dependent objects (foreign keys referencing marketplace_items)
-- Postgres-compatible query that finds foreign key constraints referencing marketplace_items
SELECT
  con.conname AS constraint_name,
  cl.relname AS referencing_table,
  att.attname AS referencing_column
FROM pg_constraint con
JOIN pg_class cl ON con.conrelid = cl.oid
JOIN pg_attribute att ON att.attrelid = con.conrelid AND att.attnum = ANY(con.conkey)
JOIN pg_class refcl ON con.confrelid = refcl.oid
WHERE con.contype = 'f'
  AND refcl.relname = 'marketplace_items';

-- 4) If you're satisfied with the backup and have removed/handled dependencies, drop the table
DROP TABLE IF EXISTS public.marketplace_items CASCADE;

-- 5) Optionally remove seller_profiles if you also want to remove the sellers feature
-- DROP TABLE IF EXISTS public.seller_profiles CASCADE;

-- 6) ANALYZE to refresh planner stats
ANALYZE public.users;

-- Notes:
-- - The first step creates a backup table in the database so you can access/restore rows if needed.
-- - The SELECT that lists referencing foreign keys helps you identify other tables you must update first.
-- - When ready, use the DROP TABLE statement. CASCADE will remove dependents automatically; use with care.
