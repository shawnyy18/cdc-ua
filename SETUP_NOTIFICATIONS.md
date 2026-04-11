# NOTIFICATIONS TABLE SETUP

## Problem

The `notifications` table does not exist in your Supabase database, causing 500 errors.

## Solution

Run this SQL in your Supabase SQL Editor:

### Step 1: Go to Supabase Dashboard

1. Open https://supabase.com/dashboard/project/yxoxxrbukjyioyfveaml
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"

### Step 2: Run This SQL

```sql
-- Create notifications table
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON public.notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_agg ON public.notifications(recipient_id, type, aggregation_key) WHERE aggregation_key IS NOT NULL;

-- Enable Row Level Security
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Service role can insert notifications" ON public.notifications;

-- Create RLS policies
CREATE POLICY "Users can view own notifications"
  ON public.notifications FOR SELECT
  USING (recipient_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON public.notifications FOR UPDATE
  USING (recipient_id = auth.uid());

CREATE POLICY "Service role can insert notifications"
  ON public.notifications FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
```

### Step 3: Click "RUN" button

### Step 4: Verify

After running the SQL, refresh your app and the notification system should work without errors.

## Expected Result

- ✅ Table `notifications` created
- ✅ Indexes created for fast queries
- ✅ RLS policies enable secure access
- ✅ No more "Could not find the table" errors
