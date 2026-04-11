-- Use schema-qualified names for clarity
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  link TEXT,
  aggregation_key TEXT,
  count INTEGER NOT NULL DEFAULT 1,
  latest_actors JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure new aggregation columns exist on already-created tables
ALTER TABLE public.notifications
  ADD COLUMN IF NOT EXISTS aggregation_key TEXT;
ALTER TABLE public.notifications
  ADD COLUMN IF NOT EXISTS count INTEGER NOT NULL DEFAULT 1;
ALTER TABLE public.notifications
  ADD COLUMN IF NOT EXISTS latest_actors JSONB NOT NULL DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON public.notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_agg ON public.notifications(recipient_id, type, aggregation_key) WHERE aggregation_key IS NOT NULL;

-- Enable RLS
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Policy: Users can read their own notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
CREATE POLICY "Users can view own notifications"
  ON public.notifications
  FOR SELECT
  USING (recipient_id = auth.uid());

-- Policy: Users can update their own notifications (mark as read)
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications"
  ON public.notifications
  FOR UPDATE
  USING (recipient_id = auth.uid());

-- Policy: System can insert notifications (service role only)
DROP POLICY IF EXISTS "Service role can insert notifications" ON public.notifications;
CREATE POLICY "Service role can insert notifications"
  ON public.notifications
  FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
