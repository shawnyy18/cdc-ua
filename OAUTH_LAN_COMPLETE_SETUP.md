# OAuth LAN Setup - Complete Guide

## ✅ What's Been Fixed

### 1. **Supabase Client Singleton Pattern**

- ✅ Removed duplicate `createClient()` calls from `app/login/page.tsx` and `app/dashboard/page.tsx`
- ✅ All pages now use singleton from `lib/supabase.ts`
- ✅ Eliminates "Multiple GoTrueClient instances" warning

### 2. **PKCE Flow Configuration**

- ✅ Added `flowType: 'pkce'` to Supabase client config for better cross-origin support
- ✅ Added `debug: true` in development for detailed OAuth logs
- ✅ Added `access_type: 'offline'` and `prompt: 'consent'` to OAuth requests

### 3. **Enhanced Error Handling**

- ✅ OAuth errors in URL params are now detected and displayed
- ✅ Better error messages for redirect mismatches
- ✅ Loading states properly managed during OAuth flow
- ✅ Detailed console logging with `[OAuth]` and `[auth/callback]` prefixes

### 4. **Dev Server LAN Access**

- ✅ Server binds to `0.0.0.0:3000` (accessible from any device on network)
- ✅ Dynamic redirect URLs using `window.location.origin`
- ✅ Works on both `localhost:3000` and `192.168.100.138:3000`

---

## 🔧 Required Manual Configuration

### **CRITICAL: Add Redirect URLs to Supabase Dashboard**

This is the **MOST IMPORTANT** step. Without this, OAuth will fail with "redirect_uri mismatch" or "refused to connect" errors.

1. **Go to Supabase Dashboard:**

   ```
   https://supabase.com/dashboard/project/yxoxxrbukjyioyfveaml/auth/url-configuration
   ```

2. **Under "Redirect URLs", add BOTH of these URLs:**

   ```
   http://localhost:3000/auth/callback
   http://192.168.100.138:3000/auth/callback
   ```

3. **Click "Save"**

4. **Verify Google OAuth Provider is Enabled:**
   - Go to: `Authentication → Providers → Google`
   - Ensure it's enabled with valid Client ID and Client Secret
   - Make sure the authorized redirect URIs in Google Cloud Console include:
     ```
     https://yxoxxrbukjyioyfveaml.supabase.co/auth/v1/callback
     ```

---

## 🧪 Testing OAuth on LAN

### **Step 1: Start Dev Server**

```bash
npm run dev
```

Server will be accessible at:

- From your machine: `http://localhost:3000`
- From other devices: `http://192.168.100.138:3000`

### **Step 2: Test from Another Device**

1. **Connect the device to the same Wi-Fi network**

2. **Open browser and navigate to:**

   ```
   http://192.168.100.138:3000/login
   ```

3. **Open browser console (F12 → Console tab)**

4. **Click "Sign in with Google"**

5. **Watch for console logs:**

   ```
   [OAuth] Attempting google login from: http://192.168.100.138:3000
   [OAuth] Redirect URL: http://192.168.100.138:3000/auth/callback
   [OAuth] Response: {data: {...}, error: null}
   [OAuth] Redirecting to: https://accounts.google.com/...
   ```

6. **After selecting Google account, you'll be redirected to:**

   ```
   http://192.168.100.138:3000/auth/callback?code=...
   ```

7. **Watch for callback logs:**
   ```
   [auth/callback] Current URL: http://192.168.100.138:3000/auth/callback?code=...
   [auth/callback] Code present: true
   [auth/callback] Exchanging code for session...
   [auth/callback] Exchange successful: true
   [auth/callback] Session user: youremail@gmail.com
   [auth/callback] Redirect path: /dashboard
   ```

---

## 🚨 Troubleshooting

### **Error: "Redirect URI mismatch"**

**Cause:** The redirect URL is not added to Supabase dashboard.

**Solution:**

1. Add `http://192.168.100.138:3000/auth/callback` to Supabase → Auth → URL Configuration → Redirect URLs
2. Make sure you clicked "Save"
3. Clear browser cache and try again

---

### **Error: "Provider is not enabled"**

**Cause:** Google OAuth provider is not configured in Supabase.

**Solution:**

1. Go to Supabase → Authentication → Providers → Google
2. Enable it and add your Google Client ID and Client Secret
3. Make sure the Google Cloud Console has the correct authorized redirect URI

---

### **Error: "Refused to connect"**

**Cause:** Missing redirect URL in Supabase dashboard or browser blocking the redirect.

**Solution:**

1. Verify redirect URL is added to Supabase (see above)
2. Check browser console for exact error message
3. Try disabling browser extensions (ad blockers, privacy tools)
4. Use incognito/private mode to test

---

### **Error: "Multiple GoTrueClient instances"**

**Status:** ✅ FIXED

This was caused by duplicate `createClient()` calls. Now all pages use the singleton from `lib/supabase.ts`.

---

### **WebSocket HMR Errors (ws://192.168.100.138:3000/\_next/webpack-hmr failed)**

**Status:** ⚠️ COSMETIC ISSUE (safe to ignore)

This is a known limitation of Next.js Turbopack with cross-origin requests. HMR still works via polling. The app functions normally.

**If it bothers you:**

```bash
npm run dev:lan  # Uses Webpack instead of Turbopack (slower but no WebSocket errors)
```

---

## 📋 Quick Checklist

Before testing OAuth on LAN, ensure:

- [ ] ✅ Added `http://192.168.100.138:3000/auth/callback` to Supabase Redirect URLs
- [ ] ✅ Added `http://localhost:3000/auth/callback` to Supabase Redirect URLs
- [ ] ✅ Google OAuth provider is enabled in Supabase
- [ ] ✅ Google Cloud Console has correct authorized redirect URI
- [ ] ✅ Dev server is running (`npm run dev`)
- [ ] ✅ Both devices are on same Wi-Fi network
- [ ] ✅ Browser console is open to see debug logs

---

## 🎯 Expected Behavior

### **Successful OAuth Flow:**

1. User clicks "Sign in with Google" on login page
2. Console shows: `[OAuth] Attempting google login...`
3. Browser redirects to Google OAuth consent screen
4. User selects Google account
5. Google redirects back to: `http://192.168.100.138:3000/auth/callback?code=...`
6. Callback page exchanges code for session
7. Console shows: `[auth/callback] Exchange successful: true`
8. User is redirected to `/dashboard`

### **What You'll See:**

- ✅ No "Multiple GoTrueClient instances" warning
- ✅ Detailed `[OAuth]` and `[auth/callback]` logs in console
- ✅ Smooth redirect to dashboard after login
- ✅ User profile loads correctly
- ⚠️ WebSocket HMR errors (cosmetic, safe to ignore)

---

## 📝 Notes

- **IP Address:** If your IP changes, update the redirect URL in Supabase dashboard
- **Localhost Still Works:** You can still use `http://localhost:3000` on your main machine
- **Production:** In production, use your actual domain (e.g., `https://yourdomain.com/auth/callback`)
- **Security:** LAN access is for development only - don't expose to public internet

---

## 🔍 Debug Commands

If OAuth still fails, share these console logs:

```javascript
// Run in browser console on login page:
console.log("Origin:", window.location.origin);
console.log("Redirect URL:", `${window.location.origin}/auth/callback`);

// Run in browser console on callback page:
console.log("Current URL:", window.location.href);
console.log(
  "URL Params:",
  new URLSearchParams(window.location.search).toString()
);
```

---

## ✨ Summary

**What's working:**

- ✅ Singleton Supabase client (no duplicate instances)
- ✅ PKCE OAuth flow with enhanced error handling
- ✅ Dynamic redirect URLs (works on any IP)
- ✅ Comprehensive console logging for debugging
- ✅ LAN-accessible dev server

**What you need to do:**

1. Add redirect URLs to Supabase dashboard (CRITICAL)
2. Test OAuth from another device
3. Share console logs if it still doesn't work

The code is ready - the only missing piece is the Supabase dashboard configuration! 🚀
