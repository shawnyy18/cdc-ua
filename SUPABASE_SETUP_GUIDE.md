# 🚀 EcoKonek Supabase Backend Setup Guide

Complete guide to building the Supabase backend from scratch.

## 📋 Prerequisites

Before starting, ensure you have:

- A Supabase account (signup at https://supabase.com)
- Node.js 18+ installed
- Git installed
- A text editor (VS Code recommended)

## 🎯 Overview

This guide will help you:

1. Create a new Supabase project
2. Set up the database schema (all tables)
3. Configure Row Level Security (RLS)
4. Create database functions and triggers
5. Set up storage buckets for images
6. Configure environment variables
7. Deploy and test

## 🏗️ Architecture

### Database Tables

**Core Tables:**

- `users` - User profiles and statistics
- `donations` - Device donations tracking
- `drop_off_centers` - Physical donation locations
- `community_posts` - User posts
- `post_likes` - Post engagement
- `post_comments` - Post comments
- `follows` - User follow relationships
- `notifications` - User notifications

**Barangay & Admin:**

- `barangays` - Barangay locations
- `audit_log` - Admin action tracking

**Marketplace (Optional):**

- `marketplace_items` - Items for sale
- `seller_profiles` - Seller information
- `transactions` - Payment records
- `user_achievements` - User milestones

**Learning (Optional):**

- `learning_modules` - Educational content
- `quizzes` - Quiz questions and answers
- `user_quiz_progress` - User learning progress

## 📝 Step-by-Step Setup

### Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in:
   - **Name**: `ecokonek-production` (or your choice)
   - **Database Password**: Generate a strong password (save this!)
   - **Region**: Choose closest to your users (e.g., Southeast Asia)
4. Click "Create new project"
5. Wait 2-3 minutes for setup to complete

### Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy and save these values:
   - **Project URL** (e.g., `https://abcdefgh.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`) - Keep this secret!

### Step 3: Set Up Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: For admin operations
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Optional: Google Gemini AI (for chatbot)
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-key-here
```

⚠️ **Never commit `.env.local` to Git!**

### Step 4: Run Database Migrations

You have two options:

#### Option A: Use Supabase Dashboard (Recommended for beginners)

1. Open your Supabase project dashboard
2. Navigate to **SQL Editor** (left sidebar)
3. Click **New Query**
4. Copy and paste the contents of `supabase/setup/01_complete_schema.sql`
5. Click **Run** (bottom right)
6. Repeat for each migration file in order

#### Option B: Use Supabase CLI (Recommended for developers)

1. Install Supabase CLI:

   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:

   ```bash
   supabase login
   ```

3. Link to your project:

   ```bash
   supabase link --project-ref your-project-id
   ```

4. Run migrations:
   ```bash
   supabase db push
   ```

### Step 5: Set Up Storage Buckets

1. In Supabase dashboard, go to **Storage** (left sidebar)
2. Click **New bucket**
3. Create these buckets:

**Bucket 1: Profile Images**

- Name: `profile-images`
- Public bucket: ✅ Yes
- File size limit: 2MB
- Allowed MIME types: `image/jpeg, image/png, image/webp`

**Bucket 2: Post Images**

- Name: `post-images`
- Public bucket: ✅ Yes
- File size limit: 5MB
- Allowed MIME types: `image/jpeg, image/png, image/webp`

**Bucket 3: Marketplace Images**

- Name: `marketplace-images`
- Public bucket: ✅ Yes
- File size limit: 5MB
- Allowed MIME types: `image/jpeg, image/png, image/webp`

4. For each bucket, set up policies:
   - Go to bucket → **Policies** tab
   - Add policy: "Allow authenticated users to upload"
   - Add policy: "Allow public read access"

### Step 6: Configure Authentication

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider (enabled by default)
3. Optional: Enable **Google OAuth**:
   - Toggle Google ON
   - Get credentials from Google Cloud Console
   - Enter Client ID and Secret
4. Go to **Authentication** → **URL Configuration**
5. Set **Site URL**: `http://localhost:3000` (change for production)
6. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback` (for production)

### Step 7: Create Your First Admin User

1. Register a normal account through your app
2. Go to Supabase **SQL Editor**
3. Run this query (replace with your email):
   ```sql
   UPDATE users
   SET is_admin = true, is_active = true
   WHERE email = 'your-email@example.com';
   ```

### Step 8: Test the Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

4. Test these features:
   - ✅ Register a new account
   - ✅ Login with credentials
   - ✅ View dashboard
   - ✅ Create a donation
   - ✅ Post in community feed
   - ✅ Upload profile picture

### Step 9: Verify Database Setup

Run these queries in Supabase SQL Editor to verify:

```sql
-- Check all tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Count records in each table
SELECT
  'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'donations', COUNT(*) FROM donations
UNION ALL
SELECT 'community_posts', COUNT(*) FROM community_posts
UNION ALL
SELECT 'drop_off_centers', COUNT(*) FROM drop_off_centers
UNION ALL
SELECT 'barangays', COUNT(*) FROM barangays;

-- Check RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY tablename;
```

## 🔒 Security Best Practices

### 1. Row Level Security (RLS)

- ✅ All tables have RLS enabled
- ✅ Users can only read/write their own data
- ✅ Admins have elevated permissions scoped by barangay

### 2. API Keys

- ✅ Use **anon key** for frontend (public)
- ✅ Never expose **service_role key** to frontend
- ✅ Store keys in environment variables only

### 3. Storage Policies

- ✅ Limit file sizes (prevent abuse)
- ✅ Restrict MIME types (security)
- ✅ Users can only delete their own files

### 4. Rate Limiting

Consider adding rate limiting for:

- User registration (prevent spam)
- Donation submissions
- Community posts
- API requests

## 📊 Database Functions Reference

### User Functions

```sql
-- Get user profile with stats
SELECT * FROM get_user_profile('user-uuid');

-- Check if user is admin
SELECT is_admin FROM users WHERE id = 'user-uuid';
```

### Community Functions

```sql
-- Get community feed with like status
SELECT * FROM get_community_feed(current_user_id, limit, offset);

-- Toggle post like
SELECT toggle_like(post_id, user_id);

-- Get comments for post
SELECT * FROM get_comments_for_post(post_id);
```

### Follow Functions

```sql
-- Toggle follow
SELECT toggle_follow(follower_id, following_id);

-- Get followers list
SELECT * FROM get_followers_list(user_id);

-- Get following list
SELECT * FROM get_following_list(user_id);
```

## 🌍 Environment URLs

### Development

```
Frontend: http://localhost:3000
Backend: https://your-project.supabase.co
```

### Production

```
Frontend: https://yourdomain.com
Backend: https://your-project.supabase.co
```

## 📦 Storage Structure

```
profile-images/
  └── {user-id}/
      └── avatar.jpg

post-images/
  └── {post-id}/
      └── image.jpg

marketplace-images/
  └── {item-id}/
      └── product.jpg
```

## 🐛 Troubleshooting

### Issue: "relation does not exist"

**Solution**: Run all migrations in order (01, 02, 03, etc.)

### Issue: "permission denied for table"

**Solution**: Check RLS policies are configured correctly

### Issue: "JWT expired" or auth errors

**Solution**: Check environment variables are correct

### Issue: "Failed to fetch" in login

**Solution**: Verify NEXT_PUBLIC_SUPABASE_URL is set correctly

### Issue: Storage upload fails

**Solution**: Check bucket exists and policies allow uploads

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] All migrations applied successfully
- [ ] Storage buckets created with correct policies
- [ ] Environment variables set in production
- [ ] Admin users created
- [ ] RLS policies tested and working
- [ ] Redirect URLs updated for production domain
- [ ] Database backups enabled (Supabase dashboard)
- [ ] SSL/TLS enabled (automatic with Supabase)
- [ ] API rate limiting configured

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase RLS Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Next.js + Supabase Tutorial](https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs)
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Full schema reference
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deploy to Vercel

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Supabase logs in the dashboard
3. Check browser console for errors
4. Verify all environment variables are set

---

**Built with ❤️ for EcoKonek - Making tech donation easy and eco-friendly**
