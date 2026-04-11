# Migration Application Order - IMPORTANT!

Apply these Supabase migrations **in this exact order**:

## Required Order (for hazardous feature):

### 1️⃣ Migration 38 - Allow N/A condition (APPLY FIRST)

**File:** `supabase/migrations/38_allow_hazardous_condition.sql`  
**Purpose:** Updates the `condition` column constraint to accept 'n/a' value  
**Status:** ⚠️ **YOU MAY NEED TO APPLY THIS - it's likely the cause of your error**

### 2️⃣ Migration 39 - Add hazardous asset fields

**File:** `supabase/migrations/39_add_hazardous_asset_fields.sql`  
**Purpose:** Adds new columns for tracking hazardous items

### 3️⃣ Migration 40 - Add hazardous triggers

**File:** `supabase/migrations/40_add_hazardous_item_triggers.sql`  
**Purpose:** Adds auto-locking logic for hazardous items

---

## Why the Error Occurred

Your Supabase database is **rejecting** `condition: 'n/a'` because the old constraint still exists:

```sql
-- OLD (still in your database)
CHECK (condition IN ('working', 'broken', 'damaged'))

-- NEW (what migration 38 creates)
CHECK (condition IS NULL OR condition IN ('working', 'broken', 'damaged', 'n/a', 'consumable'))
```

---

## 🔧 Fix It Now

### Step 1: Apply Migration 38 First

1. Go to **Supabase Dashboard** → **SQL Editor** → **New Query**
2. Copy the entire contents of `supabase/migrations/38_allow_hazardous_condition.sql`
3. **Run** and wait for success

![Expected output: "Finished in X ms"]

### Step 2: Verify the Fix

Run this query to confirm the constraint was updated:

```sql
SELECT pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conname = 'donations_condition_check';
```

**Should return:**

```
CHECK (condition IS NULL OR condition IN ('working', 'broken', 'damaged', 'n/a', 'consumable'))
```

If you see the old constraint without 'n/a', manually create it:

```sql
-- Drop the old constraint
ALTER TABLE donations DROP CONSTRAINT donations_condition_check;

-- Create the new one
ALTER TABLE donations
  ADD CONSTRAINT donations_condition_check
  CHECK (
    condition IS NULL
    OR condition IN ('working', 'broken', 'damaged', 'n/a', 'consumable')
  );
```

### Step 3: Try the Submission Again

Once the constraint is updated, submit a hazardous item from `app/hazardous-submission/page.tsx` and it should work!

---

## Full Migration Checklist

- [ ] ✅ Migration 38 applied (allows `'n/a'` condition)
- [ ] ✅ Migration 39 applied (adds hazardous columns)
- [ ] ✅ Migration 40 applied (adds triggers)
- [ ] ✅ Constraint verification query passes
- [ ] ✅ Test submission succeeds
