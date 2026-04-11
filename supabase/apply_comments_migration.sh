#!/bin/bash

echo "🚀 Applying Community Comments Migration..."
echo ""
echo "This migration adds:"
echo "  ✅ post_comments table with RLS policies"
echo "  ✅ Performance indexes for queries"
echo "  ✅ Automatic comment count triggers"
echo ""

# Read migration file
MIGRATION_FILE="supabase/migrations/08_community_optimization.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
    echo "❌ Error: Migration file not found at $MIGRATION_FILE"
    exit 1
fi

echo "📄 Migration file found: $MIGRATION_FILE"
echo ""
echo "To apply this migration, you have two options:"
echo ""
echo "Option 1: Via Supabase Dashboard (Recommended)"
echo "  1. Go to your Supabase project dashboard"
echo "  2. Navigate to SQL Editor"
echo "  3. Click 'New Query'"
echo "  4. Copy and paste the contents of $MIGRATION_FILE"
echo "  5. Click 'Run'"
echo ""
echo "Option 2: Via Supabase CLI"
echo "  Run: supabase db push"
echo ""
echo "After applying, the comments feature will work!"
echo ""

# Optionally, show the migration content
read -p "Would you like to see the migration SQL? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "--- Migration SQL ---"
    cat "$MIGRATION_FILE"
    echo ""
    echo "--- End of Migration ---"
fi

echo ""
echo "✨ Ready to go! Apply the migration using one of the methods above."
