# 🚀 EcoKonek Database Deployment Guide

Complete guide to deploy your database infrastructure to Supabase.

## 📋 Prerequisites

- Supabase account with project ID: `yxoxxrbukjyioyfveaml`
- Access to Supabase dashboard
- Project URL: `https://yxoxxrbukjyioyfveaml.supabase.co`

## 🎯 Quick Start (Recommended)

### Option 1: Manual Deployment via Supabase Dashboard

This is the **easiest and most reliable** method:

1. **Login to Supabase**

   - Go to https://app.supabase.com
   - Login to your account
   - Select your project

2. **Open SQL Editor**

   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run Each Migration Script**

   **Step 1 - Create Tables:**

   - Open `supabase/migrations/01_create_tables.sql` in your code editor
   - Copy the entire contents
   - Paste into Supabase SQL Editor
   - Click "Run" or press Cmd/Ctrl + Enter
   - Wait for "Success" message

   **Step 2 - Set Up Security:**

   - Open `supabase/migrations/02_row_level_security.sql`
   - Copy the entire contents
   - Paste into a new query in Supabase SQL Editor
   - Click "Run"
   - Wait for "Success" message

   **Step 3 - Create Functions:**

   - Open `supabase/migrations/03_functions_triggers.sql`
   - Copy the entire contents
   - Paste into a new query in Supabase SQL Editor
   - Click "Run"
   - Wait for "Success" message

4. **Verify Installation**

   ```sql
   -- Run this query to verify all tables exist
   SELECT table_name
   FROM information_schema.tables
   WHERE table_schema = 'public'
   ORDER BY table_name;
   ```

   You should see these tables:

   - community_posts
   - donations
   - drop_off_centers
   - marketplace_items
   - post_likes
   - seller_profiles
   - transactions
   - user_achievements
   - users

5. **✅ Done!** Your database is ready to use.

---

### Option 2: Automated Deployment (Using Supabase CLI)

If you prefer automation:

1. **Install Supabase CLI**

   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**

   ```bash
   supabase login
   ```

3. **Run Deployment Script**
   ```bash
   cd /Users/shawnashlee/Desktop/Startup
   ./supabase/deploy.sh
   ```

---

## 🗄️ Database Structure Overview

### Core Tables Created:

| Table                 | Purpose               | Key Features                     |
| --------------------- | --------------------- | -------------------------------- |
| **users**             | User profiles & stats | eco_points, donations, CO2 saved |
| **donations**         | Device donations      | eco impact tracking, status      |
| **community_posts**   | Social feed           | likes, comments support          |
| **post_likes**        | Engagement            | prevents duplicate likes         |
| **marketplace_items** | Seller listings       | pricing, availability            |
| **seller_profiles**   | Seller info           | ratings, verification            |
| **drop_off_centers**  | Locations             | contact info, hours              |
| **user_achievements** | Gamification          | milestone tracking               |
| **transactions**      | Payments              | purchase history                 |

### Key Features Implemented:

✅ **Row Level Security (RLS)** - Secure data access
✅ **Automated Triggers** - Auto-update timestamps
✅ **Achievement System** - Automatic award on milestones
✅ **Eco Impact Calculation** - Points & CO2 tracking
✅ **Leaderboard Support** - Ranking by eco points
✅ **Social Features** - Posts, likes, comments
✅ **Marketplace** - Buy/sell functionality

---

## 🔐 Security Features

### Automatic User Profile Creation

When a user signs up through Supabase Auth, a profile is automatically created in the `users` table via a database trigger.

### Row Level Security Policies

**Users Table:**

- Users can only edit their own profile
- Public profiles visible to everyone
- Private profiles only visible to owner

**Donations Table:**

- Users can only view/create their own donations
- Cannot modify after submission

**Community Posts:**

- Anyone can view active posts
- Only authenticated users can create posts
- Users can only edit/delete their own posts

**Marketplace:**

- Anyone can view available items
- Only verified sellers can list items
- Sellers can only edit their own listings

---

## 🎮 Database Functions Available

### For Backend Use:

```typescript
// Check and award achievements
await supabase.rpc("check_achievements", { p_user_id: userId });

// Get user's rank
const { data: rank } = await supabase.rpc("get_user_rank", {
  p_user_id: userId,
});

// Calculate eco impact
const { data: impact } = await supabase.rpc("calculate_eco_impact", {
  p_device_type: "laptop",
  p_condition: "working",
});

// Search users
const { data: users } = await supabase.rpc("search_users", {
  search_term: "john",
});

// Get community feed
const { data: posts } = await supabase.rpc("get_community_feed", {
  p_limit: 20,
});
```

---

## 📦 Post-Deployment Setup (Optional)

### 1. Storage Buckets for Images

**Create in Supabase Dashboard > Storage:**

**Bucket: `profile-images`**

```sql
-- Policy: Allow authenticated users to upload their own profile image
CREATE POLICY "Users can upload own profile image"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Policy: Anyone can view profile images
CREATE POLICY "Profile images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-images');
```

**Bucket: `device-images`**

```sql
-- Policy: Authenticated users can upload device images
CREATE POLICY "Users can upload device images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'device-images');

-- Policy: Anyone can view device images
CREATE POLICY "Device images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'device-images');
```

**Bucket: `marketplace-images`**

```sql
-- Policy: Sellers can upload marketplace images
CREATE POLICY "Sellers can upload item images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'marketplace-images' AND EXISTS (
  SELECT 1 FROM users WHERE id = auth.uid() AND is_seller = true
));

-- Policy: Anyone can view marketplace images
CREATE POLICY "Marketplace images are publicly accessible"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'marketplace-images');
```

### 2. Enable Realtime (Optional)

For live updates on posts and likes:

```sql
-- Enable realtime for community posts
ALTER PUBLICATION supabase_realtime ADD TABLE community_posts;

-- Enable realtime for post likes
ALTER PUBLICATION supabase_realtime ADD TABLE post_likes;

-- Enable realtime for marketplace items
ALTER PUBLICATION supabase_realtime ADD TABLE marketplace_items;
```

### 3. Configure Email Templates

**In Supabase Dashboard > Authentication > Email Templates:**

- Customize "Confirm signup" email
- Customize "Reset password" email
- Add your EcoKonek branding

### 4. Social Authentication Providers

**In Supabase Dashboard > Authentication > Providers:**

Enable and configure:

- Google OAuth
- Facebook OAuth
- Add redirect URLs for your domain

---

## ✅ Verification Checklist

After deployment, verify:

- [ ] All 9 tables created successfully
- [ ] RLS policies are active on all tables
- [ ] Database functions work correctly
- [ ] Default drop-off centers exist (3 locations)
- [ ] Triggers are active (check updated_at updates)
- [ ] Test user creation works
- [ ] Test donation creation works
- [ ] Achievement system awards correctly
- [ ] Leaderboard queries return results
- [ ] Storage buckets created (optional)
- [ ] Realtime enabled (optional)

### Quick Test:

Run this in SQL Editor to test everything:

```sql
-- Test eco impact calculation
SELECT * FROM calculate_eco_impact('laptop', 'working');
-- Expected: eco_points: 150, co2_saved: 18.7

-- Check drop-off centers
SELECT COUNT(*) FROM drop_off_centers;
-- Expected: 3

-- Verify RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';
-- Expected: All tables should have rowsecurity = true

-- Check functions exist
SELECT COUNT(*) FROM pg_proc
WHERE pronamespace = 'public'::regnamespace
AND prokind = 'f';
-- Expected: At least 8 functions
```

---

## 🚨 Troubleshooting

### Issue: "relation already exists"

**Solution:** Some tables might already exist. You can:

- Drop existing tables first (⚠️ loses data)
- Or modify migration to handle existing tables

### Issue: "permission denied"

**Solution:**

- Ensure you're logged in as project owner
- Use service role key for admin operations

### Issue: API routes return 401 errors

**Solution:**

- Verify .env file has correct credentials
- Check that user is authenticated
- Ensure RLS policies are correctly set

### Issue: Functions not working

**Solution:**

```sql
-- Check if function exists
SELECT proname FROM pg_proc WHERE proname = 'your_function_name';

-- Re-run function creation script if needed
```

---

## 📊 Database Statistics

After deployment, you can monitor your database:

```sql
-- Check table sizes
SELECT
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check row counts
SELECT
  'users' as table_name, COUNT(*) as row_count FROM users
UNION ALL
SELECT 'donations', COUNT(*) FROM donations
UNION ALL
SELECT 'community_posts', COUNT(*) FROM community_posts
UNION ALL
SELECT 'marketplace_items', COUNT(*) FROM marketplace_items;
```

---

## 🎉 Success!

Your EcoKonek database is now ready for production!

### Next Steps:

1. ✅ Database deployed
2. 🔄 Test your Next.js application
3. 📱 Start building features
4. 🚀 Deploy to production

---

## 📞 Need Help?

- Supabase Docs: https://supabase.com/docs
- Project Dashboard: https://app.supabase.com/project/yxoxxrbukjyioyfveaml
- SQL Editor: https://app.supabase.com/project/yxoxxrbukjyioyfveaml/sql

---

**Last Updated:** October 16, 2025
**Database Version:** 1.0.0
**Project:** EcoKonek Platform
