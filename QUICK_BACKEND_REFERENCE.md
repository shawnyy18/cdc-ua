# 🚀 EcoKonek Backend - Quick Reference

## One-Command Setup

```bash
./supabase/setup-backend.sh
```

## Manual Setup (5 Minutes)

### 1. Create Supabase Project

→ https://supabase.com/dashboard → New Project

### 2. Environment Setup

```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

### 3. Run Migrations (In Supabase SQL Editor)

```
01_complete_schema.sql      → Tables & indexes
02_row_level_security.sql   → Security policies
03_functions_triggers.sql   → Functions & triggers
04_storage_setup.sql        → Storage buckets
```

### 4. Create Admin User

```sql
UPDATE users SET is_admin = true WHERE email = 'your@email.com';
```

### 5. Start Dev Server

```bash
npm install && npm run dev
```

## 📊 Database Quick Reference

### Essential Tables

- `users` - User profiles (id, email, username, eco_points, is_admin)
- `donations` - Device donations (user_id, device_type, status, eco_points_earned)
- `community_posts` - User posts (user_id, content, likes_count, comments_count)
- `follows` - Follow relationships (follower_id, following_id)
- `notifications` - User notifications (recipient_id, type, content, is_read)

### Key Functions

```sql
-- Like/unlike post
SELECT toggle_like(post_id, user_id);

-- Follow/unfollow user
SELECT toggle_follow(follower_id, following_id);

-- Get feed with likes
SELECT * FROM get_community_feed(user_id, 50, 0);

-- Get post comments
SELECT * FROM get_comments_for_post(post_id);
```

## 🔐 Security Checklist

- [x] RLS enabled on all tables
- [x] Users can only modify own data
- [x] Admins scoped by barangay
- [x] Storage policies configured
- [x] JWT authentication active

## 📂 Storage Buckets

- `profile-images` - User avatars (2MB)
- `post-images` - Post images (5MB)
- `marketplace-images` - Products (5MB)

## 🧪 Test Features

1. Register → Login → Dashboard ✅
2. Create donation → Check eco points ✅
3. Post → Like → Comment ✅
4. Follow user → Get notification ✅
5. Upload profile image ✅

## 🆘 Quick Fixes

**Can't connect?**

```bash
# Check environment
cat .env.local
# Restart server
npm run dev
```

**Permission denied?**

```sql
-- Re-run RLS policies
\i 02_row_level_security.sql
```

**Functions missing?**

```sql
-- Re-run functions
\i 03_functions_triggers.sql
```

## 📚 Documentation

- `BACKEND_BUILD_COMPLETE.md` - Full overview
- `SUPABASE_SETUP_GUIDE.md` - Detailed setup
- `DATABASE_SCHEMA.md` - Schema reference
- `ENV_SETUP_GUIDE.md` - Environment config

## 🎯 Production Deploy

1. Deploy app to Vercel/Netlify
2. Add env vars in hosting dashboard
3. Update Supabase auth redirect URLs
4. Test authentication flow
5. Create admin user in production

---

**Need help?** Check SUPABASE_SETUP_GUIDE.md troubleshooting section
