#!/bin/bash

# System Health Check Script
# Run this to verify backend and frontend health

echo "🏥 EcoKonek System Health Check"
echo "================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if development server is running
echo "📡 Checking development server..."
if curl -s http://localhost:3000 > /dev/null; then
    echo -e "${GREEN}✓${NC} Development server is running on port 3000"
else
    echo -e "${RED}✗${NC} Development server is not running"
    echo "   Run: npm run dev"
    exit 1
fi

echo ""

# Check health endpoint
echo "🔍 Checking backend health..."
HEALTH_RESPONSE=$(curl -s http://localhost:3000/api/health)

# Extract status using a more robust method
if echo "$HEALTH_RESPONSE" | grep -q '"status":"healthy"'; then
    HEALTH_STATUS="healthy"
elif echo "$HEALTH_RESPONSE" | grep -q '"status":"degraded"'; then
    HEALTH_STATUS="degraded"
else
    HEALTH_STATUS="unhealthy"
fi

if [ "$HEALTH_STATUS" = "healthy" ]; then
    echo -e "${GREEN}✓${NC} Backend is healthy"
elif [ "$HEALTH_STATUS" = "degraded" ]; then
    echo -e "${YELLOW}⚠${NC} Backend is degraded"
    echo "   Check logs for details"
else
    echo -e "${RED}✗${NC} Backend is unhealthy"
fi

# Parse service statuses more reliably
if echo "$HEALTH_RESPONSE" | grep -q '"database":{"status":"up"'; then
    DB_STATUS="up"
else
    DB_STATUS="down"
fi

if echo "$HEALTH_RESPONSE" | grep -q '"authentication":{"status":"up"'; then
    AUTH_STATUS="up"
else
    AUTH_STATUS="down"
fi

if echo "$HEALTH_RESPONSE" | grep -q '"realtime":{"status":"up"'; then
    REALTIME_STATUS="up"
else
    REALTIME_STATUS="down"
fi

echo ""
echo "📊 Service Status:"
echo "  Database:       $([ "$DB_STATUS" = "up" ] && echo -e "${GREEN}UP${NC}" || echo -e "${RED}DOWN${NC}")"
echo "  Authentication: $([ "$AUTH_STATUS" = "up" ] && echo -e "${GREEN}UP${NC}" || echo -e "${RED}DOWN${NC}")"
echo "  Realtime:       $([ "$REALTIME_STATUS" = "up" ] && echo -e "${GREEN}UP${NC}" || echo -e "${RED}DOWN${NC}")"

echo ""

# Check Socket.IO endpoint
echo "🔌 Checking Socket.IO..."
if curl -s http://localhost:3000/api/socket > /dev/null; then
    echo -e "${GREEN}✓${NC} Socket.IO endpoint is accessible"
else
    echo -e "${RED}✗${NC} Socket.IO endpoint is not accessible"
fi

echo ""

## Check environment variables across .env.local and .env
echo "🔐 Checking environment configuration..."

has_env_local=false
has_env=false
[ -f .env.local ] && has_env_local=true
[ -f .env ] && has_env=true

if [ "$has_env_local" = true ]; then
    echo -e "${GREEN}✓${NC} .env.local file exists"
else
    echo -e "${YELLOW}⚠${NC} .env.local not found (optional)"
fi

if [ "$has_env" = true ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
else
    echo -e "${RED}✗${NC} .env not found"
fi

check_var() {
    VAR_NAME=$1
    FOUND=false
    if [ "$has_env_local" = true ] && grep -q "^$VAR_NAME=" .env.local 2>/dev/null; then
        FOUND=true
    fi
    if [ "$FOUND" = false ] && [ "$has_env" = true ] && grep -q "^$VAR_NAME=" .env 2>/dev/null; then
        FOUND=true
    fi
    if [ "$FOUND" = true ]; then
        echo -e "${GREEN}✓${NC} $VAR_NAME is set"
    else
        echo -e "${RED}✗${NC} $VAR_NAME is missing"
    fi
}

check_var "NEXT_PUBLIC_SUPABASE_URL"
check_var "NEXT_PUBLIC_SUPABASE_ANON_KEY"
check_var "SUPABASE_SERVICE_ROLE_KEY"

echo ""

# Check for common errors in logs
echo "📋 Checking for recent errors..."
LOG_FILE=".next/build.log"
if [ -f "$LOG_FILE" ]; then
    ERROR_COUNT=$(grep -c "ERROR" $LOG_FILE 2>/dev/null || echo "0")
    if [ "$ERROR_COUNT" -gt 0 ]; then
        echo -e "${YELLOW}⚠${NC} Found $ERROR_COUNT errors in build log"
    else
        echo -e "${GREEN}✓${NC} No errors in build log"
    fi
else
    echo -e "${YELLOW}⚠${NC} Build log not found"
fi

echo ""
echo "================================"
echo "Health check complete!"
echo ""

# Summary
if [ "$HEALTH_STATUS" = "healthy" ] && [ "$DB_STATUS" = "up" ] && [ "$AUTH_STATUS" = "up" ]; then
    echo -e "${GREEN}✓ System is operational${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠ System has issues - check details above${NC}"
    exit 1
fi
