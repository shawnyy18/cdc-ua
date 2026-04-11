# USER DELETION FIX - COMPLETE GUIDE

## Problem

When attempting to delete users from the Supabase dashboard or through the admin interface, you encounter the error:

```
Failed to delete selected users: Database error deleting user
```

## Root Cause

The issue stems from **missing RLS (Row Level Security) DELETE policies** on the users table. While the database schema has `ON DELETE CASCADE` foreign key constraints, RLS policies are blocking the deletion operation even for admins.

## What's Been Fixed

### 1. **Added DELETE Policy for Admins**

- Admins can now delete users through the authenticated role
- Policy: `"Admins can delete users"`

### 2. **Service Role Bypass Policies**

- Added service_role bypass policies for all tables
- Ensures cascade deletes work properly
- Critical for database integrity during user deletion

### 3. **User Deletion Function**

- Created `delete_user_completely(UUID)` function
- Handles deletion from both `auth.users` and `public.users`
- Returns JSON with success/error status
- Uses `SECURITY DEFINER` for proper permissions

### 4. **Updated Schema Files**

- `supabase/setup/02_row_level_security.sql` - Added DELETE policy and service_role bypasses
- `supabase/setup/03_functions_triggers.sql` - Added user deletion function

## How to Apply the Fix

### Option 1: Run Migration File (Recommended)

1. Open Supabase Dashboard
2. Go to **SQL Editor**
3. Copy and paste the contents of: `supabase/migrations/fix_user_deletion.sql`
4. Click **Run**

### Option 2: Apply Via Supabase CLI

```bash
cd /Users/shawnashlee/Desktop/Startup-CDC-Only

# Apply the migration
supabase db push
```

### Option 3: Manual Application

If you prefer to apply policies one by one:

#### Step 1: Add DELETE Policy for Users Table

```sql
CREATE POLICY "Admins can delete users"
  ON users FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND is_admin = true
    )
  );
```

#### Step 2: Add Service Role Bypass Policies

```sql
DO $$
DECLARE
    r RECORD;
    pol_name TEXT;
BEGIN
    FOR r IN (
        SELECT schemaname, tablename
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename IN (
            'users', 'donations', 'community_posts', 'post_likes',
            'marketplace_items', 'seller_profiles', 'user_achievements',
            'transactions', 'notifications', 'user_connections', 'post_comments',
            'follows'
        )
    ) LOOP
        pol_name := 'service_role_all_' || r.tablename;

        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(pol_name) ||
                ' ON ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename);

        EXECUTE 'CREATE POLICY ' || quote_ident(pol_name) ||
                ' ON ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename) ||
                ' FOR ALL TO service_role USING (true) WITH CHECK (true)';
    END LOOP;
END $$;
```

#### Step 3: Grant Permissions

```sql
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;
```

## Testing the Fix

### Test 1: Delete a Test User via Supabase Dashboard

1. Go to **Authentication** → **Users**
2. Find a test user
3. Click the **trash icon** to delete
4. User should be deleted successfully

### Test 2: Verify Cascade Deletion

```sql
-- Create a test user with relational data
-- Then delete and verify all related records are removed

SELECT * FROM users WHERE email = 'test@example.com';
SELECT * FROM donations WHERE user_id = '<test-user-id>';
-- Delete the user
-- Verify all related records are gone
```

### Test 3: Use the Delete Function

```sql
-- Test the delete_user_completely function
SELECT delete_user_completely('<user-uuid>');

-- Expected response:
{
  "success": true,
  "message": "User deleted successfully",
  "user_id": "xxx-xxx-xxx",
  "deleted_from_public_users": true,
  "deleted_from_auth_users": true
}
```

## What Gets Deleted (Cascade)

When a user is deleted, the following related records are automatically removed due to `ON DELETE CASCADE`:

1. ✅ **donations** - All user donations
2. ✅ **community_posts** - All user posts
3. ✅ **post_likes** - All likes by the user
4. ✅ **post_comments** - All comments by the user
5. ✅ **user_connections** (follows) - All follow relationships
6. ✅ **notifications** - All notifications sent to/from user
7. ✅ **marketplace_items** - All items listed by user
8. ✅ **seller_profiles** - Seller profile if exists
9. ✅ **user_achievements** - All achievements earned
10. ✅ **transactions** - All transactions made

## Security Considerations

### Who Can Delete Users?

- ✅ **Admins** (via authenticated role with is_admin=true)
- ✅ **Service Role** (Supabase backend operations)
- ❌ **Regular Users** (cannot delete other users)

### RLS Policy Order

1. Service role bypasses ALL RLS policies
2. Admin role checks for `is_admin=true`
3. Regular users have no DELETE permission on users table

## Troubleshooting

### Error: "permission denied for table users"

**Solution**: Verify the DELETE policy exists:

```sql
SELECT * FROM pg_policies WHERE tablename = 'users' AND cmd = 'DELETE';
```

### Error: "update or delete on table users violates foreign key"

**Solution**: Check foreign key constraints:

```sql
SELECT
    tc.table_name,
    kcu.column_name,
    rc.delete_rule
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.referential_constraints AS rc
  ON tc.constraint_name = rc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
AND ccu.table_name = 'users';
```

All should show `delete_rule = 'CASCADE'`

### Error: "Failed to delete user from auth schema"

**Solution**: Make sure you're using service_role key in your application for deletion operations.

## Migration Applied Successfully?

Run this query to verify:

```sql
-- Check if DELETE policy exists
SELECT policyname FROM pg_policies
WHERE tablename = 'users' AND cmd = 'DELETE';

-- Should return: "Admins can delete users"

-- Check if service_role bypass exists
SELECT policyname FROM pg_policies
WHERE tablename = 'users' AND policyname LIKE 'service_role%';

-- Should return: "service_role_all_users"

-- Check if function exists
SELECT proname FROM pg_proc
WHERE proname = 'delete_user_completely';

-- Should return: "delete_user_completely"
```

## Next Steps

After applying the fix:

1. ✅ Test user deletion in Supabase Dashboard
2. ✅ Test user deletion via your admin interface
3. ✅ Verify cascade deletes work properly
4. ✅ Update any admin UI code if needed

## Files Changed

- ✅ `supabase/migrations/fix_user_deletion.sql` (NEW)
- ✅ `supabase/setup/02_row_level_security.sql` (UPDATED)
- ✅ `supabase/setup/03_functions_triggers.sql` (UPDATED)

---

**Last Updated**: February 20, 2026
**Status**: ✅ Fix Completed and Ready to Apply
