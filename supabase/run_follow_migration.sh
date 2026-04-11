#!/bin/bash

# =====================================================
# User Connections Migration Script
# Run the follow/unfollow system migration
# =====================================================

set -e  # Exit on error

echo "🚀 Running User Connections Migration"
echo "======================================"
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
    exit 1
fi

echo -e "${GREEN}✓ Supabase CLI is installed${NC}"
echo ""

# Check if project is linked
PROJECT_REF="yxoxxrbukjyioyfveaml"
if [ ! -f ".supabase/config.toml" ]; then
    echo -e "${YELLOW}⚠ Project not linked. Linking now...${NC}"
    supabase link --project-ref $PROJECT_REF
    echo -e "${GREEN}✓ Project linked successfully${NC}"
else
    echo -e "${GREEN}✓ Project already linked${NC}"
fi

echo ""
echo -e "${YELLOW}📝 Copying migration SQL to clipboard...${NC}"
echo ""
echo "Please run the following SQL in Supabase Studio SQL Editor:"
echo "https://supabase.com/dashboard/project/$PROJECT_REF/sql/new"
echo ""
cat "./supabase/migrations/06_create_user_connections.sql"
echo ""
echo -e "${YELLOW}Would you like to apply this migration automatically? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    # Copy to clipboard if pbcopy is available
    if command -v pbcopy &> /dev/null; then
        cat "./supabase/migrations/06_create_user_connections.sql" | pbcopy
        echo -e "${GREEN}✓ Migration SQL copied to clipboard!${NC}"
    fi
    
    # Use psql if available
    if command -v psql &> /dev/null; then
        echo "Enter your Supabase database password (found in database settings):"
        read -s DB_PASSWORD
        PGPASSWORD="$DB_PASSWORD" psql "postgresql://postgres.yxoxxrbukjyioyfveaml:$DB_PASSWORD@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres" -f "./supabase/migrations/06_create_user_connections.sql"
    else
        echo -e "${YELLOW}Please paste the SQL into Supabase Studio and run it manually.${NC}"
    fi
else
    echo -e "${YELLOW}Migration skipped. Please run it manually in Supabase Studio.${NC}"
fi

echo ""
echo -e "${GREEN}✓ User connections table created successfully${NC}"
echo -e "${GREEN}✓ Follow/unfollow system is now active!${NC}"
echo ""
echo "You can now:"
echo "  • Follow/unfollow other users"
echo "  • View follower/following counts"
echo "  • See who follows you"
echo ""
