# 📘 EcoKonek Database Schema Reference

Quick reference for all database tables, columns, and relationships.

## 🗂️ Tables Overview

### 1. users

**Primary user profiles and statistics**

| Column            | Type          | Constraints                   | Description             |
| ----------------- | ------------- | ----------------------------- | ----------------------- |
| id                | UUID          | PRIMARY KEY, FK to auth.users | User identifier         |
| email             | VARCHAR(255)  | UNIQUE, NOT NULL              | User email              |
| full_name         | VARCHAR(255)  | NOT NULL                      | Full name               |
| username          | VARCHAR(100)  | UNIQUE, NOT NULL              | Unique username         |
| phone             | VARCHAR(20)   |                               | Phone number            |
| bio               | TEXT          |                               | User biography          |
| location          | VARCHAR(255)  |                               | User location           |
| interests         | TEXT[]        |                               | Array of interests      |
| profile_image_url | TEXT          |                               | Profile picture URL     |
| is_public         | BOOLEAN       | DEFAULT true                  | Profile visibility      |
| is_seller         | BOOLEAN       | DEFAULT false                 | Seller status           |
| is_active         | BOOLEAN       | DEFAULT true                  | Account status          |
| eco_points        | INTEGER       | DEFAULT 0                     | Eco points earned       |
| total_donations   | INTEGER       | DEFAULT 0                     | Total donations made    |
| total_co2_saved   | DECIMAL(10,2) | DEFAULT 0                     | CO2 saved (kg)          |
| donated_devices   | INTEGER       | DEFAULT 0                     | Working devices donated |
| recycled_devices  | INTEGER       | DEFAULT 0                     | Broken devices recycled |
| created_at        | TIMESTAMPTZ   | DEFAULT NOW()                 | Account creation        |
| updated_at        | TIMESTAMPTZ   | DEFAULT NOW()                 | Last update             |

**Indexes:**

- `idx_users_username` on username
- `idx_users_email` on email
- `idx_users_eco_points` on eco_points DESC

---

### 2. donations

**Device donation and recycling records**

| Column            | Type          | Constraints           | Description                                    |
| ----------------- | ------------- | --------------------- | ---------------------------------------------- |
| id                | UUID          | PRIMARY KEY           | Donation identifier                            |
| user_id           | UUID          | FK to users, NOT NULL | Donor                                          |
| device_type       | VARCHAR(50)   | NOT NULL              | Device category                                |
| brand             | VARCHAR(100)  | NOT NULL              | Device brand                                   |
| model             | VARCHAR(100)  | NOT NULL              | Device model                                   |
| condition         | VARCHAR(20)   | NOT NULL, CHECK       | working/broken/damaged                         |
| description       | TEXT          |                       | Additional details                             |
| year              | INTEGER       |                       | Manufacturing year                             |
| drop_off_center   | VARCHAR(255)  |                       | Selected center                                |
| eco_points_earned | INTEGER       | DEFAULT 0             | Points awarded                                 |
| co2_saved         | DECIMAL(10,2) | DEFAULT 0             | CO2 saved (kg)                                 |
| status            | VARCHAR(20)   | DEFAULT 'pending'     | pending/accepted/processing/completed/rejected |
| created_at        | TIMESTAMPTZ   | DEFAULT NOW()         | Submission date                                |
| updated_at        | TIMESTAMPTZ   | DEFAULT NOW()         | Last update                                    |

**Indexes:**

- `idx_donations_user_id` on user_id
- `idx_donations_status` on status
- `idx_donations_created_at` on created_at DESC

---

### 3. drop_off_centers

**Physical donation locations**

| Column          | Type          | Constraints   | Description          |
| --------------- | ------------- | ------------- | -------------------- |
| id              | UUID          | PRIMARY KEY   | Center identifier    |
| name            | VARCHAR(255)  | NOT NULL      | Center name          |
| address         | TEXT          | NOT NULL      | Street address       |
| city            | VARCHAR(100)  | NOT NULL      | City                 |
| location        | VARCHAR(255)  | NOT NULL      | Full location string |
| phone           | VARCHAR(20)   |               | Contact phone        |
| email           | VARCHAR(255)  |               | Contact email        |
| operating_hours | TEXT          |               | Business hours       |
| latitude        | DECIMAL(10,8) |               | GPS latitude         |
| longitude       | DECIMAL(11,8) |               | GPS longitude        |
| is_active       | BOOLEAN       | DEFAULT true  | Operational status   |
| created_at      | TIMESTAMPTZ   | DEFAULT NOW() | Created date         |
| updated_at      | TIMESTAMPTZ   | DEFAULT NOW() | Last update          |

**Default Data:**

- EcoKonek Central Hub (San Fernando)
- EcoKonek Angeles Branch (Angeles City)
- EcoKonek Clark Branch (Clark Freeport)

---

### 4. community_posts

**User-generated community content**

| Column         | Type        | Constraints            | Description        |
| -------------- | ----------- | ---------------------- | ------------------ |
| id             | UUID        | PRIMARY KEY            | Post identifier    |
| user_id        | UUID        | FK to users, NOT NULL  | Post author        |
| content        | TEXT        | NOT NULL, CHECK <= 500 | Post text          |
| likes_count    | INTEGER     | DEFAULT 0              | Number of likes    |
| comments_count | INTEGER     | DEFAULT 0              | Number of comments |
| is_active      | BOOLEAN     | DEFAULT true           | Post visibility    |
| created_at     | TIMESTAMPTZ | DEFAULT NOW()          | Post date          |
| updated_at     | TIMESTAMPTZ | DEFAULT NOW()          | Last edit          |

**Indexes:**

- `idx_community_posts_user_id` on user_id
- `idx_community_posts_created_at` on created_at DESC

---

### 5. post_likes

**Post engagement tracking**

| Column     | Type        | Constraints                     | Description     |
| ---------- | ----------- | ------------------------------- | --------------- |
| id         | UUID        | PRIMARY KEY                     | Like identifier |
| post_id    | UUID        | FK to community_posts, NOT NULL | Liked post      |
| user_id    | UUID        | FK to users, NOT NULL           | User who liked  |
| created_at | TIMESTAMPTZ | DEFAULT NOW()                   | Like timestamp  |

**Constraints:**

- UNIQUE(post_id, user_id) - Prevents duplicate likes

**Indexes:**

- `idx_post_likes_post_id` on post_id
- `idx_post_likes_user_id` on user_id

---

### 6. marketplace_items

**Items listed for sale**

| Column         | Type          | Constraints           | Description        |
| -------------- | ------------- | --------------------- | ------------------ |
| id             | UUID          | PRIMARY KEY           | Item identifier    |
| seller_id      | UUID          | FK to users, NOT NULL | Seller             |
| title          | VARCHAR(255)  | NOT NULL              | Item title         |
| description    | TEXT          |                       | Item description   |
| price          | DECIMAL(10,2) | NOT NULL, CHECK >= 0  | Current price      |
| original_price | DECIMAL(10,2) |                       | Original price     |
| category       | VARCHAR(100)  |                       | Item category      |
| condition      | VARCHAR(50)   |                       | Item condition     |
| image_url      | TEXT          |                       | Item image         |
| is_available   | BOOLEAN       | DEFAULT true          | Available for sale |
| views_count    | INTEGER       | DEFAULT 0             | View count         |
| created_at     | TIMESTAMPTZ   | DEFAULT NOW()         | Listed date        |
| updated_at     | TIMESTAMPTZ   | DEFAULT NOW()         | Last update        |

**Indexes:**

- `idx_marketplace_items_seller_id` on seller_id
- `idx_marketplace_items_is_available` on is_available

---

### 7. seller_profiles

**Extended seller information**

| Column          | Type         | Constraints                  | Description          |
| --------------- | ------------ | ---------------------------- | -------------------- |
| id              | UUID         | PRIMARY KEY                  | Profile identifier   |
| user_id         | UUID         | UNIQUE FK to users, NOT NULL | Seller user          |
| business_name   | VARCHAR(255) |                              | Business name        |
| description     | TEXT         |                              | Business description |
| rating          | DECIMAL(3,2) | DEFAULT 5.0, CHECK 0-5       | Seller rating        |
| total_sales     | INTEGER      | DEFAULT 0                    | Total sales count    |
| commission_rate | DECIMAL(5,2) | DEFAULT 5.0                  | Commission %         |
| is_verified     | BOOLEAN      | DEFAULT true                 | Verification status  |
| created_at      | TIMESTAMPTZ  | DEFAULT NOW()                | Profile created      |
| updated_at      | TIMESTAMPTZ  | DEFAULT NOW()                | Last update          |

---

### 8. user_achievements

**Achievement tracking**

| Column         | Type        | Constraints           | Description           |
| -------------- | ----------- | --------------------- | --------------------- |
| id             | UUID        | PRIMARY KEY           | Achievement record ID |
| user_id        | UUID        | FK to users, NOT NULL | User                  |
| achievement_id | VARCHAR(50) | NOT NULL              | Achievement code      |
| earned_at      | TIMESTAMPTZ | DEFAULT NOW()         | Achievement date      |

**Constraints:**

- UNIQUE(user_id, achievement_id) - One of each achievement per user

**Achievement IDs:**

- `first-donation` - Made first donation
- `eco-warrior` - 100 eco points
- `eco-champion` - 500 eco points
- `generous-giver` - 5 donations
- `donation-hero` - 10 donations
- `carbon-saver` - 50kg CO2 saved
- `climate-protector` - 100kg CO2 saved
- `tech-recycler` - Recycled broken devices

---

### 9. transactions

**Financial transaction records**

| Column         | Type          | Constraints             | Description                       |
| -------------- | ------------- | ----------------------- | --------------------------------- |
| id             | UUID          | PRIMARY KEY             | Transaction ID                    |
| user_id        | UUID          | FK to users, NOT NULL   | User                              |
| item_id        | UUID          | FK to marketplace_items | Related item                      |
| type           | VARCHAR(20)   | NOT NULL, CHECK         | purchase/sale/refund/commission   |
| amount         | DECIMAL(10,2) | NOT NULL                | Transaction amount                |
| status         | VARCHAR(20)   | DEFAULT 'pending'       | pending/completed/failed/refunded |
| payment_method | VARCHAR(50)   |                         | Payment method used               |
| created_at     | TIMESTAMPTZ   | DEFAULT NOW()           | Transaction date                  |
| updated_at     | TIMESTAMPTZ   | DEFAULT NOW()           | Last update                       |

---

## 🔗 Relationships

```
users (1) ──────────── (many) donations
users (1) ──────────── (many) community_posts
users (1) ──────────── (many) post_likes
users (1) ──────────── (many) marketplace_items
users (1) ──────────── (1) seller_profiles
users (1) ──────────── (many) user_achievements
users (1) ──────────── (many) transactions

community_posts (1) ── (many) post_likes
marketplace_items (1) ─ (many) transactions
```

---

## 🎯 Common Queries

### Get user with stats

```sql
SELECT
  id, username, full_name, email,
  eco_points, total_donations, total_co2_saved,
  is_seller, is_public
FROM users
WHERE id = 'user-uuid';
```

### Get user's donations

```sql
SELECT
  id, device_type, brand, model, condition,
  eco_points_earned, co2_saved, status, created_at
FROM donations
WHERE user_id = 'user-uuid'
ORDER BY created_at DESC;
```

### Get leaderboard

```sql
SELECT
  username, full_name, profile_image_url,
  eco_points, total_donations, total_co2_saved,
  ROW_NUMBER() OVER (ORDER BY eco_points DESC) as rank
FROM users
WHERE is_active = true AND is_public = true
ORDER BY eco_points DESC
LIMIT 10;
```

### Get community feed

```sql
SELECT
  p.id, p.content, p.likes_count, p.created_at,
  u.username, u.full_name, u.profile_image_url, u.is_seller
FROM community_posts p
JOIN users u ON p.user_id = u.id
WHERE p.is_active = true
ORDER BY p.created_at DESC
LIMIT 50;
```

### Check if user liked a post

```sql
SELECT EXISTS (
  SELECT 1 FROM post_likes
  WHERE post_id = 'post-uuid' AND user_id = 'user-uuid'
) as user_liked;
```

### Get marketplace items

```sql
SELECT
  i.id, i.title, i.description, i.price, i.original_price,
  i.category, i.condition, i.image_url, i.created_at,
  u.username as seller_name, u.profile_image_url as seller_image,
  s.rating as seller_rating, s.total_sales
FROM marketplace_items i
JOIN users u ON i.seller_id = u.id
LEFT JOIN seller_profiles s ON u.id = s.user_id
WHERE i.is_available = true
ORDER BY i.created_at DESC;
```

### Get user achievements

```sql
SELECT achievement_id, earned_at
FROM user_achievements
WHERE user_id = 'user-uuid'
ORDER BY earned_at DESC;
```

---

## 🔧 Maintenance Queries

### Reset user stats (for testing)

```sql
UPDATE users
SET eco_points = 0,
    total_donations = 0,
    total_co2_saved = 0,
    donated_devices = 0,
    recycled_devices = 0
WHERE id = 'user-uuid';
```

### Recalculate user stats from donations

```sql
UPDATE users u
SET
  eco_points = COALESCE((SELECT SUM(eco_points_earned) FROM donations WHERE user_id = u.id), 0),
  total_donations = COALESCE((SELECT COUNT(*) FROM donations WHERE user_id = u.id), 0),
  total_co2_saved = COALESCE((SELECT SUM(co2_saved) FROM donations WHERE user_id = u.id), 0)
WHERE id = 'user-uuid';
```

### Clean up old test data

```sql
DELETE FROM users WHERE email LIKE '%test%' OR username LIKE '%test%';
```

---

**Database Version:** 1.0.0  
**Last Updated:** October 16, 2025
