# 🧪 EcoKonek Testing Guide

Complete guide to test your EcoKonek application end-to-end.

## ✅ Prerequisites Checklist

- [x] Database migrations deployed to Supabase
- [x] Next.js dev server running at http://localhost:3000
- [x] Environment variables configured (.env)
- [x] All API routes created

---

## 🚀 Quick Test - Start Here!

Your application is running at: **http://localhost:3000**

### Test Flow:

1. **Home Page** → Test landing page
2. **Register** → Create test account
3. **Login** → Authenticate
4. **Dashboard** → View profile & stats
5. **Donate** → Submit device donation
6. **Community** → Create posts, interact
7. **Profile** → View achievements

---

## 📝 Detailed Testing Steps

### 1. Test Home Page

**URL:** http://localhost:3000

**What to check:**

- ✅ Page loads without errors
- ✅ Navigation menu works
- ✅ Links to login/register work
- ✅ Styling looks good

**Expected behavior:**

- Clean landing page
- Call-to-action buttons
- Responsive design

---

### 2. Test User Registration

**URL:** http://localhost:3000/register

**Test Data:**

```
Full Name: Test User
Username: testuser123
Email: test@ecokonek.ph
Phone: +63 9123456789
Password: TestPass123!
```

**What to check:**

- ✅ Form validates input
- ✅ Username uniqueness check works
- ✅ Registration succeeds
- ✅ Success message shown
- ✅ User profile created in database

**Expected API call:**

```
POST /api/supabase/functions/auth-handler
{
  "action": "register",
  "email": "test@ecokonek.ph",
  "password": "TestPass123!",
  "fullName": "Test User",
  "username": "testuser123",
  "phone": "+63 9123456789"
}
```

**Expected response:**

```json
{
  "success": true,
  "message": "Registration successful! Please check your email to verify your account.",
  "user": { ... }
}
```

**Verify in Supabase Dashboard:**

```sql
-- Check if user was created
SELECT * FROM users WHERE email = 'test@ecokonek.ph';
```

---

### 3. Test User Login

**URL:** http://localhost:3000/login

**Test Data:**

```
Email: test@ecokonek.ph
Password: TestPass123!
```

**What to check:**

- ✅ Login form works
- ✅ Authentication succeeds
- ✅ Session created
- ✅ Redirects to dashboard
- ✅ User data loaded

**Expected API call:**

```
POST /api/supabase/functions/auth-handler
{
  "action": "login",
  "email": "test@ecokonek.ph",
  "password": "TestPass123!"
}
```

**Expected response:**

```json
{
  "success": true,
  "message": "Login successful!",
  "user": { ... },
  "session": { ... }
}
```

---

### 4. Test Dashboard

**URL:** http://localhost:3000/dashboard

**What to check:**

- ✅ User profile displays
- ✅ Eco points shown (should be 0 initially)
- ✅ Total donations (should be 0)
- ✅ CO2 saved (should be 0)
- ✅ Achievements section visible
- ✅ Recent activity shown

**Expected API call:**

```
POST /api/supabase/functions/user-profile
{
  "action": "get-profile"
}
Headers: {
  "Authorization": "Bearer <token>"
}
```

**Expected data:**

```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "username": "testuser123",
    "full_name": "Test User",
    "eco_points": 0,
    "total_donations": 0,
    "total_co2_saved": 0
  },
  "achievements": [...]
}
```

---

### 5. Test Device Donation

**URL:** http://localhost:3000/donate

**Test Donation #1 - Working Laptop:**

```
Device Category: Laptop
Brand: Apple
Model: MacBook Pro
Condition: Working
Year: 2020
Description: 14-inch, M1 chip, excellent condition
Drop-off Center: EcoKonek Central Hub
```

**What to check:**

- ✅ Form submission works
- ✅ Eco points calculated (should get 150 points)
- ✅ CO2 saved calculated (should be 18.7 kg)
- ✅ Success modal/message shown
- ✅ User stats updated

**Expected API call:**

```
POST /api/supabase/functions/donation-handler
{
  "action": "create-donation",
  "donationData": {
    "deviceCategory": "laptop",
    "brand": "Apple",
    "model": "MacBook Pro",
    "condition": "working",
    "year": 2020,
    "description": "14-inch, M1 chip, excellent condition",
    "dropOffCenter": "EcoKonek Central Hub"
  }
}
Headers: {
  "x-user-id": "<user-id>"
}
```

**Expected response:**

```json
{
  "success": true,
  "deviceName": "Apple MacBook Pro",
  "ecoPoints": 150,
  "co2Saved": 18.7,
  "donationType": "donated",
  "destinationPath": "Community Donation",
  "message": "Donation submitted successfully!",
  "donationId": "uuid"
}
```

**Verify in Database:**

```sql
-- Check donation was created
SELECT * FROM donations WHERE user_id = (
  SELECT id FROM users WHERE email = 'test@ecokonek.ph'
);

-- Check user stats updated
SELECT eco_points, total_donations, total_co2_saved, donated_devices
FROM users WHERE email = 'test@ecokonek.ph';
-- Expected: eco_points=150, total_donations=1, total_co2_saved=18.7, donated_devices=1
```

---

**Test Donation #2 - Broken Smartphone:**

```
Device Category: Smartphone
Brand: Samsung
Model: Galaxy S21
Condition: Broken
Year: 2021
Description: Screen cracked, won't turn on
Drop-off Center: EcoKonek Angeles Branch
```

**Expected outcome:**

- ✅ Gets 35 eco points (broken device)
- ✅ Saves 4.2 kg CO2
- ✅ Marked as "recycled"
- ✅ `recycled_devices` counter increases

**After this donation, stats should be:**

- Eco Points: 185 (150 + 35)
- Total Donations: 2
- CO2 Saved: 22.9 kg (18.7 + 4.2)
- Donated Devices: 1 (working)
- Recycled Devices: 1 (broken)

---

### 6. Test Achievements

**URL:** http://localhost:3000/dashboard (achievements section)

**What to check:**
After the 2 donations above, you should have earned:

- ✅ **First Steps** - Made first donation ✓ Earned
- ✅ **Eco Warrior** - 100 eco points ✓ Earned (185 points)
- ⏳ **Eco Champion** - 500 eco points (Progress: 37%)
- ⏳ **Generous Giver** - 5 donations (Progress: 40%)
- ⏳ **Donation Hero** - 10 donations (Progress: 20%)
- ⏳ **Carbon Saver** - 50kg CO2 (Progress: 45.8%)
- ✅ **Tech Recycler** - Recycled broken device ✓ Earned

**Verify in Database:**

```sql
-- Check achievements awarded
SELECT achievement_id, earned_at
FROM user_achievements
WHERE user_id = (SELECT id FROM users WHERE email = 'test@ecokonek.ph')
ORDER BY earned_at DESC;
-- Expected: first-donation, eco-warrior, tech-recycler
```

---

### 7. Test Leaderboard

**URL:** http://localhost:3000/dashboard (or wherever leaderboard is shown)

**What to check:**

- ✅ User appears on leaderboard
- ✅ Ranked by eco points
- ✅ Shows correct stats
- ✅ Top 10 users displayed

**Expected API call:**

```
POST /api/supabase/functions/user-profile
{
  "action": "get-leaderboard"
}
```

**Verify in Database:**

```sql
-- Check leaderboard query
SELECT
  username, full_name, eco_points, total_donations, total_co2_saved,
  ROW_NUMBER() OVER (ORDER BY eco_points DESC) as rank
FROM users
WHERE is_active = true AND is_public = true
ORDER BY eco_points DESC
LIMIT 10;
```

---

### 8. Test Community Posts

**URL:** http://localhost:3000/community

**Test Post #1:**

```
Content: "Just donated my old laptop! Feeling great about helping the environment 🌱"
```

**What to check:**

- ✅ Post creation works
- ✅ Post appears in feed
- ✅ Character limit enforced (500 max)
- ✅ User info displayed (name, avatar)

**Expected API call:**

```
POST /api/supabase/functions/community-handler
{
  "action": "create-post",
  "content": "Just donated my old laptop! Feeling great about helping the environment 🌱"
}
Headers: {
  "Authorization": "Bearer <token>"
}
```

**Test Post Likes:**

- ✅ Like button works
- ✅ Like count increases
- ✅ Unlike works (toggle)
- ✅ Can't like twice

**Verify in Database:**

```sql
-- Check posts created
SELECT p.*, u.username, u.full_name
FROM community_posts p
JOIN users u ON p.user_id = u.id
WHERE p.is_active = true
ORDER BY p.created_at DESC;

-- Check likes
SELECT * FROM post_likes WHERE user_id = (
  SELECT id FROM users WHERE email = 'test@ecokonek.ph'
);
```

---

### 9. Test Profile Updates

**URL:** http://localhost:3000/profile

**Update Profile:**

```
Bio: "Eco warrior 🌍 | Tech enthusiast | Making a difference one device at a time"
Location: "San Fernando, Pampanga"
Interests: ["Technology", "Environment", "Sustainability"]
Phone: +63 9123456789
```

**What to check:**

- ✅ Profile update form works
- ✅ Changes saved to database
- ✅ Updated data displays immediately

**Expected API call:**

```
POST /api/supabase/functions/user-profile
{
  "action": "update-profile",
  "bio": "Eco warrior 🌍 | Tech enthusiast | Making a difference one device at a time",
  "location": "San Fernando, Pampanga",
  "interests": ["Technology", "Environment", "Sustainability"],
  "phone": "+63 9123456789"
}
```

---

### 10. Test Drop-off Centers

**URL:** http://localhost:3000/donate (or centers page)

**What to check:**

- ✅ 3 default centers load
- ✅ Center details display
- ✅ Operating hours shown
- ✅ Contact information visible

**Expected API call:**

```
POST /api/supabase/functions/donation-handler
{
  "action": "get-drop-off-centers"
}
```

**Expected response:**

```json
{
  "success": true,
  "centers": [
    {
      "id": "uuid",
      "name": "EcoKonek Central Hub",
      "location": "Jose Abad Santos Avenue, San Fernando, Pampanga",
      "phone": "+63 45 123 4567",
      "operating_hours": "Mon-Sat 8AM-6PM"
    }
    // ... 2 more centers
  ]
}
```

---

## 🔍 Testing API Endpoints Directly

### Using Browser DevTools Console:

```javascript
// Test registration
fetch("/api/supabase/functions/auth-handler", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "register",
    email: "test2@ecokonek.ph",
    password: "TestPass123!",
    fullName: "Test User 2",
    username: "testuser2",
  }),
})
  .then((r) => r.json())
  .then(console.log);

// Test login
fetch("/api/supabase/functions/auth-handler", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    action: "login",
    email: "test@ecokonek.ph",
    password: "TestPass123!",
  }),
})
  .then((r) => r.json())
  .then(console.log);

// Test get profile (need auth token)
fetch("/api/supabase/functions/user-profile", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_TOKEN_HERE",
  },
  body: JSON.stringify({
    action: "get-profile",
  }),
})
  .then((r) => r.json())
  .then(console.log);
```

---

## 🐛 Common Issues & Solutions

### Issue: 401 Unauthorized errors

**Solution:**

- Check if user is logged in
- Verify auth token in headers
- Check RLS policies in Supabase

### Issue: Donation not updating stats

**Solution:**

- Check database triggers are enabled
- Verify user_id matches
- Check donations table has the record

### Issue: Achievements not awarded

**Solution:**

- Run manually: `SELECT check_achievements('user-id');`
- Check user_achievements table
- Verify stats meet requirements

### Issue: Posts not showing

**Solution:**

- Check is_active = true
- Verify RLS policies allow SELECT
- Check user authentication

---

## ✅ Final Verification Checklist

After completing all tests:

- [ ] User can register successfully
- [ ] User can login and access dashboard
- [ ] Dashboard shows correct user stats
- [ ] Device donation creates record and updates stats
- [ ] Eco points calculated correctly
- [ ] CO2 saved calculated correctly
- [ ] Achievements automatically awarded
- [ ] Leaderboard displays users by rank
- [ ] Community posts can be created
- [ ] Posts can be liked/unliked
- [ ] Profile can be updated
- [ ] Drop-off centers load correctly
- [ ] All API endpoints return expected responses
- [ ] No console errors in browser
- [ ] Database has all expected records

---

## 📊 Test Results Template

Create a test report:

```
EcoKonek Test Results
Date: [DATE]
Tester: [YOUR NAME]

✅ PASSED
- Registration
- Login
- Dashboard load
- Profile display
- Donation submission
- Eco points calculation
- Achievement awards
- Community posts
- Leaderboard

❌ FAILED
- [List any failures]

🐛 BUGS FOUND
- [List any bugs]

📝 NOTES
- [Additional observations]
```

---

## 🎉 Success Criteria

Your application is working correctly when:

1. ✅ All user flows complete without errors
2. ✅ Database records created properly
3. ✅ Stats update automatically
4. ✅ Achievements awarded correctly
5. ✅ UI is responsive and functional
6. ✅ API endpoints return expected data
7. ✅ Security (RLS) working properly

---

**Happy Testing! 🚀**

_For issues, check the browser console and server logs_
