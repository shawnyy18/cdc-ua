# 🔍 Debug Registration Issue

## ✅ Fixes Applied

I've updated the auth handler with:

1. **Better error handling** - Now catches and logs database insert errors
2. **All required fields** - Added `donated_devices` and `recycled_devices`
3. **Proper null handling** - Phone field can be null
4. **Detailed error messages** - Returns actual database error to help debug

## 🧪 How to See the Actual Error

### Option 1: Browser Console (Easiest)

1. Open **Developer Tools** (F12 or Right-click > Inspect)
2. Go to the **Console** tab
3. Try to register again
4. Look for the error message - it should now show the actual database error

### Option 2: Network Tab

1. Open **Developer Tools** (F12)
2. Go to the **Network** tab
3. Click "Clear" to clear old requests
4. Try to register again
5. Click on the `/api/supabase/functions/auth-handler` request
6. Click on the **Response** tab
7. You'll see the full error response with details

### Option 3: Server Logs

The server should now log errors to the terminal. Check your terminal running `npm run dev` for lines like:

```
Database error saving user profile: {...}
```

## 🔧 Common Database Errors and Solutions

### Error: "duplicate key value violates unique constraint"

**Cause:** Username or email already exists in database  
**Solution:**

- Try a different username
- Try a different email
- Or clear the database:

```sql
-- In Supabase SQL Editor
DELETE FROM users WHERE email = 'your@email.com';
```

### Error: "null value in column violates not-null constraint"

**Cause:** Missing required field  
**Solution:** Already fixed! The code now includes all required fields.

### Error: "new row violates row-level security policy"

**Cause:** RLS policy preventing insert  
**Solution:** Check if INSERT policy exists for users table:

```sql
-- In Supabase SQL Editor
SELECT * FROM pg_policies WHERE tablename = 'users';
```

Should see a policy like:

```sql
CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);
```

### Error: "permission denied for table users"

**Cause:** Anon key doesn't have permission  
**Solution:** Verify RLS policies are enabled:

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
```

## 🧪 Test Registration Step-by-Step

### Step 1: Make sure dev server is running

```bash
npm run dev
```

### Step 2: Open registration page

http://localhost:3000/register

### Step 3: Fill in the form

```
Username: testuser123
Email: test@example.com
Password: Test123456!
Full Name: Test User
Phone: (leave empty or enter: +63 912 345 6789)
```

### Step 4: Click "Create Account"

### Step 5: Check for success or error

**Success looks like:**

```json
{
  "success": true,
  "message": "Registration successful! Please check your email to verify your account.",
  "user": {...},
  "profile": {...}
}
```

**Error looks like:**

```json
{
  "success": false,
  "error": "Database error: [actual error message]",
  "details": {...}
}
```

## 🔍 Verify in Database

### Check if user was created in auth:

```sql
-- In Supabase Dashboard > Authentication > Users
-- You should see the email listed
```

### Check if user profile was created:

```sql
-- In Supabase SQL Editor
SELECT id, email, username, full_name, eco_points
FROM users
ORDER BY created_at DESC
LIMIT 5;
```

### Check for any orphaned auth users (created but no profile):

```sql
-- Users in auth.users but not in public.users
SELECT au.id, au.email, au.created_at
FROM auth.users au
LEFT JOIN public.users pu ON au.id = pu.id
WHERE pu.id IS NULL;
```

## 🚨 If You See "Database error saving new user"

The updated code now returns the **actual** database error message. Copy the exact error and we can fix it!

Common causes:

1. **Missing RLS policy** - Users table needs INSERT policy
2. **Field mismatch** - Database column doesn't match what we're inserting
3. **Data type error** - Wrong data type for a field
4. **Constraint violation** - Username/email already exists

## 🔄 Clear Previous Failed Attempts

If you tried to register before and got errors, you might have orphaned auth users:

```sql
-- In Supabase SQL Editor, delete any test users
DELETE FROM auth.users
WHERE email = 'test@example.com';

-- Also delete from users table if exists
DELETE FROM users
WHERE email = 'test@example.com';
```

## ✅ Next Steps

1. **Try registration again** - The error should now be more descriptive
2. **Copy the exact error message** - Share it so I can help fix it
3. **Check browser console** - Look for any JavaScript errors
4. **Check network tab** - See the full API response

The code is now much better at catching and reporting errors, so we should be able to see exactly what's wrong! 🚀
