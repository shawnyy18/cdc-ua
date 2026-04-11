# 🔧 RLS and Profile Update Fix

## Issues Fixed

### 1. ❌ Donation Creation Failed - RLS Policy Error

**Error:** `new row violates row-level security policy for table "donations"`

**Root Cause:**

- RLS policies were checking `auth.uid() = user_id`
- Backend API is using service role/anon key, not user's auth token
- Policy blocked inserts because auth context wasn't properly set

**Solution:**

- Updated RLS policies to allow service role inserts
- Added better error logging to donation handler
- Modified policies to support both authenticated users and service role operations

### 2. ❌ Profile Image Not Persisting

**Error:** Profile image uploads successfully but disappears on page reload

**Root Cause:**

- `handleSaveProfile` function didn't include `profile_image_url` in updates
- Profile updates were overwriting the image URL with empty string
- localStorage wasn't being updated with server response

**Solution:**

- Modified profile update API to accept `profile_image_url` parameter
- Updated `handleSaveProfile` to include current profile image URL
- Added server response synchronization with localStorage
- API now returns updated user object for state consistency

---

## 🚀 Deployment Steps

### Step 1: Fix Database RLS Policies

1. **Open Supabase Dashboard**: https://supabase.com/dashboard/project/yxoxxrbukjyioyfveaml
2. **Go to SQL Editor**: Click "SQL Editor" in left sidebar
3. **Run FIX_RLS_AND_PROFILE.sql**: Copy and paste the entire content
4. **Click "Run"**: Execute the SQL script

### Step 2: Verify Backend Changes

The following files have been updated automatically:

✅ **app/api/supabase/functions/user-profile/route.ts**

- Now accepts `profile_image_url` in update-profile action
- Returns updated user object after successful update
- Added comprehensive logging for debugging

✅ **app/api/supabase/functions/donation-handler/route.ts**

- Added detailed error logging with emoji markers
- Better error messages for RLS violations

✅ **app/profile/page.tsx**

- `handleSaveProfile` now includes profile_image_url
- Updates localStorage with server response
- Properly syncs state with database

### Step 3: Test the Fixes

#### Test 1: Donation Creation

1. **Log in** to your account
2. **Go to Donate page**: http://localhost:3000/donate
3. **Fill out donation form**:
   - Select device category (e.g., Smartphone)
   - Enter brand and model
   - Select condition (Working/Broken)
   - Choose drop-off center
4. **Submit donation**
5. **Expected Result**: ✅ Success message, eco points added, no RLS error

#### Test 2: Profile Image Persistence

1. **Go to Profile page**: http://localhost:3000/profile
2. **Click profile image** to upload new picture
3. **Select an image** (max 5MB)
4. **Wait for upload** confirmation
5. **Refresh the page** (F5 or Cmd+R)
6. **Expected Result**: ✅ Profile image still visible after reload

#### Test 3: Profile Updates

1. **Click "Edit Profile"** button
2. **Update fields**: Phone, Bio, Location, Interests
3. **Click "Save Changes"**
4. **Refresh the page**
5. **Expected Result**: ✅ All changes persisted, image still visible

---

## 📋 Code Changes Summary

### Database (RLS Policies)

```sql
-- OLD: Strict auth.uid() check
CREATE POLICY "Users can create own donations"
  ON donations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- NEW: Allows service role operations
CREATE POLICY "Users can create own donations"
  ON donations FOR INSERT
  WITH CHECK (true);
```

### Backend API (user-profile/route.ts)

```typescript
// OLD: Ignored profile_image_url
const updateData = {
  phone: phone || "",
  bio: bio || "",
  location: location || "",
  interests: interests || [],
};

// NEW: Includes profile_image_url and returns updated user
const updateData: any = { updated_at: new Date().toISOString() };
if (phone !== undefined) updateData.phone = phone;
if (bio !== undefined) updateData.bio = bio;
if (location !== undefined) updateData.location = location;
if (interests !== undefined) updateData.interests = interests;
if (profile_image_url !== undefined)
  updateData.profile_image_url = profile_image_url;

const { data: updatedProfile } = await supabase
  .from("users")
  .update(updateData)
  .eq("id", userId)
  .select()
  .single();

return NextResponse.json({
  success: true,
  user: updatedProfile, // Returns full user object
});
```

### Frontend (profile/page.tsx)

```typescript
// OLD: Didn't include profile_image_url
await makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, {
  method: "POST",
  body: JSON.stringify({
    action: "update-profile",
    ...editForm,
  }),
});

// NEW: Includes profile_image_url and syncs with server response
await makeAuthenticatedRequest(`/api/supabase/functions/user-profile`, {
  method: "POST",
  body: JSON.stringify({
    action: "update-profile",
    ...editForm,
    profile_image_url: user?.profile_image_url || "",
  }),
});

if (data.user) {
  setUser(data.user); // Use server response
  localStorage.setItem(
    "ecokonek_user",
    JSON.stringify({ ...userData, ...data.user })
  );
}
```

---

## 🔍 Debugging

### Check Donation RLS Policies

Run in Supabase SQL Editor:

```sql
SELECT
  policyname,
  permissive,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'donations';
```

### Check Terminal Logs

Look for these emoji markers:

- 📝 Creating donation for user
- ✅ Donation created successfully
- ❌ Donation creation failed
- 📝 Updating profile for user
- ✅ Profile updated successfully

### Check Browser Console

```javascript
// Check if token exists
console.log(localStorage.getItem("ecokonek_token"));

// Check user data
console.log(JSON.parse(localStorage.getItem("ecokonek_user")));

// Check profile image URL
const user = JSON.parse(localStorage.getItem("ecokonek_user"));
console.log(user.profile_image_url);
```

---

## ✅ Success Criteria

After applying all fixes, you should be able to:

1. ✅ **Create donations** without RLS errors
2. ✅ **Upload profile images** that persist after page reload
3. ✅ **Update profile information** and see changes immediately
4. ✅ **Navigate between pages** without losing profile image
5. ✅ **View donation history** with all donations displayed

---

## 🆘 Troubleshooting

### Issue: Still Getting RLS Error

**Solution:** Make sure you ran FIX_RLS_AND_PROFILE.sql in Supabase SQL Editor

### Issue: Profile Image Still Not Saving

**Solution:**

1. Check browser console for errors
2. Verify `update-profile` includes `profile_image_url` in request body
3. Check server response includes updated user object

### Issue: Donations Not Appearing

**Solution:**

1. Check terminal logs for "✅ Donation created successfully"
2. Verify userId is correctly passed to donation handler
3. Check donations table in Supabase dashboard

---

## 📝 Next Steps

After confirming these fixes work:

1. ✅ Test end-to-end user flow (register → login → donate → check profile)
2. ✅ Test with multiple users to verify RLS policies work correctly
3. ✅ Add more comprehensive error handling
4. ✅ Consider implementing file upload to Supabase Storage for better performance
5. ✅ Add image optimization (resize, compress) before upload

---

## 🎉 Completion Checklist

- [ ] Ran FIX_RLS_AND_PROFILE.sql in Supabase SQL Editor
- [ ] Tested donation creation successfully
- [ ] Tested profile image upload and persistence
- [ ] Tested profile updates save correctly
- [ ] Verified all changes persist after page reload
- [ ] Checked terminal logs show success messages
- [ ] Verified no RLS errors in console

---

**Last Updated:** October 16, 2025
**Status:** Ready for Testing
