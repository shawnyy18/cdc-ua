# Hazardous Waste & Consumables Database Setup Guide

This guide walks you through setting up the Supabase database for hazardous item tracking and disposal workflows.

## Overview

The hazardous submission feature requires:

- **3 existing migrations** (already applied)
- **2 new migrations** to add (migration #39 and #40)
- **1 API handler update** (to map form fields to database columns)

---

## Step 1: Apply Migration 39 - Add Hazardous Asset Fields

**File:** `supabase/migrations/39_add_hazardous_asset_fields.sql`

This migration adds the database columns needed to track hazardous items separately from standard devices.

### What it does:

- ✅ Adds `device_category` column ('standard' or 'hazardous-consumables')
- ✅ Adds `hazard_type` column (Ink/Toner, Batteries, Bulbs, E-waste scrap)
- ✅ Adds `quantity_weight` column (e.g., "5 cartridges", "2.3 kg")
- ✅ Adds `hazard_description` column (structured hazard state)
- ✅ Adds `is_hazardous_locked` flag (prevents reuse/donate workflows)
- ✅ Creates indexes for fast admin queries
- ✅ Adds constraint ensuring hazardous items are CDC assets with valid property/serial numbers

### How to apply (via Supabase Dashboard):

1. Go to **SQL Editor** in Supabase
2. Click **"New Query"**
3. Copy the contents of `supabase/migrations/39_add_hazardous_asset_fields.sql`
4. Paste into the editor
5. Click **"Run"** (top right)
6. Wait for success message

### What you should see:

```
Finished in 234ms
Executed 1 query
```

### Verify success:

```sql
-- Run this query to verify columns were added:
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'donations'
  AND column_name IN ( 'device_category', 'hazard_type', 'quantity_weight', 'is_hazardous_locked')
ORDER BY ordinal_position;
```

Expected output: 4 rows (device_category, hazard_type, quantity_weight, is_hazardous_locked)

---

## Step 2: Apply Migration 40 - Add Hazardous Item Triggers

**File:** `supabase/migrations/40_add_hazardous_item_triggers.sql`

This migration creates the business logic that automatically routes hazardous items to disposal and prevents admins from changing that routing.

### What it does:

- ✅ Creates trigger function: `lock_hazardous_items_on_insert()`
  - Auto-sets `is_hazardous_locked = true` and `disposition_type = 'dispose'` when hazardous item is submitted
- ✅ Creates trigger function: `prevent_hazardous_disposition_changes()`
  - Prevents admins from routing hazardous items to 'reallocate', 'donate', or 'void'
  - Only 'dispose' is allowed
- ✅ Creates helper function: `get_hazardous_items_for_disposal()`
  - Admin query to fetch all pending hazardous items with user info
- ✅ Creates helper function: `update_hazardous_disposition()`
  - Admin endpoint to approve/reject hazardous items for disposal

### How to apply (via Supabase Dashboard):

1. Go to **SQL Editor** in Supabase
2. Click **"New Query"**
3. Copy the contents of `supabase/migrations/40_add_hazardous_item_triggers.sql`
4. Paste into the editor
5. Click **"Run"** (top right)
6. Wait for success message

### What you should see:

```
Finished in 156ms
Executed 1 query
```

### Verify success:

```sql
-- Check that triggers were created:
SELECT trigger_name, event_object_table
FROM information_schema.triggers
WHERE event_object_table = 'donations'
  AND trigger_name LIKE 'trigger_hazardous%'
ORDER BY trigger_name;
```

Expected output: 2 rows

- `trigger_lock_hazardous_items_insert`
- `trigger_prevent_hazardous_disposition_changes`

---

## Step 3: Verify Full Hazardous Column Setup

Run this comprehensive check to ensure all columns and constraints exist:

```sql
-- Check columns
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'donations'
ORDER BY ordinal_position;

-- Look for these columns in output:
-- device_category, hazard_type, quantity_weight, hazard_description, is_hazardous_locked
```

---

## Step 4: Update the Donation API Handler (if not already done)

**File:** `app/api/supabase/functions/donation-handler/route.ts`

Make sure the API is mapping the form's `hazardousData` to the database columns:

```typescript
// In the 'create-donation' case:

const donation: any = {
  device_category: donationData.deviceCategory, // 'hazardous-consumables'
  device_type: donationData.deviceType, // 'Hazardous Waste & Consumables'
  brand: donationData.brand,
  model: donationData.model,
  condition: donationData.condition || "n/a", // 'N/A' for hazardous
  description: donationData.description,
  year: donationData.year,
  drop_off_center: donationData.dropOffCenter,
  is_cdc_asset: donationData.isCDCAsset,
  property_number: donationData.propertyNumber,
  serial_number: donationData.serialNumber,

  // ✅ NEW HAZARDOUS-SPECIFIC FIELDS:
  hazard_type: donationData.hazardousData?.hazardType || null,
  quantity_weight: donationData.hazardousData?.quantityWeight || null,
  hazard_description: donationData.description, // or use itemDescription from form
  is_hazardous_locked: donationData.deviceCategory === "hazardous-consumables",
};
```

---

## Step 5: Update Admin Dashboard (Optional)

When displaying donation items for admin review, add a check for hazardous items:

```typescript
// In admin donation list:

const { data: hazardousItems } = await supabase
  .from("donations")
  .select("*")
  .eq("device_category", "hazardous-consumables")
  .eq("is_hazardous_locked", true)
  .in("status", ["pending_evaluation", "reallocated"]);

// Display these with a warning badge:
// ⚠️ HAZARDOUS - FOR DISPOSAL ONLY
// Hazard Type: Batteries
// Quantity: 5
// CDC Asset: Yes (Property #ABC-123, Serial #SN-001)
// Disposition locked to: DISPOSE
```

When admin approves/rejects:

```typescript
// Instead of updating disposition_type manually, use the function:
const { data, error } = await supabase.rpc("update_hazardous_disposition", {
  p_donation_id: itemId,
  p_admin_id: currentAdminId,
  p_disposition_notes: "Approved for disposal - batteries properly contained",
  p_status: "disposed",
});
```

---

## Reference: Database Schema Additions

### New Columns in `donations` Table

| Column                | Type         | Nullable | Default    | Purpose                                         |
| --------------------- | ------------ | -------- | ---------- | ----------------------------------------------- |
| `device_category`     | VARCHAR(50)  | No       | 'standard' | Distinguishes hazardous from standard devices   |
| `hazard_type`         | VARCHAR(100) | Yes      | NULL       | Type of hazard (Batteries, Ink, Bulbs, E-waste) |
| `quantity_weight`     | VARCHAR(100) | Yes      | NULL       | Amount/weight of hazardous material             |
| `hazard_description`  | TEXT         | Yes      | NULL       | Detailed description of hazard state            |
| `is_hazardous_locked` | BOOLEAN      | No       | false      | Prevents changing disposition from disposal     |

### New Indexes

- `idx_donations_hazardous_category` - Fast lookup of all hazardous items
- `idx_donations_hazardous_locked` - Fast lookup of locked hazardous items

### New Functions

1. `get_hazardous_items_for_disposal(limit)` - Returns hazardous items for admin review
2. `update_hazardous_disposition(id, admin_id, notes, status)` - Admin approval function

### New Triggers

1. `trigger_lock_hazardous_items_insert` - Auto-locks hazardous items on submission
2. `trigger_prevent_hazardous_disposition_changes` - Prevents disposition changes

---

## Testing the Setup

### Test 1: Verify Auto-Lock on Insert

```sql
-- Simulate a hazardous item submission:
INSERT INTO donations (
  user_id,
  device_type,
  brand,
  model,
  condition,
  device_category,
  hazard_type,
  quantity_weight,
  is_cdc_asset,
  property_number,
  serial_number,
  eco_points_earned,
  co2_saved
)
VALUES (
  'a-valid-user-uuid',
  'Hazardous Waste & Consumables',
  'Generic',
  'Mixed Batteries',
  'N/A',
  'hazardous-consumables',
  'Batteries',
  '5 alkaline batteries',
  true,
  'PROP-2024-001',
  'SN-2024-BAT-001',
  0,
  0
);

-- Then verify the fields were auto-set:
SELECT
  id,
  device_category,
  hazard_type,
  is_hazardous_locked,
  disposition_type
FROM donations
WHERE device_category = 'hazardous-consumables'
LIMIT 1;

-- Expected result:
-- is_hazardous_locked = true
-- disposition_type = 'dispose'
```

### Test 2: Prevent Disposition Change

```sql
-- Try to change disposition to 'donate' (should fail):
UPDATE donations
SET disposition_type = 'donate'
WHERE device_category = 'hazardous-consumables'
  AND is_hazardous_locked = true
LIMIT 1;

-- Expected error:
-- ERROR: Hazardous items can only be disposed...
```

---

## Troubleshooting

### Migration fails with "column already exists"

- This is expected if you've already run the migration. Safe to re-run.

### Trigger function compilation error

- Check that all column names match the donations table schema
- Run: `SELECT column_name FROM information_schema.columns WHERE table_name = 'donations';`

### Index creation fails

- If index already exists, safe to re-run (uses `IF NOT EXISTS`)

### In admin dashboard, hazardous items still show reuse/donate options

- Admin UI may need update to hide these buttons for `is_hazardous_locked = true` items
- See "Update Admin Dashboard" section in Step 5

---

## Rollback (if needed)

If you need to remove these changes:

```sql
-- Remove triggers
DROP TRIGGER IF EXISTS trigger_lock_hazardous_items_insert ON donations;
DROP TRIGGER IF EXISTS trigger_prevent_hazardous_disposition_changes ON donations;

-- Remove functions
DROP FUNCTION IF EXISTS lock_hazardous_items_on_insert();
DROP FUNCTION IF EXISTS prevent_hazardous_disposition_changes();
DROP FUNCTION IF EXISTS get_hazardous_items_for_disposal(INT);
DROP FUNCTION IF EXISTS update_hazardous_disposition(UUID, UUID, TEXT, VARCHAR);

-- Remove indexes
DROP INDEX IF EXISTS idx_donations_hazardous_category;
DROP INDEX IF EXISTS idx_donations_hazardous_locked;

-- Remove columns
ALTER TABLE donations
  DROP COLUMN IF EXISTS device_category CASCADE;
ALTER TABLE donations
  DROP COLUMN IF EXISTS hazard_type CASCADE;
ALTER TABLE donations
  DROP COLUMN IF EXISTS quantity_weight CASCADE;
ALTER TABLE donations
  DROP COLUMN IF EXISTS hazard_description CASCADE;
ALTER TABLE donations
  DROP COLUMN IF EXISTS is_hazardous_locked CASCADE;
```

---

## Next Steps

Once migrations are applied:

1. ✅ Hazardous submission form (`app/hazardous-submission/page.tsx`) is ready
2. ✅ Donation API handler needs field mapping (Step 4 above)
3. ✅ Admin dashboard needs UI updates to lock hazardous items
4. ✅ Test end-to-end: submit → auto-lock → verify admin can only dispose
