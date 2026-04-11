# EcoKonek Supabase Database Setup

This directory contains all the SQL migration scripts needed to set up the EcoKonek database in Supabase.

## 📋 Database Structure

### Core Tables

- **users** - User profiles, statistics, and preferences
- **donations** - Device donation and recycling records
- **drop_off_centers** - Physical donation locations
- **community_posts** - User-generated community content
- **post_likes** - Post engagement tracking
- **marketplace_items** - Items listed for sale
- **seller_profiles** - Extended seller information
- **user_achievements** - Achievement tracking
- **transactions** - Financial transaction records

## 🚀 Deployment Instructions

### Method 1: Supabase SQL Editor (Recommended)

1. **Login to Supabase Dashboard**

   - Go to https://app.supabase.com
   - Select your project: `yxoxxrbukjyioyfveaml`

2. **Run Migration Scripts in Order**

   Navigate to SQL Editor in your Supabase dashboard and run each script in sequence:

   **Step 1: Create Tables and Indexes**

   ```
   Copy the contents of: migrations/01_create_tables.sql
   Paste into SQL Editor and click "Run"
   ```

   **Step 2: Set Up Row Level Security**

   ```
   Copy the contents of: migrations/02_row_level_security.sql
   Paste into SQL Editor and click "Run"
   ```

   **Step 3: Create Functions and Triggers**

   ```
   Copy the contents of: migrations/03_functions_triggers.sql
   Paste into SQL Editor and click "Run"
   ```

3. **Verify Installation**

   ```sql
   -- Check that all tables were created
   SELECT table_name
   FROM information_schema.tables
   WHERE table_schema = 'public'
   ORDER BY table_name;

   -- Should return:
   -- community_posts
   -- donations
   -- drop_off_centers
   -- marketplace_items
   -- post_likes
   -- seller_profiles
   -- transactions
   -- user_achievements
   -- users
   ```

### Method 2: Supabase CLI

If you have Supabase CLI installed:

```bash
# Login to Supabase
supabase login

# Link your project
supabase link --project-ref yxoxxrbukjyioyfveaml

# Run migrations
supabase db push

# Or run individual migrations
supabase db execute -f supabase/migrations/01_create_tables.sql
supabase db execute -f supabase/migrations/02_row_level_security.sql
supabase db execute -f supabase/migrations/03_functions_triggers.sql
```

## 🔐 Security Features

### Row Level Security (RLS)

All tables have RLS enabled with appropriate policies:

- **Users**: Can only modify their own profile
- **Donations**: Users can only view/create their own donations
- **Posts**: Public read, authenticated write
- **Marketplace**: Public read, seller-only write
- **Transactions**: Users can only view their own

### Authentication

- Uses Supabase Auth with JWT tokens
- Auto-creates user profile on signup
- Supports email/password and OAuth

## 📊 Database Functions

### Key Functions Available:

1. **`check_achievements(user_id)`** - Awards achievements based on user stats
2. **`get_user_rank(user_id)`** - Returns user's ranking by eco points
3. **`calculate_eco_impact(device_type, condition)`** - Calculates points and CO2 saved
4. **`search_users(search_term)`** - Searches users by name/username
5. **`get_community_feed(limit)`** - Returns community posts with user info

### Usage Examples:

```sql
-- Check and award achievements for a user
SELECT check_achievements('user-uuid-here');

-- Get user's current rank
SELECT get_user_rank('user-uuid-here');

-- Calculate eco impact for a laptop donation
SELECT * FROM calculate_eco_impact('laptop', 'working');

-- Search for users
SELECT * FROM search_users('john');

-- Get latest community posts
SELECT * FROM get_community_feed(20);
```

## 🎯 Default Data

The migration automatically creates 3 drop-off centers:

- EcoKonek Central Hub (San Fernando, Pampanga)
- EcoKonek Angeles Branch (Angeles City)
- EcoKonek Clark Branch (Clark Freeport Zone)

## 📝 Post-Deployment Tasks

### 1. Set Up Storage Buckets (Optional but Recommended)

In Supabase Dashboard > Storage:

**Create Buckets:**

- `profile-images` - For user profile pictures
- `device-images` - For donation device photos
- `marketplace-images` - For marketplace item photos

**Set Policies:**

```sql
-- Profile Images
-- Allow authenticated users to upload
-- Allow public read access

-- Device Images
-- Allow authenticated users to upload
-- Allow public read access

-- Marketplace Images
-- Allow sellers to upload
-- Allow public read access
```

### 2. Configure Email Templates (Optional)

In Supabase Dashboard > Authentication > Email Templates:

- Customize signup confirmation email
- Customize password reset email
- Add your branding

### 3. Enable Social Auth Providers (Optional)

In Supabase Dashboard > Authentication > Providers:

- Enable Google OAuth
- Enable Facebook OAuth
- Configure callback URLs

### 4. Set Up Realtime (Optional)

Enable realtime for tables that need live updates:

```sql
-- Enable realtime for community posts
ALTER PUBLICATION supabase_realtime ADD TABLE community_posts;

-- Enable realtime for post likes
ALTER PUBLICATION supabase_realtime ADD TABLE post_likes;
```

## 🧪 Testing the Database

Run these queries to verify everything works:

```sql
-- Test 1: Create a test user profile
INSERT INTO users (id, email, full_name, username)
VALUES (
  gen_random_uuid(),
  'test@ecokonek.ph',
  'Test User',
  'testuser'
);

-- Test 2: Create a donation
INSERT INTO donations (
  user_id,
  device_type,
  brand,
  model,
  condition,
  eco_points_earned,
  co2_saved
) VALUES (
  (SELECT id FROM users WHERE email = 'test@ecokonek.ph'),
  'smartphone',
  'Samsung',
  'Galaxy S21',
  'working',
  75,
  8.5
);

-- Test 3: Verify user stats (should be updated by triggers)
SELECT
  username,
  eco_points,
  total_donations,
  total_co2_saved
FROM users
WHERE email = 'test@ecokonek.ph';

-- Test 4: Check achievements
SELECT check_achievements(
  (SELECT id FROM users WHERE email = 'test@ecokonek.ph')
);

-- Clean up test data
DELETE FROM users WHERE email = 'test@ecokonek.ph';
```

## 🔧 Troubleshooting

### Common Issues:

1. **"relation already exists" error**

   - Some tables may already exist
   - Either drop existing tables or modify the migration to use `CREATE TABLE IF NOT EXISTS`

2. **"permission denied" error**

   - Ensure you're running as a superuser or service role
   - Check RLS policies aren't blocking the operation

3. **Trigger not firing**
   - Verify triggers are enabled: `SELECT * FROM pg_trigger;`
   - Check function exists: `SELECT * FROM pg_proc WHERE proname = 'function_name';`

### Useful Queries:

```sql
-- List all tables
SELECT tablename FROM pg_tables WHERE schemaname = 'public';

-- List all functions
SELECT proname FROM pg_proc WHERE pronamespace = 'public'::regnamespace;

-- List all triggers
SELECT trigger_name, event_object_table FROM information_schema.triggers;

-- Check RLS policies
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE schemaname = 'public';
```

## 📚 Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)

## 🆘 Support

If you encounter any issues during deployment:

1. Check the Supabase logs in your dashboard
2. Review the SQL error messages
3. Ensure all migrations ran in the correct order
4. Contact your development team

## ✅ Deployment Checklist

- [ ] Run migration 01_create_tables.sql
- [ ] Run migration 02_row_level_security.sql
- [ ] Run migration 03_functions_triggers.sql
- [ ] Verify all tables exist
- [ ] Verify RLS policies are active
- [ ] Test database functions
- [ ] Create storage buckets (optional)
- [ ] Configure email templates (optional)
- [ ] Enable social auth providers (optional)
- [ ] Set up realtime subscriptions (optional)
- [ ] Run test queries to verify functionality
- [ ] Update .env file with correct credentials
