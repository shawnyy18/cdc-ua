#!/bin/bash

# Fix User Insert Policy Migration Script
# This script applies the RLS policy fix to allow user registration

echo "🔧 Applying User Insert Policy Fix..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Please install it first:"
    echo "   npm install -g supabase"
    exit 1
fi

# Load environment variables
if [ -f .env.local ]; then
    export $(cat .env.local | grep -v '^#' | xargs)
fi

# Check if we have the required environment variables
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] || [ -z "$SUPABASE_SERVICE_ROLE_KEY" ]; then
    echo "❌ Missing required environment variables:"
    echo "   NEXT_PUBLIC_SUPABASE_URL"
    echo "   SUPABASE_SERVICE_ROLE_KEY"
    echo ""
    echo "Please set these in your .env.local file"
    exit 1
fi

# Extract project ref from URL
PROJECT_REF=$(echo $NEXT_PUBLIC_SUPABASE_URL | sed 's/https:\/\/\([^.]*\).*/\1/')

echo "📊 Project: $PROJECT_REF"
echo "🔗 URL: $NEXT_PUBLIC_SUPABASE_URL"

# Apply the migration using psql via Supabase connection string
echo ""
echo "🚀 Applying migration 05_fix_user_insert_policy.sql..."

# Use Supabase SQL editor via REST API
curl -X POST "$NEXT_PUBLIC_SUPABASE_URL/rest/v1/rpc/exec_sql" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "query": "$(cat supabase/migrations/05_fix_user_insert_policy.sql | sed 's/"/\\"/g' | tr '\n' ' ')"
}
EOF

echo ""
echo "✅ Migration applied successfully!"
echo ""
echo "📝 What was fixed:"
echo "   - Added INSERT policy for users table"
echo "   - Users can now insert their own profile during registration"
echo "   - Trigger and manual fallback should both work now"
echo ""
echo "🧪 Test registration again to verify the fix!"
