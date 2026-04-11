# 🧪 Barangay-Scoped Admin Testing Guide

Complete guide to test the barangay-scoped admin feature in EcoKonek PH.

---

## 📋 Prerequisites

1. **Database Migration Applied**

   - Run migration `07_barangay_scoped_admin.sql` in Supabase SQL Editor
   - Verify barangays table created
   - Verify columns added to users, donations, drop_off_centers

2. **Test Accounts Required**
   - 1 Super Admin (no barangay assignment)
   - 2 Barangay Admins (different barangays)
   - 2-3 Regular Users

---

## 🚀 Step 1: Apply Database Migration

### Via Supabase Dashboard (Recommended)

1. **Login to Supabase**

   - Go to https://app.supabase.com
   - Select your project: `yxoxxrbukjyioyfveaml`

2. **Open SQL Editor**

   - Click "SQL Editor" in left sidebar
   - Click "New Query"

3. **Run Migration**

   ```sql
   -- Copy and paste entire content from:
   -- supabase/migrations/07_barangay_scoped_admin.sql

   -- Then click "Run" or press Cmd/Ctrl + Enter
   ```

4. **Verify Migration Success**

   ```sql
   -- Check barangays created
   SELECT * FROM barangays ORDER BY name;
   -- Should show: Lagundi, Santo Rosario, Pandacaqui, etc.

   -- Check columns added
   SELECT column_name, data_type
   FROM information_schema.columns
   WHERE table_name = 'users' AND column_name = 'barangay_id';
   -- Should return 1 row

   -- Check RLS policies
   SELECT policyname, tablename
   FROM pg_policies
   WHERE policyname LIKE '%barangay%';
   -- Should show barangay admin policies
   ```

---

## 👥 Step 2: Create Test Users

### 2.1 Create Super Admin

1. **Register a new account** (or use existing)

   - Email: `superadmin@ecokonek.test`
   - Password: `Test123!`

2. **Make user a Super Admin** (via SQL Editor)

   ```sql
   -- Set user as admin with NO barangay (super admin)
   UPDATE users
   SET is_admin = true, barangay_id = NULL
   WHERE email = 'superadmin@ecokonek.test';
   ```

3. **Verify**
   ```sql
   SELECT email, is_admin, barangay_id,
          barangays.name as barangay_name
   FROM users
   LEFT JOIN barangays ON users.barangay_id = barangays.id
   WHERE email = 'superadmin@ecokonek.test';
   -- Should show: is_admin = true, barangay_id = NULL
   ```

### 2.2 Create Barangay Admin for Lagundi

1. **Register new account**

   - Email: `lagundi.admin@ecokonek.test`
   - Password: `Test123!`

2. **Assign to Lagundi Barangay** (via SQL Editor)

   ```sql
   -- Set user as barangay admin for Lagundi
   UPDATE users
   SET is_admin = true,
       barangay_id = (SELECT id FROM barangays WHERE name = 'Lagundi' LIMIT 1)
   WHERE email = 'lagundi.admin@ecokonek.test';
   ```

3. **Verify**
   ```sql
   SELECT email, is_admin,
          barangays.name as barangay_name,
          barangays.municipality
   FROM users
   LEFT JOIN barangays ON users.barangay_id = barangays.id
   WHERE email = 'lagundi.admin@ecokonek.test';
   -- Should show: is_admin = true, barangay_name = 'Lagundi'
   ```

### 2.3 Create Barangay Admin for Santo Rosario

1. **Register new account**

   - Email: `santorosario.admin@ecokonek.test`
   - Password: `Test123!`

2. **Assign to Santo Rosario** (via SQL Editor)
   ```sql
   UPDATE users
   SET is_admin = true,
       barangay_id = (SELECT id FROM barangays WHERE name = 'Santo Rosario' LIMIT 1)
   WHERE email = 'santorosario.admin@ecokonek.test';
   ```

### 2.4 Create Regular Users

Create 2-3 regular users (not admin) for testing donations:

- `user1@test.com`
- `user2@test.com`
- `user3@test.com`

Optionally assign them to barangays:

```sql
UPDATE users
SET barangay_id = (SELECT id FROM barangays WHERE name = 'Lagundi' LIMIT 1)
WHERE email = 'user1@test.com';

UPDATE users
SET barangay_id = (SELECT id FROM barangays WHERE name = 'Santo Rosario' LIMIT 1)
WHERE email = 'user2@test.com';
```

---

## 📦 Step 3: Create Test Donations

### 3.1 Assign Drop-off Centers to Barangays

```sql
-- Ensure drop-off centers are assigned to barangays
UPDATE drop_off_centers
SET barangay_id = (SELECT id FROM barangays WHERE name = 'Lagundi' LIMIT 1)
WHERE name LIKE '%Lagundi%';

-- If you have other centers, assign them too:
UPDATE drop_off_centers
SET barangay_id = (SELECT id FROM barangays WHERE name = 'Santo Rosario' LIMIT 1)
WHERE name LIKE '%Santo Rosario%' OR name LIKE '%Mexico%';
```

### 3.2 Create Sample Donations

**Option A: Via UI (Recommended)**

1. Login as `user1@test.com`
2. Go to Donate page
3. Fill form:
   - Device Type: Laptop
   - Condition: Working
   - Drop-off Center: Lagundi Barangay Drop-off
4. Submit donation
5. Repeat 2-3 times with different device types

6. Login as `user2@test.com`
7. Create 2-3 donations at different centers

**Option B: Via SQL (Faster)**

```sql
-- Create donations for Lagundi barangay
INSERT INTO donations (
  user_id,
  device_type,
  brand,
  model,
  condition,
  drop_off_center,
  eco_points_earned,
  co2_saved,
  status,
  barangay_id
) VALUES
(
  (SELECT id FROM users WHERE email = 'user1@test.com' LIMIT 1),
  'laptop',
  'Dell',
  'Inspiron 15',
  'working',
  'Lagundi Barangay Drop-off',
  150,
  18.75,
  'pending',
  (SELECT id FROM barangays WHERE name = 'Lagundi' LIMIT 1)
),
(
  (SELECT id FROM users WHERE email = 'user1@test.com' LIMIT 1),
  'smartphone',
  'Samsung',
  'Galaxy S20',
  'broken',
  'Lagundi Barangay Drop-off',
  50,
  6.25,
  'pending',
  (SELECT id FROM barangays WHERE name = 'Lagundi' LIMIT 1)
);

-- Create donations for Santo Rosario barangay
INSERT INTO donations (
  user_id,
  device_type,
  brand,
  model,
  condition,
  drop_off_center,
  eco_points_earned,
  co2_saved,
  status,
  barangay_id
) VALUES
(
  (SELECT id FROM users WHERE email = 'user2@test.com' LIMIT 1),
  'tablet',
  'iPad',
  'Air 2',
  'working',
  'Santo Rosario Center',
  100,
  12.5,
  'pending',
  (SELECT id FROM barangays WHERE name = 'Santo Rosario' LIMIT 1)
);
```

### 3.3 Verify Donations Created

```sql
SELECT
  d.id,
  u.email as donor,
  d.device_type,
  d.status,
  b.name as barangay,
  b.municipality
FROM donations d
JOIN users u ON d.user_id = u.id
LEFT JOIN barangays b ON d.barangay_id = b.id
ORDER BY d.created_at DESC;
```

---

## ✅ Step 4: Test Barangay Scoping

### Test 4.1: Super Admin Access

1. **Login** as `superadmin@ecokonek.test`
2. **Navigate** to `/admin`
3. **Expected Results:**
   - Dashboard header shows: **"Super Admin (All Barangays)"**
   - Can see ALL donations from ALL barangays
   - Statistics show total across all barangays
   - Can approve/reject donations from any barangay

### Test 4.2: Lagundi Admin Access

1. **Login** as `lagundi.admin@ecokonek.test`
2. **Navigate** to `/admin`
3. **Expected Results:**

   - Dashboard header shows: **"Lagundi, Mexico"**
   - Subtitle shows: **"• Barangay-Scoped Access"**
   - Can ONLY see donations from **Lagundi barangay**
   - Cannot see Santo Rosario or other barangay donations
   - Statistics only count Lagundi donations
   - Can only approve/reject Lagundi donations

4. **Verify Scoping**
   - Count donations visible
   - Verify all have "Lagundi" as barangay
   - Try to access other barangay's donations (should fail via RLS)

### Test 4.3: Santo Rosario Admin Access

1. **Login** as `santorosario.admin@ecokonek.test`
2. **Navigate** to `/admin`
3. **Expected Results:**
   - Dashboard shows: **"Santo Rosario, Mexico"**
   - Can ONLY see Santo Rosario donations
   - Cannot see Lagundi donations
   - Can only approve/reject Santo Rosario donations

### Test 4.4: Cross-Barangay Isolation

**Verify Lagundi admin cannot modify Santo Rosario donations:**

```sql
-- As Lagundi admin user, try to update Santo Rosario donation
-- This should FAIL due to RLS policy

-- Get a Santo Rosario donation ID first
SELECT id FROM donations
WHERE barangay_id = (SELECT id FROM barangays WHERE name = 'Santo Rosario' LIMIT 1)
LIMIT 1;

-- Try to update it as Lagundi admin (will fail in app due to RLS)
-- The UI won't even show it, but if you try via SQL with their token, it fails
```

---

## 🔍 Step 5: Verify RLS Policies

### Test 5.1: Check Policy Enforcement

```sql
-- Login as Lagundi admin in Supabase and run:
SELECT * FROM donations;
-- Should ONLY show Lagundi donations

-- Login as Super Admin and run:
SELECT * FROM donations;
-- Should show ALL donations
```

### Test 5.2: Test Helper Function

```sql
-- As logged-in admin, check your barangay
SELECT get_admin_barangay_id();
-- Returns: barangay UUID for barangay admins, NULL for super admins
```

### Test 5.3: View Statistics

```sql
-- Check barangay stats view
SELECT * FROM barangay_donation_stats
ORDER BY barangay_name;

-- Should show aggregated stats per barangay
```

---

## 🎯 Step 6: UI Testing Checklist

### Dashboard Elements

- [ ] Barangay name displays correctly in header
- [ ] "Barangay-Scoped Access" badge shows for barangay admins
- [ ] "Super Admin (All Barangays)" shows for super admins
- [ ] Statistics only count scoped donations
- [ ] Filter tabs work correctly
- [ ] Donation table only shows scoped records
- [ ] Approve/Reject buttons only work on scoped donations

### Edge Cases

- [ ] Admin with barangay_id = NULL sees all donations
- [ ] Admin with barangay_id set sees only their barangay
- [ ] Donations without barangay_id are only visible to super admin
- [ ] Regular users cannot access /admin route
- [ ] Non-admin users redirected to /dashboard

---

## 🐛 Troubleshooting

### Issue: Admin sees no donations

**Solution:**

```sql
-- Check if admin's barangay_id is set correctly
SELECT email, is_admin, barangay_id,
       barangays.name as barangay
FROM users
LEFT JOIN barangays ON users.barangay_id = barangays.id
WHERE email = 'your-admin@email.com';

-- Check if donations have barangay_id assigned
SELECT id, device_type, barangay_id,
       barangays.name as barangay
FROM donations
LEFT JOIN barangays ON donations.barangay_id = barangays.id
LIMIT 10;

-- If donations missing barangay_id, assign them:
UPDATE donations
SET barangay_id = (
  SELECT barangay_id FROM drop_off_centers
  WHERE name = donations.drop_off_center
  LIMIT 1
)
WHERE barangay_id IS NULL;
```

### Issue: RLS policy not working

**Solution:**

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity
FROM pg_tables
WHERE tablename = 'donations';
-- rowsecurity should be true

-- Check policies exist
SELECT * FROM pg_policies
WHERE tablename = 'donations'
AND policyname LIKE '%barangay%';

-- Re-apply policies if needed (from migration 07)
```

### Issue: Barangay name not showing

**Solution:**

```sql
-- Verify foreign key relationship
SELECT
  u.email,
  u.barangay_id,
  b.name as barangay_name
FROM users u
LEFT JOIN barangays b ON u.barangay_id = b.id
WHERE u.is_admin = true;

-- If barangay_id exists but name is null, check barangays table
SELECT * FROM barangays;
```

---

## 📊 Expected Test Results Summary

| Admin Type          | Barangay Assignment | Can See            | Can Modify              |
| ------------------- | ------------------- | ------------------ | ----------------------- |
| Super Admin         | NULL                | All donations      | All donations           |
| Lagundi Admin       | Lagundi UUID        | Lagundi only       | Lagundi only            |
| Santo Rosario Admin | Santo Rosario UUID  | Santo Rosario only | Santo Rosario only      |
| Regular User        | Any/NULL            | Own donations      | Own donations (limited) |

---

## 🎓 Testing Scenarios

### Scenario 1: New Donation Submitted

1. User1 (Lagundi resident) submits laptop donation at Lagundi center
2. **Expected:**
   - Donation auto-assigned `barangay_id` = Lagundi
   - Lagundi admin sees it immediately
   - Santo Rosario admin does NOT see it
   - Super admin sees it

### Scenario 2: Admin Approves Donation

1. Lagundi admin approves a Lagundi donation
2. **Expected:**
   - Status changes to "accepted"
   - User earns eco-points and CO₂ savings
   - Barangay stats update
   - Other barangay admins don't see this action

### Scenario 3: Cross-Barangay Attempt

1. Lagundi admin tries to approve Santo Rosario donation (via direct API call)
2. **Expected:**
   - RLS policy blocks the update
   - Returns permission denied error
   - Donation status unchanged

---

## 🚀 Quick Verification Script

Run this SQL to verify everything is set up correctly:

```sql
-- 1. Check barangays exist
SELECT COUNT(*) as barangay_count FROM barangays;
-- Expected: >= 7

-- 2. Check admin users created
SELECT
  email,
  is_admin,
  barangays.name as barangay,
  CASE
    WHEN barangay_id IS NULL THEN 'Super Admin'
    ELSE 'Barangay Admin'
  END as admin_type
FROM users
LEFT JOIN barangays ON users.barangay_id = barangays.id
WHERE is_admin = true;
-- Expected: At least 3 admins (1 super, 2 barangay)

-- 3. Check donations have barangay assignments
SELECT
  barangays.name as barangay,
  COUNT(*) as donation_count
FROM donations
LEFT JOIN barangays ON donations.barangay_id = barangays.id
GROUP BY barangays.name;
-- Expected: Donations distributed across barangays

-- 4. Check RLS policies active
SELECT policyname, tablename, cmd
FROM pg_policies
WHERE tablename = 'donations'
AND policyname LIKE '%barangay%';
-- Expected: 2 policies (SELECT and UPDATE for barangay admins)

-- 5. Test stats view
SELECT * FROM barangay_donation_stats;
-- Expected: Stats for each barangay
```

---

## ✅ Test Completion Checklist

- [ ] Migration 07 applied successfully
- [ ] Barangays table has 7+ barangays
- [ ] Users table has barangay_id column
- [ ] Donations table has barangay_id column
- [ ] Super admin created (barangay_id = NULL)
- [ ] 2+ Barangay admins created (assigned to different barangays)
- [ ] 5+ Test donations created across barangays
- [ ] Super admin sees all donations
- [ ] Barangay admins see only their barangay
- [ ] RLS policies prevent cross-barangay access
- [ ] Dashboard shows correct barangay name
- [ ] Statistics accurate per scope
- [ ] Approve/Reject works within scope only
- [ ] Regular users redirected from /admin

---

## 📞 Support

If tests fail:

1. Check migration applied: `SELECT * FROM barangays;`
2. Verify RLS enabled: `SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'donations';`
3. Check admin assignments: `SELECT email, is_admin, barangay_id FROM users WHERE is_admin = true;`
4. Review browser console for errors
5. Check Supabase logs in dashboard

---

**Test Date:** ******\_\_\_******  
**Tested By:** ******\_\_\_******  
**Result:** ☐ Pass ☐ Fail  
**Notes:** **********************\_\_\_**********************
