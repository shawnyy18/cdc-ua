# 🏗️ Supabase Setup Files

This directory contains all the SQL migration files and setup scripts needed to build the EcoKonek Supabase backend from scratch.

## 📁 Files Overview

| File                        | Description                                            | Order         |
| --------------------------- | ------------------------------------------------------ | ------------- |
| `01_complete_schema.sql`    | Creates all database tables, indexes, and default data | 1️⃣ Run First  |
| `02_row_level_security.sql` | Configures RLS policies for data security              | 2️⃣ Run Second |
| `03_functions_triggers.sql` | Creates database functions and automated triggers      | 3️⃣ Run Third  |
| `04_storage_setup.sql`      | Sets up storage buckets and policies                   | 4️⃣ Run Fourth |

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

Run the setup script from the project root:

```bash
./supabase/setup-backend.sh
```

The script will:

- ✅ Check prerequisites
- ✅ Verify environment configuration
- ✅ Link to your Supabase project
- ✅ Run all migrations in order
- ✅ Provide next steps

### Option 2: Manual Setup via Supabase Dashboard

1. **Go to Supabase Dashboard**
   - Visit https://supabase.com/dashboard
   - Select your project
   - Navigate to **SQL Editor**

2. **Run migrations in order**

   **Step 1:** Create tables

   ```sql
   -- Copy and paste contents of 01_complete_schema.sql
   -- Click "Run" (or press Ctrl/Cmd + Enter)
   ```

   **Step 2:** Set up security

   ```sql
   -- Copy and paste contents of 02_row_level_security.sql
   -- Click "Run"
   ```

   **Step 3:** Add functions

   ```sql
   -- Copy and paste contents of 03_functions_triggers.sql
   -- Click "Run"
   ```

   **Step 4:** Configure storage

   ```sql
   -- Copy and paste contents of 04_storage_setup.sql
   -- Click "Run"
   ```

3. **Create storage buckets** (if not done via SQL)
   - Go to **Storage** in sidebar
   - Create these public buckets:
     - `profile-images` (2MB limit)
     - `post-images` (5MB limit)
     - `marketplace-images` (5MB limit)

4. **Set up authentication**
   - Go to **Authentication** → **Providers**
   - Enable Email provider
   - Optional: Configure Google OAuth

5. **Create admin user**
   - Register via your app
   - In SQL Editor, run:
     ```sql
     UPDATE users SET is_admin = true WHERE email = 'your@email.com';
     ```

### Option 3: Using Supabase CLI

```bash
# Install CLI
npm install -g supabase

# Login
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db execute --file supabase/setup/01_complete_schema.sql
supabase db execute --file supabase/setup/02_row_level_security.sql
supabase db execute --file supabase/setup/03_functions_triggers.sql
supabase db execute --file supabase/setup/04_storage_setup.sql
```

## 📋 What Gets Created

### Tables (12 core + optional)

- ✅ `barangays` - Location management
- ✅ `users` - User profiles and stats
- ✅ `donations` - Device donation tracking
- ✅ `drop_off_centers` - Physical locations
- ✅ `community_posts` - User posts
- ✅ `post_likes` - Post engagement
- ✅ `post_comments` - Comments system
- ✅ `follows` - Follow relationships
- ✅ `notifications` - User notifications
- ✅ `marketplace_items` - Marketplace (optional)
- ✅ `seller_profiles` - Seller info (optional)
- ✅ `user_achievements` - Achievements (optional)
- ✅ `transactions` - Payments (optional)
- ✅ `audit_log` - Admin actions log

### Security Features

- ✅ Row Level Security (RLS) on all tables
- ✅ User-scoped data access
- ✅ Admin role with barangay scoping
- ✅ Secure storage policies

### Automated Logic

- ✅ Auto-update timestamps
- ✅ Update post likes/comments counts
- ✅ Update user statistics
- ✅ Check and award achievements
- ✅ Assign barangays to donations
- ✅ Audit logging for admin actions

### Database Functions

- ✅ `toggle_like()` - Like/unlike posts
- ✅ `toggle_follow()` - Follow/unfollow users
- ✅ `get_community_feed()` - Get posts with like status
- ✅ `get_comments_for_post()` - Get all comments
- ✅ `get_followers_list()` - Get user's followers
- ✅ `get_following_list()` - Get who user follows
- ✅ `check_achievements()` - Award achievements

### Storage Buckets

- ✅ `profile-images` - User avatars
- ✅ `post-images` - Community post images
- ✅ `marketplace-images` - Product photos

## 🔍 Verification

After running migrations, verify everything is set up correctly:

```sql
-- Check all tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;

-- Check default data
SELECT * FROM barangays;
SELECT * FROM drop_off_centers;

-- Check storage buckets
SELECT * FROM storage.buckets;
```

Expected results:

- ✅ 12+ tables created
- ✅ All tables have `rowsecurity = true`
- ✅ 5 barangays in Pampanga
- ✅ 3 drop-off centers
- ✅ 3 storage buckets

## ⚠️ Important Notes

### Before Running Migrations

- ✅ Backup any existing data
- ✅ Use a test project first
- ✅ Review each SQL file

### Migration Order Matters

Run files in numerical order (01, 02, 03, 04). Each file depends on the previous ones.

### If You Get Errors

1. **"relation already exists"**
   - Tables already created
   - Safe to ignore or drop tables first

2. **"permission denied"**
   - Check you're using correct credentials
   - Ensure you have admin access

3. **"syntax error"**
   - Copy entire file content
   - Don't run partial queries

4. **"column does not exist"**
   - Previous migration didn't complete
   - Re-run from 01_complete_schema.sql

## 🔄 Resetting Database

To start fresh (⚠️ DELETES ALL DATA):

```sql
-- Drop all tables
DROP TABLE IF EXISTS audit_log CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS seller_profiles CASCADE;
DROP TABLE IF EXISTS marketplace_items CASCADE;
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS follows CASCADE;
DROP TABLE IF EXISTS post_comments CASCADE;
DROP TABLE IF EXISTS post_likes CASCADE;
DROP TABLE IF EXISTS community_posts CASCADE;
DROP TABLE IF EXISTS donations CASCADE;
DROP TABLE IF EXISTS drop_off_centers CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS barangays CASCADE;

-- Then re-run migrations from 01_complete_schema.sql
```

## 📚 Additional Resources

- [📘 SUPABASE_SETUP_GUIDE.md](../../SUPABASE_SETUP_GUIDE.md) - Complete setup guide
- [🔐 ENV_SETUP_GUIDE.md](../../ENV_SETUP_GUIDE.md) - Environment configuration
- [📊 DATABASE_SCHEMA.md](../../DATABASE_SCHEMA.md) - Schema documentation
- [Supabase Docs](https://supabase.com/docs) - Official documentation

## 🆘 Need Help?

1. Check the troubleshooting sections in SUPABASE_SETUP_GUIDE.md
2. Review Supabase logs in the dashboard
3. Ensure all prerequisites are met
4. Verify environment variables are set

---

**Ready to build?** Start with the automated setup script or follow the manual steps above! 🚀
