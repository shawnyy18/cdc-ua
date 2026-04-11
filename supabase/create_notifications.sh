#!/bin/bash

# Create notifications table in Supabase
echo "Creating notifications table..."

# Read from environment; do NOT hardcode secrets
SUPABASE_URL="${SUPABASE_URL}"
SERVICE_ROLE_KEY="${SERVICE_ROLE_KEY}"

if [[ -z "$SUPABASE_URL" || -z "$SERVICE_ROLE_KEY" ]]; then
  echo "Error: SUPABASE_URL and SERVICE_ROLE_KEY must be set in the environment." >&2
  echo "Usage: export SUPABASE_URL=... SERVICE_ROLE_KEY=... && ./create_notifications.sh" >&2
  exit 1
fi

SQL=$(cat <<'EOF'
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  content TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_recipient ON public.notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON public.notifications(is_read);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own notifications" ON public.notifications;
CREATE POLICY "Users can view own notifications" 
  ON public.notifications FOR SELECT 
  USING (recipient_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own notifications" ON public.notifications;
CREATE POLICY "Users can update own notifications" 
  ON public.notifications FOR UPDATE 
  USING (recipient_id = auth.uid());

DROP POLICY IF EXISTS "Service role can insert notifications" ON public.notifications;
CREATE POLICY "Service role can insert notifications" 
  ON public.notifications FOR INSERT 
  WITH CHECK (auth.role() = 'service_role');
EOF
)

curl -X POST "$SUPABASE_URL/rest/v1/rpc/exec" \
  -H "apikey: $SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d "{\"sql\": $(echo "$SQL" | jq -Rs .)}"

echo ""
echo "Done!"
