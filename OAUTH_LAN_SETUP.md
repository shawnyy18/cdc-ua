# OAuth LAN Access Setup Guide

## Current Configuration

- **LAN IP**: `http://192.168.100.138:3000`
- **Callback Route**: `/auth/callback`
- **Full Redirect URL**: `http://192.168.100.138:3000/auth/callback`

## ✅ Completed Steps

1. ✅ Updated `.env.local` with correct Supabase URL and anon key
2. ✅ Set redirect URL to `http://192.168.100.138:3000/auth/callback`
3. ✅ Updated Socket URL to use LAN IP

## 🔧 Required Manual Steps

### 1. Start Dev Server on All Network Interfaces

Run this command instead of `npm run dev`:

```bash
npm run dev -- --hostname 0.0.0.0
```

Or add to your `package.json` scripts:

```json
"dev:lan": "next dev --hostname 0.0.0.0"
```

Then run: `npm run dev:lan`

### 2. Update Supabase Auth Settings

Go to: https://supabase.com/dashboard/project/yxoxxrbukjyioyfveaml/auth/url-configuration

**Add these URLs:**

- **Site URL**: `http://192.168.100.138:3000`
- **Redirect URLs**: Add this line:
  ```
  http://192.168.100.138:3000/auth/callback
  ```

### 3. Update OAuth Provider Settings (e.g., Google)

If using Google OAuth:

1. Go to: https://console.cloud.google.com/apis/credentials
2. Select your OAuth 2.0 Client ID
3. Under "Authorized redirect URIs", add:
   ```
   https://yxoxxrbukjyioyfveaml.supabase.co/auth/v1/callback
   ```
   (This is the Supabase callback, not your app's callback)

### 4. Restart Your Dev Server

After updating `.env.local`:

```bash
npm run dev -- --hostname 0.0.0.0
```

### 5. Test from Another Device

1. On the other device, open: `http://192.168.100.138:3000/login`
2. Click the Google (or other provider) login button
3. After OAuth approval, you should be redirected to `http://192.168.100.138:3000/auth/callback`
4. Then automatically redirected to `/dashboard` or `/admin`

## 🐛 Troubleshooting

### "Unable to connect" Error

- Make sure your dev server is running with `--hostname 0.0.0.0`
- Check your firewall isn't blocking port 3000
- Verify both devices are on the same WiFi network

### "redirect_uri mismatch" Error

- Verify `http://192.168.100.138:3000/auth/callback` is added to Supabase Redirect URLs
- Check your OAuth provider has the correct Supabase callback URL
- Clear browser cache and try again

### OAuth Redirects to localhost

- Check that `.env.local` has `NEXT_PUBLIC_SUPABASE_REDIRECT_URL=http://192.168.100.138:3000/auth/callback`
- Restart your dev server after changing `.env.local`
- Make sure you're accessing via `http://192.168.100.138:3000`, not `localhost`

### Socket Connection Issues

- Verify `NEXT_PUBLIC_SOCKET_URL=http://192.168.100.138:3000` in `.env.local`
- Check browser console for WebSocket connection errors
- Ensure Socket.IO server is accessible on your LAN IP

## 📝 Quick Checklist

- [ ] Dev server running with `--hostname 0.0.0.0`
- [ ] `.env.local` updated with LAN IP
- [ ] Supabase Site URL includes `http://192.168.100.138:3000`
- [ ] Supabase Redirect URLs includes `http://192.168.100.138:3000/auth/callback`
- [ ] OAuth provider (Google, etc.) has correct Supabase callback URL
- [ ] Both devices on same WiFi network
- [ ] Firewall allows port 3000
- [ ] Dev server restarted after `.env.local` changes

## 🎯 Expected Flow

1. User opens `http://192.168.100.138:3000/login` on another device
2. Clicks "Sign in with Google"
3. Redirected to Google OAuth consent screen
4. After approval, redirected to Supabase callback
5. Supabase redirects to `http://192.168.100.138:3000/auth/callback`
6. App exchanges code for session, saves to localStorage
7. User redirected to dashboard

## 🔗 Useful Links

- Supabase Auth Settings: https://supabase.com/dashboard/project/yxoxxrbukjyioyfveaml/auth/url-configuration
- Google Cloud Console: https://console.cloud.google.com/apis/credentials
- Next.js Dev Server Docs: https://nextjs.org/docs/api-reference/cli#development
