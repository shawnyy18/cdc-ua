#!/bin/bash

# Export env vars from .env and .env.local so the banner can display values like NEXT_PUBLIC_AUTH_REDIRECT_BASE
set -a
[ -f .env ] && . ./.env
[ -f .env.local ] && . ./.env.local
set +a

# Get the actual LAN IP
LAN_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -1)

# Start Next.js dev server in background
npm run dev-base &
DEV_PID=$!

# Wait a moment for server to start
sleep 2

# Clear and show custom message
clear
echo ""
echo "🚀 Development Server Running"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  📱 Local:        http://localhost:3000"
echo "  🌐 Network:      http://${LAN_IP}:3000"
if [ -n "$NEXT_PUBLIC_AUTH_REDIRECT_BASE" ]; then
	echo "  🔐 OAuth Base:   $NEXT_PUBLIC_AUTH_REDIRECT_BASE"
fi
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  Other devices on your WiFi can access:"
echo "  👉 http://${LAN_IP}:3000"
echo ""
echo "  Press Ctrl+C to stop the server"
echo ""

# Wait for the dev server process
wait $DEV_PID
