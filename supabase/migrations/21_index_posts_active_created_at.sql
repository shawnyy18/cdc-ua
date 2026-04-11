-- Migration: 21_index_posts_active_created_at.sql
-- Adds an index to speed up queries that filter by is_active and order by created_at.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relname = 'idx_posts_active_created_at' AND n.nspname = 'public'
  ) THEN
    -- CONCURRENTLY cannot be run inside a transaction (DO block). Use a plain
    -- CREATE INDEX here so the migration runner (which may run inside a
    -- transaction) succeeds. If you prefer a non-locking index in production,
    -- run the CONCURRENTLY version manually in your DB outside of a transaction.
    EXECUTE 'CREATE INDEX idx_posts_active_created_at ON public.community_posts (is_active, created_at DESC)';
  END IF;
END$$;
