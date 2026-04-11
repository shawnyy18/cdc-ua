-- Migration: 12_create_follows_table.sql
-- Creates the `follows` table and RLS policies

-- Ensure pgcrypto is available for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create follows table
CREATE TABLE IF NOT EXISTS public.follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL,
  following_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT follows_unique_follower_following UNIQUE (follower_id, following_id),
  CONSTRAINT follows_fk_follower FOREIGN KEY (follower_id) REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT follows_fk_following FOREIGN KEY (following_id) REFERENCES public.users(id) ON DELETE CASCADE
);

COMMENT ON TABLE public.follows IS 'Follow relationships: follower_id follows following_id';

-- Enable Row Level Security
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

-- Policy: allow authenticated users to SELECT all follow relationships
CREATE POLICY follows_allow_select_authenticated
  ON public.follows
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy: allow an authenticated user to INSERT only when follower_id = auth.uid()
-- and prevent self-follow (follower_id <> following_id)
CREATE POLICY follows_insert_by_follower
  ON public.follows
  FOR INSERT
  TO authenticated
  WITH CHECK (
    follower_id = auth.uid()
    AND follower_id IS NOT NULL
    AND following_id IS NOT NULL
    AND follower_id <> following_id
  );

-- Policy: allow an authenticated user to DELETE only their own follow rows
CREATE POLICY follows_delete_by_follower
  ON public.follows
  FOR DELETE
  TO authenticated
  USING (follower_id = auth.uid());

-- Grant basic privileges to authenticated role
GRANT SELECT, INSERT, DELETE ON TABLE public.follows TO authenticated;

-- Note: If your project uses a `profiles` table instead of `users`,
-- change the FK references to public.profiles(id) accordingly.
