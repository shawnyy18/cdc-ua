#!/bin/bash

# =====================================================
# Apply User Deletion Fix
# This script applies the user deletion fix to your Supabase database
# =====================================================

echo "=============================================="
echo "APPLYING USER DELETION FIX"
echo "=============================================="
echo ""

# Check if we're in the right directory
if [ ! -f "supabase/migrations/fix_user_deletion.sql" ]; then
    echo "❌ Error: Cannot find fix_user_deletion.sql"
    echo "Please run this script from the project root directory"
    exit 1
fi

echo "📋 Migration file found: supabase/migrations/fix_user_deletion.sql"
echo ""

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "⚠️  Supabase CLI not found. You have two options:"
    echo ""
    echo "Option 1: Install Supabase CLI and run:"
    echo "  supabase db push"
    echo ""
    echo "Option 2: Apply manually via Supabase Dashboard:"
    echo "  1. Go to https://app.supabase.com"
    echo "  2. Select your project"
    echo "  3. Go to SQL Editor"
    echo "  4. Copy and paste the contents of: supabase/migrations/fix_user_deletion.sql"
    echo "  5. Click 'Run'"
    echo ""
    echo "Opening the migration file for you to copy..."
    open supabase/migrations/fix_user_deletion.sql 2>/dev/null || cat supabase/migrations/fix_user_deletion.sql
    exit 0
fi

echo "✅ Supabase CLI detected"
echo ""
echo "Applying migration..."
echo ""

# Apply the migration
supabase db push

if [ $? -eq 0 ]; then
    echo ""
    echo "=============================================="
    echo "✅ USER DELETION FIX APPLIED SUCCESSFULLY!"
    echo "=============================================="
    echo ""
    echo "Next steps:"
    echo "1. Test user deletion in Supabase Dashboard"
    echo "2. Test user deletion via your admin interface"
    echo "3. Verify cascade deletes work properly"
    echo ""
    echo "For more details, see: USER_DELETION_FIX.md"
else
    echo ""
    echo "=============================================="
    echo "❌ MIGRATION FAILED"
    echo "=============================================="
    echo ""
    echo "Options:"
    echo "1. Check your Supabase connection: 'supabase status'"
    echo "2. Apply manually via Supabase Dashboard (see above)"
    echo "3. Check the error message above for details"
    echo ""
    exit 1
fi
