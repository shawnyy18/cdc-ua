#!/bin/bash
# Run community optimization migration

set -e

echo "🚀 Running Community Optimization Migration..."
echo ""

# Load environment variables
if [ -f .env.local ]; then
  export $(cat .env.local | grep -v '^#' | xargs)
fi

# Construct SQL command
SQL_FILE="supabase/migrations/08_community_optimization.sql"

if [ ! -f "$SQL_FILE" ]; then
  echo "❌ Migration file not found: $SQL_FILE"
  exit 1
fi

echo "📄 Executing: $SQL_FILE"

# Use psql if available, otherwise provide manual instructions
if command -v psql &> /dev/null; then
  PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -U postgres -d postgres -p "$DB_PORT" -f "$SQL_FILE"
  echo "✅ Migration completed successfully!"
else
  echo "⚠️  psql not found. Please run this SQL manually in Supabase Dashboard:"
  echo ""
  echo "1. Go to: https://supabase.com/dashboard/project/YOUR_PROJECT/sql/new"
  echo "2. Paste the contents of: $SQL_FILE"
  echo "3. Click 'Run'"
  echo ""
  echo "Or use the Supabase SQL Editor API:"
  cat "$SQL_FILE"
fi
