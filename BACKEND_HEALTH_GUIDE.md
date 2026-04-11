# Backend Health & Monitoring Guide

## Overview

This document describes the health monitoring system and best practices for maintaining a healthy backend.

## Health Check Endpoint

### GET /api/health

Returns comprehensive system health status.

**Response Format:**

```json
{
  "status": "healthy" | "degraded" | "unhealthy",
  "timestamp": "2025-10-26T10:30:00.000Z",
  "services": {
    "database": {
      "status": "up" | "down",
      "responseTime": 45,
      "error": "error message if down"
    },
    "authentication": {
      "status": "up" | "down",
      "error": "error message if down"
    },
    "realtime": {
      "status": "up" | "down",
      "error": "error message if down"
    }
  },
  "environment": {
    "nodeEnv": "development",
    "supabaseConfigured": true
  }
}
```

**Status Codes:**

- `200` - System is healthy (all services up)
- `207` - System is degraded (some services down)
- `503` - System is unhealthy (critical services down)

## Quick Health Check

Run the automated health check script:

```bash
./check-health.sh
```

This script will:

- ✅ Check if dev server is running
- ✅ Test backend health endpoint
- ✅ Verify database connectivity
- ✅ Check authentication service
- ✅ Validate realtime notifications
- ✅ Verify Socket.IO endpoint
- ✅ Check environment configuration
- ✅ Scan for recent errors

## Manual Testing

### Test Database Connection

```bash
curl http://localhost:3000/api/health | jq '.services.database'
```

### Test Notifications

```bash
# Get notifications (requires auth token)
curl -H "Authorization: Bearer YOUR_TOKEN" \
  http://localhost:3000/api/notifications
```

### Test Socket.IO

```bash
curl http://localhost:3000/api/socket
```

## Error Logging

All backend services now include enhanced logging:

### Log Format

```
[2025-10-26T10:30:00.000Z] [service:context] message { metadata }
```

### Log Levels

- **ERROR**: Critical failures that need attention
- **WARN**: Non-critical issues (e.g., socket emit failures)
- **INFO**: Normal operations (e.g., notification created)

### Example Logs

```
[2025-10-26T10:30:00.000Z] [notificationService:createNotification] New notification created { id: "abc123", type: "NEW_FOLLOWER" }
[2025-10-26T10:30:05.000Z] [notificationService:socketEmit] new-notification event sent { recipientId: "user123" }
```

## Common Issues & Solutions

### Issue: Database Connection Failed

**Symptoms:** Health check shows database status "down"
**Solutions:**

1. Check Supabase service status
2. Verify `NEXT_PUBLIC_SUPABASE_URL` in .env.local
3. Verify `SUPABASE_SERVICE_ROLE_KEY` in .env.local
4. Check network connectivity

### Issue: Authentication Service Down

**Symptoms:** Health check shows authentication status "down"
**Solutions:**

1. Verify Supabase Auth is enabled
2. Check service role key permissions
3. Review Supabase dashboard for auth errors

### Issue: Realtime Notifications Not Working

**Symptoms:** Notifications don't appear in real-time
**Solutions:**

1. Check Socket.IO connection in browser console
2. Verify `/api/socket` endpoint is accessible
3. Check if notifications table exists
4. Verify RLS policies allow user to read notifications

### Issue: 400 Validation Errors

**Symptoms:** Console shows 400 errors
**Solutions:**

1. Add client-side validation to forms
2. Check required fields before API calls
3. Review API endpoint validation rules
4. See specific error messages in response body

## Performance Monitoring

### Response Time Targets

- Database queries: < 100ms
- API endpoints: < 200ms
- Socket.IO emit: < 50ms

### Monitoring Commands

```bash
# Watch logs in real-time
npm run dev | grep ERROR

# Check for high memory usage
top -pid $(pgrep -f "next-router-worker")

# Monitor database performance
# (Check Supabase dashboard → Performance)
```

## Best Practices

### 1. Always Check Health Before Deploy

```bash
./check-health.sh
```

### 2. Monitor Logs During Development

Look for patterns like:

- Repeated authentication errors
- Database connection failures
- Socket.IO disconnections

### 3. Test Critical Paths

- User registration → login → notifications
- Post creation → like → aggregated notification
- Follow user → realtime notification

### 4. Use Defensive Programming

```typescript
// ✅ Good: Handle all cases
const user = data?.user ?? null;
if (!user) return null;

// ❌ Bad: Assume data exists
const user = data.user; // Could throw
```

### 5. Validate Input Early

```typescript
// ✅ Good: Validate before processing
if (!email || !password) {
  return { error: "Missing required fields" };
}

// ❌ Bad: Process then fail
const user = await createUser(email, password); // Could fail silently
```

## Notification System Health

### Check Notification Count

```sql
-- Run in Supabase SQL Editor
SELECT
  COUNT(*) as total,
  COUNT(*) FILTER (WHERE is_read = false) as unread,
  COUNT(*) FILTER (WHERE aggregation_key IS NOT NULL) as aggregated
FROM notifications;
```

### Check Socket.IO Connections

```javascript
// In browser console
localStorage.getItem("ecokonek_user"); // Should show user data
```

### Verify Real-time Events

1. Open browser console on two different browsers
2. Login as User A in browser 1
3. Login as User B in browser 2
4. User A follows User B
5. Check browser 2 console for socket events:
   - `connected`
   - `new-notification`

## Emergency Procedures

### If System is Down

1. Check health endpoint: `curl http://localhost:3000/api/health`
2. Check logs: `npm run dev`
3. Verify environment variables
4. Restart dev server
5. Check Supabase dashboard for outages

### If Database is Down

1. Check Supabase status: https://status.supabase.com
2. Verify connection string
3. Check for RLS policy conflicts
4. Review recent migrations

### If Notifications Stop Working

1. Check Socket.IO endpoint: `curl http://localhost:3000/api/socket`
2. Verify notifications table exists
3. Check RLS policies
4. Review browser console for socket errors
5. Restart dev server

## Automated Monitoring (Future)

Consider setting up:

- [ ] Error tracking (Sentry, LogRocket)
- [ ] Uptime monitoring (Pingdom, UptimeRobot)
- [ ] Performance monitoring (New Relic, Datadog)
- [ ] Log aggregation (Logtail, Papertrail)

## Changelog

### 2025-10-26

- ✅ Added /api/health endpoint
- ✅ Enhanced error logging in notificationService
- ✅ Created automated health check script
- ✅ Added loading states to NotificationBell
- ✅ Removed bell from auth pages (login, register, forgot-password)
- ✅ Added input validation to notification functions

## Support

For issues or questions:

1. Check this guide first
2. Review logs for specific error messages
3. Test health endpoint
4. Check Supabase dashboard
5. Review recent code changes
