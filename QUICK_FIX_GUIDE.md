# Quick Fix Guide - User Deletion

## ⚠️ Problem

Error when deleting users: `Failed to delete selected users: Database error deleting user`

## ✅ Solution

The SQL syntax errors have been fixed. Follow these steps:

---

## Step 1: Apply the Fix

### Option A: Via Supabase Dashboard (Recommended)

1. Open [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Go to **SQL Editor**
4. Open the file: `supabase/migrations/fix_user_deletion.sql`
5. Copy ALL contents and paste into SQL Editor
6. Click **Run**
7. Wait for "Success. No rows returned" message

### Option B: Via Command Line

```bash
cd /Users/shawnashlee/Desktop/Startup-CDC-Only
supabase db push
```

---

## Step 2: Test the Fix

### Test via SQL (Optional)

1. In Supabase **SQL Editor**, run: `supabase/migrations/test_user_deletion_fix.sql`
2. Check that all tests show ✅ PASSED

### Test via Dashboard

1. Go to **Authentication** → **Users**
2. Find a test user to delete
3. Click the trash icon
4. User should delete successfully ✅

---

## What Was Fixed

### 1. **SQL Syntax Errors** ✅

- Fixed unterminated DO blocks
- Wrapped RAISE NOTICE statements properly
- Added DROP IF EXISTS for all triggers and policies

### 2. **Missing DELETE Policy** ✅

- Added policy: "Admins can delete users"
- Admins can now delete users through authenticated role

### 3. **Service Role Bypass** ✅

- Added service_role bypass policies for all tables
- Ensures CASCADE deletes work properly

### 4. **User Deletion Function** ✅

- Created `delete_user_completely(UUID)` function
- Handles deletion from both `auth.users` and `public.users`

---

## Files Changed

✅ `supabase/migrations/fix_user_deletion.sql` - Main fix (run this!)
✅ `supabase/migrations/test_user_deletion_fix.sql` - Tests
✅ `supabase/setup/02_row_level_security.sql` - Updated for future rebuilds
✅ `supabase/setup/03_functions_triggers.sql` - Updated with DROP IF EXISTS

---

## Troubleshooting

### Error: "trigger already exists"

**Fixed!** All scripts now use `DROP TRIGGER IF EXISTS` before creating triggers.

### Error: "policy already exists"

**Fixed!** All scripts now use `DROP POLICY IF EXISTS` before creating policies.

### Error: "syntax error at or near RAISE"

**Fixed!** All RAISE NOTICE statements are now wrapped in DO blocks.

---

## What Gets Deleted (Cascade)

When a user is deleted, these records are automatically removed:

- ✅ All user donations
- ✅ All community posts
- ✅ All post likes and comments
- ✅ All follow relationships
- ✅ All notifications
- ✅ All marketplace items
- ✅ Seller profile
- ✅ User achievements
- ✅ All transactions

---

## Need Help?

See the full documentation: `USER_DELETION_FIX.md`

---

**Status**: ✅ Ready to apply
**Last Updated**: February 20, 2026
