# OAuth Troubleshooting Guide

## Current Issue

OAuth not proceeding to dashboard on other devices.

## What I've Fixed

1. ✅ Fixed broken localStorage adapter in `lib/supabase.ts` (try-catch blocks were incorrectly placed)
2. ✅ Added detailed console logging to `app/auth/callback/page.tsx` for debugging
3. ✅ Server running on all network interfaces (`0.0.0.0`)
4. ✅ Next.js config allows cross-origin from LAN IP

## Steps to Debug

### 1. Check Browser Console on Other Device

When you try to login from `http://192.168.100.138:3000/login`:

- Open browser console (F12)
- Try to login with Google/OAuth
- Look for logs starting with `[auth/callback]`
- Share any errors you see

### 2. Verify Supabase Redirect URLs

Go to: https://supabase.com/dashboard/project/yxoxxrbukjyioyfveaml/auth/url-configuration

**Make sure these are added:**

- Site URL: `http://192.168.100.138:3000`
- Redirect URLs (add all of these):
  ```
  http://localhost:3000/auth/callback
  http://127.0.0.1:3000/auth/callback
  http://192.168.100.138:3000/auth/callback
  ```

### 3. Check OAuth Provider Settings

If using Google OAuth:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Find your OAuth 2.0 Client ID
3. Under "Authorized redirect URIs", make sure this is listed:
   ```
   https://yxoxxrbukjyioyfveaml.supabase.co/auth/v1/callback
   ```
   (This is the Supabase callback, NOT your app's callback)

### 4. Test Flow

1. On other device, go to: `http://192.168.100.138:3000/login`
2. Click "Sign in with Google" (or your provider)
3. Approve OAuth consent
4. Watch the URL changes:
   - Should redirect to Google
   - Then to Supabase callback
   - Then to `http://192.168.100.138:3000/auth/callback`
   - Then to dashboard

### 5. Common Issues & Solutions

**Issue: Stuck on callback page**

- Check console logs for errors
- Verify localStorage is working (not in private browsing)
- Check network tab for failed API requests

**Issue: Redirects to localhost instead of LAN IP**

- Clear browser cache and cookies
- Make sure you're accessing via `http://192.168.100.138:3000`, not `localhost`
- Check that `.env.local` doesn't have hardcoded redirect URL

**Issue: "redirect_uri mismatch" error**

- Add all redirect URLs to Supabase settings (see step 2)
- Restart dev server after adding URLs
- Clear browser cache

**Issue: "Session not found" error**

- Check if localStorage is enabled in browser
- Try in regular (non-incognito) browser window
- Check Supabase storage adapter is working (fixed in this update)

## What to Check Now

1. **Restart dev server:**

   ```bash
   npm run dev
   ```

2. **Try OAuth from other device:**

   - Access: `http://192.168.100.138:3000/login`
   - Try to login
   - Open browser console (F12)
   - Look for `[auth/callback]` logs

3. **Share the logs:**
   - Copy any errors from console
   - Note where in the flow it gets stuck
   - Check what the URL looks like when it fails

## Debug Logs to Look For

After clicking login, you should see:

```
[auth/callback] Current URL: http://192.168.100.138:3000/auth/callback?code=...
[auth/callback] Code present: true
[auth/callback] Exchanging code for session...
[auth/callback] Exchange successful: true
[auth/callback] Session retrieved: true
[auth/callback] User ID: xxx
[auth/callback] User email: xxx
[auth/callback] Saving user data: {...}
[auth/callback] Redirect path: /dashboard
```

If you see different logs or errors, that tells us where the issue is!
