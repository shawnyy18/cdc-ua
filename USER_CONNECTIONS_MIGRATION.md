# User Connections Migration Guide

## 🎯 What This Migration Does

This migration adds the follow/unfollow functionality to your application:

- Creates `user_connections` table to track followers/following
- Adds `followers_count` and `following_count` columns to `users` table
- Sets up automatic count updates via triggers
- Enables Row Level Security (RLS) policies

## ✅ Steps to Apply Migration

### Option 1: Using Supabase Studio (Recommended)

1. **Open Supabase Studio SQL Editor:**
   - Go to https://supabase.com/dashboard/project/yxoxxrbukjyioyfveaml/sql/new
2. **Copy the SQL from the migration file:**

   - Open `supabase/migrations/06_create_user_connections.sql`
   - Copy ALL the SQL content

3. **Paste and Run:**
   - Paste the SQL into the SQL Editor
   - Click "Run" button
   - Wait for success message

### Option 2: Using psql Command Line

```bash
# If you have psql installed and your database password:
PGPASSWORD="your_password" psql \
  "postgresql://postgres.yxoxxrbukjyioyfveaml:[PASSWORD]@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres" \
  -f supabase/migrations/06_create_user_connections.sql
```

Replace `[PASSWORD]` with your actual database password (found in Supabase Dashboard > Settings > Database).

### Option 3: Using Supabase CLI (if issues persist)

```bash
# Link your project (if not already linked)
supabase link --project-ref yxoxxrbukjyioyfveaml

# Push just this migration
# Copy the migration content and run it through the dashboard
```

## 🔍 Verify Migration Success

After running the migration, verify it worked:

1. **Check table exists:**

   ```sql
   SELECT * FROM information_schema.tables
   WHERE table_name = 'user_connections';
   ```

2. **Check new columns:**

   ```sql
   SELECT column_name FROM information_schema.columns
   WHERE table_name = 'users'
   AND column_name IN ('followers_count', 'following_count');
   ```

3. **Test follow functionality:**
   - Go to community page
   - Click on a user's profile
   - Click the "Follow" button
   - Check if follower count increases

## 📝 What Gets Created

### Tables

- `user_connections` - Stores follower/following relationships

### Columns (added to `users` table)

- `followers_count` - Number of followers
- `following_count` - Number of users being followed

### Functions

- `update_connection_counts()` - Auto-updates counts when users follow/unfollow

### Triggers

- `trigger_update_connection_counts` - Calls the update function

### RLS Policies

- Anyone can view connections
- Users can follow others (create connections)
- Users can unfollow (delete their own connections)

## ⚠️ Troubleshooting

### "Policy already exists" error

This is safe to ignore - it means that policy was already created.

### "Table already exists" error

This is safe to ignore - the migration uses `IF NOT EXISTS` checks.

### "Column already exists" error

This is safe to ignore - the migration uses `IF NOT EXISTS` checks.

### Can't see follower counts

Make sure you refresh your browser after running the migration.

## 🎉 After Migration

Once complete, users can:

- ✅ Follow/unfollow other users
- ✅ See follower and following counts on profiles
- ✅ View who they're following
- ✅ See who follows them

The follow button on user profiles will be fully functional!

## 📞 Need Help?

If you encounter issues:

1. Check Supabase logs in Dashboard > Logs
2. Verify your database password is correct
3. Ensure you have permission to modify the database
4. Try running each section of the SQL separately
