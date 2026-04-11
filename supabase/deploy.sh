#!/bin/bash

# =====================================================
# EcoKonek Database Deployment Script
# Automated deployment to Supabase
# =====================================================

set -e  # Exit on error

echo "🚀 EcoKonek Database Deployment"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo -e "${RED}❌ Supabase CLI is not installed${NC}"
    echo "Install it with: npm install -g supabase"
    echo "Or visit: https://supabase.com/docs/guides/cli"
    exit 1
fi

echo -e "${GREEN}✓ Supabase CLI is installed${NC}"
echo ""

# Check if project is linked
PROJECT_REF="yxoxxrbukjyioyfveaml"
echo "Checking Supabase project connection..."

if [ ! -f ".supabase/config.toml" ]; then
    echo -e "${YELLOW}⚠ Project not linked. Linking now...${NC}"
    supabase link --project-ref $PROJECT_REF
    echo -e "${GREEN}✓ Project linked successfully${NC}"
else
    echo -e "${GREEN}✓ Project already linked${NC}"
fi

echo ""
echo "================================"
echo "Running Database Migrations"
echo "================================"
echo ""

# Run migrations in order
MIGRATION_DIR="./supabase/migrations"

echo -e "${YELLOW}📝 Running: 01_create_tables.sql${NC}"
supabase db execute -f "$MIGRATION_DIR/01_create_tables.sql"
echo -e "${GREEN}✓ Tables created successfully${NC}"
echo ""

echo -e "${YELLOW}📝 Running: 02_row_level_security.sql${NC}"
supabase db execute -f "$MIGRATION_DIR/02_row_level_security.sql"
echo -e "${GREEN}✓ RLS policies applied successfully${NC}"
echo ""

echo -e "${YELLOW}📝 Running: 03_functions_triggers.sql${NC}"
supabase db execute -f "$MIGRATION_DIR/03_functions_triggers.sql"
echo -e "${GREEN}✓ Functions and triggers created successfully${NC}"
echo ""

# Verify deployment
echo "================================"
echo "Verifying Deployment"
echo "================================"
echo ""

echo "Checking tables..."
supabase db execute -c "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name;"
echo ""

echo "Checking functions..."
supabase db execute -c "SELECT proname FROM pg_proc WHERE pronamespace = 'public'::regnamespace AND prokind = 'f' ORDER BY proname;"
echo ""

echo -e "${GREEN}================================${NC}"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo -e "${GREEN}================================${NC}"
echo ""
echo "Next steps:"
echo "1. Set up storage buckets in Supabase dashboard (optional)"
echo "2. Configure email templates (optional)"
echo "3. Enable social auth providers (optional)"
echo "4. Test your application"
echo ""
echo "View your database: https://app.supabase.com/project/$PROJECT_REF/editor"
echo ""
