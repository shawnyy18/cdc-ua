# Hazardous Submission - Complete Setup Checklist

## ✅ Status Overview

You now have **everything implemented** for the hazardous waste submission feature. Follow this checklist to verify and test.

---

## 🗄️ Database Migrations (Apply in Order)

### 1. Migration 38: Allow 'n/a' Condition ⛔ **DO THIS FIRST**

**File:** `supabase/migrations/38_allow_hazardous_condition.sql`

```sql
-- This updates the condition constraint to accept 'n/a'
CHECK (condition IS NULL OR condition IN ('working', 'broken', 'damaged', 'n/a', 'consumable'))
```

**Apply it:**

- Go to Supabase SQL Editor → New Query
- Paste the entire file contents
- Click Run

**Verify:**

```sql
SELECT pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conname = 'donations_condition_check';
-- Should include 'n/a' in the list
```

---

### 2. Migration 39: Add Hazardous Asset Columns

**File:** `supabase/migrations/39_add_hazardous_asset_fields.sql`

Adds these columns to `donations` table:

- `device_category` (standard/hazardous-consumables)
- `hazard_type` (Ink/Toner, Batteries, Bulbs, E-waste)
- `quantity_weight`
- `hazard_description`
- `is_hazardous_locked`

**Apply it:** Same process as Migration 38

---

### 3. Migration 40: Add Auto-Lock Triggers

**File:** `supabase/migrations/40_add_hazardous_item_triggers.sql`

Creates automatic logic:

- Auto-locks hazardous items to disposal on submit
- Prevents admins from changing disposition
- Adds helper functions for admin dashboard

**Apply it:** Same process as Migration 38

---

## 🎨 Frontend Implementation

### Hazardous Submission Page

**File:** `app/hazardous-submission/page.tsx`

✅ **Features included:**

- 4 hazard type cards with icons (🖨️ Ink, 🔋 Batteries, 💡 Bulbs, ♻️ E-waste)
- Image upload with preview
- Real-time validation with field error messages
- Character counter (0/500)
- Mobile-responsive design
- Button states (loading, success, disabled)
- Automatic redirect on success

### Device Category Selection Page

**File:** `app/donate/page.tsx`

✅ **Features included:**

- New "Hazardous Waste & Consumables" card in category selection
- Conditional routing:
  - Standard hardware → `/device-condition`
  - Hazardous items → `/hazardous-submission`

### Device Condition Page

**File:** `app/device-condition/page.tsx`

✅ **Features included:**

- Routes Working/Broken selections to `/donate` with condition param
- Only shown for standard hardware (not hazardous)

---

## 🔌 API Handler Update

**File:** `app/api/supabase/functions/donation-handler/route.ts`

✅ **Updated to:**

```typescript
// Adds hazardous-specific fields to donation insert
if (isHazardousCategory) {
  donationRecord.device_category = "hazardous-consumables";
  donationRecord.hazard_type = donationData.hazardousData?.hazardType;
  donationRecord.quantity_weight = donationData.hazardousData?.quantityWeight;
  donationRecord.hazard_description =
    donationData.hazardousData?.itemDescription;
  donationRecord.is_hazardous_locked = true;
} else {
  donationRecord.device_category = "standard";
}
```

---

## 🧪 Testing Steps

### Step 1: Apply All Migrations

- [ ] Apply Migration 38 (condition constraint)
- [ ] Apply Migration 39 (hazardous columns)
- [ ] Apply Migration 40 (triggers)
- [ ] Verify all three succeeded

### Step 2: Test Form Submission

1. Navigate to `/donate`
2. Select "Hazardous Waste & Consumables" ⚠️
3. Fill in the form:
   - Hazard Type: Select one
   - Photo: Upload test image
   - Quantity/Weight: "5 cartridges"
   - Item Description: "Empty ink cartridges"
   - Brand: "Epson"
   - Model: "L14150"
   - Property #: "PROP-001"
   - Serial #: "SN-001"
4. Click "Submit Hazardous Item"

### Step 3: Verify Database Entry

Run this query to check the submission:

```sql
SELECT
  id,
  device_category,
  hazard_type,
  quantity_weight,
  is_hazardous_locked,
  disposition_type,
  condition,
  is_cdc_asset,
  property_number,
  serial_number,
  status,
  created_at
FROM donations
WHERE device_category = 'hazardous-consumables'
ORDER BY created_at DESC
LIMIT 1;
```

**Expected result:**

- ✅ `device_category = 'hazardous-consumables'`
- ✅ `hazard_type = 'Batteries'` (or selected type)
- ✅ `quantity_weight = '5 cartridges'`
- ✅ `is_hazardous_locked = true`
- ✅ `disposition_type = 'dispose'` (auto-set by trigger)
- ✅ `condition = 'n/a'` (auto-set)
- ✅ `is_cdc_asset = true`

### Step 4: Test Trigger Locking

Try to manually update the disposition (this should fail):

```sql
UPDATE donations
SET disposition_type = 'donate'
WHERE device_category = 'hazardous-consumables'
  AND is_hazardous_locked = true
LIMIT 1;
```

**Expected result:**

```
ERROR: Hazardous items can only be disposed...
```

### Step 5: Test Standard Hardware Still Works

1. Navigate to `/donate`
2. Select "Laptops" (standard hardware)
3. Select "Working" or "Defective" on condition page
4. Fill in form and submit
5. Verify it creates a standard device donation:

```sql
SELECT device_category, condition, is_hazardous_locked
FROM donations
WHERE device_category = 'standard'
LIMIT 1;
```

Expected: `device_category = 'standard'`, `is_hazardous_locked = false`

---

## 👨‍💼 Admin Dashboard Integration (Next Steps)

Once testing passes, update your admin dashboard to display hazardous items differently:

**Feature 1: Hazardous Items List**

```typescript
const { data: hazardousItems } = await supabase
  .from("donations")
  .select("*")
  .eq("device_category", "hazardous-consumables")
  .in("status", ["pending_evaluation", "reallocated"]);
```

**Feature 2: Display With Warning Badge**

```typescript
// Show: ⚠️ HAZARDOUS - FOR DISPOSAL ONLY
// Hide: Reuse / Donate buttons
// Keep: Approve / Reject buttons
```

**Feature 3: Approve Disposal**

```typescript
const { data } = await supabase.rpc("update_hazardous_disposition", {
  p_donation_id: itemId,
  p_admin_id: currentAdminId,
  p_disposition_notes: "Approved for disposal",
  p_status: "disposed",
});
```

---

## 📋 File Structure

```
app/
├── hazardous-submission/page.tsx          ✅ Form (new)
├── device-condition/page.tsx              ✅ Condition selector (new)
├── donate/page.tsx                        ✅ Category selection (updated)
└── api/supabase/functions/
    └── donation-handler/route.ts          ✅ API handler (updated)

supabase/migrations/
├── 38_allow_hazardous_condition.sql       ✅ Condition constraint
├── 39_add_hazardous_asset_fields.sql      ✅ New columns
└── 40_add_hazardous_item_triggers.sql     ✅ Auto-locking logic

Documentation/
├── HAZARDOUS_DATABASE_SETUP.md            ✅ DB setup guide
└── MIGRATION_QUICK_FIX.md                 ✅ Quick fix guide
```

---

## 🚀 Deployment Checklist

- [ ] All 3 migrations applied to Supabase
- [ ] Form submission test passes
- [ ] Database verification queries pass
- [ ] Trigger locking test passes
- [ ] Standard hardware still works
- [ ] Admin dashboard updated (optional for MVP)
- [ ] User documentation updated
- [ ] Team notified of new feature

---

## ❌ Troubleshooting

### "violates check constraint donations_condition_check"

**Solution:** Apply Migration 38 first. It updates the condition constraint to accept 'n/a'.

### "column device_category does not exist"

**Solution:** Apply Migration 39. It adds the new columns.

### Hazardous items not auto-locking

**Solution:** Apply Migration 40. It creates the triggers that auto-lock.

### Form submits but doesn't redirect

**Solution:** Check browser console for errors. Verify all form fields are filled correctly.

### Admin can change disposition of hazardous items

**Solution:** Migration 40 trigger should prevent this. Run the trigger test above.

---

## 📞 Support

If you encounter issues:

1. Check browser console (`F12`) for frontend errors
2. Check Supabase logs for database errors
3. Run verification queries from testing steps
4. Ensure migrations are applied in order (38 → 39 → 40)

---

## ✨ Summary

You now have a **complete hazardous waste submission system** with:

✅ Mobile-responsive form with validation  
✅ Auto-locking to disposal workflow  
✅ CDC asset tracking  
✅ Database constraints ensuring data integrity  
✅ Admin triggers preventing route-around  
✅ Backward compatibility with standard hardware

**Next action:** Apply the 3 database migrations in order, then test the form.
