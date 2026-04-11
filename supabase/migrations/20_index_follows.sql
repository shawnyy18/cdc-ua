-- Migration: 20_index_follows.sql
-- Adds an index to accelerate lookups for "does user A follow user B" used by feed RPC.

-- NOTE: CREATE INDEX CONCURRENTLY is preferred in production to avoid locking, but
-- some migration runners wrap statements in transactions which prevent CONCURRENTLY.
-- If your migration runner doesn't support CONCURRENTLY, remove the CONCURRENTLY keyword.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE c.relname = 'idx_follows_follower_following' AND n.nspname = 'public'
  ) THEN
    -- CONCURRENTLY cannot be run inside a transaction (DO block). Use a plain
    -- CREATE INDEX here so the migration runner (which may run inside a
    -- transaction) succeeds. If you prefer a non-locking index in production,
    -- run the CONCURRENTLY version manually in your DB outside of a transaction.
    EXECUTE 'CREATE INDEX idx_follows_follower_following ON public.follows (follower_id, following_id)';
  END IF;
END$$;
