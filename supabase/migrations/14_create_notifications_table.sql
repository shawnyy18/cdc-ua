-- Migration: 14_create_notifications_table.sql
-- Creates notifications table and RLS policies

-- Ensure pgcrypto is available for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Notifications table
-- Notifications table (schema aligned with notificationService.ts)
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL,
  sender_id UUID,
  type TEXT NOT NULL,
  content TEXT,
  link TEXT,
  aggregation_key TEXT,
  latest_actors JSONB,
  count INTEGER NOT NULL DEFAULT 1,
  post_id UUID,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT notifications_fk_recipient FOREIGN KEY (recipient_id) REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT notifications_fk_sender FOREIGN KEY (sender_id) REFERENCES public.users(id) ON DELETE SET NULL,
  CONSTRAINT notifications_fk_post FOREIGN KEY (post_id) REFERENCES public.community_posts(id) ON DELETE CASCADE
);

COMMENT ON TABLE public.notifications IS 'User notifications: recipient_id, sender_id, type, content, optional post_id, aggregation support (aggregation_key, latest_actors, count), read flag and timestamps.';

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_created_at ON public.notifications (recipient_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_read ON public.notifications (recipient_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_aggregation_key ON public.notifications (aggregation_key);

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policy: allow a user to SELECT only notifications where they are the recipient
CREATE POLICY notifications_select_by_recipient
  ON public.notifications
  FOR SELECT
  TO authenticated
  USING (recipient_id = auth.uid());

-- Policy: allow server / service role to INSERT (do not grant insert to 'authenticated');
-- If you need authenticated clients to insert notifications, add a restricted WITH CHECK policy.

-- Policy: allow recipient to UPDATE their own notifications (e.g., mark as read)
CREATE POLICY notifications_update_by_recipient
  ON public.notifications
  FOR UPDATE
  TO authenticated
  USING (recipient_id = auth.uid())
  WITH CHECK (recipient_id = auth.uid());

-- Policy: allow recipient to DELETE their own notifications
CREATE POLICY notifications_delete_by_recipient
  ON public.notifications
  FOR DELETE
  TO authenticated
  USING (recipient_id = auth.uid());

-- Grant SELECT, UPDATE, DELETE to authenticated (RLS will still restrict rows)
GRANT SELECT, UPDATE, DELETE ON TABLE public.notifications TO authenticated;
