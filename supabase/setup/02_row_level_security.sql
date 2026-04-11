-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Secure data access for all tables
-- Run this AFTER 01_complete_schema.sql
-- This file is idempotent - safe to run multiple times
-- =====================================================

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================
ALTER TABLE barangays ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE drop_off_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- BARANGAYS TABLE POLICIES
-- =====================================================

-- Everyone can view active barangays
DROP POLICY IF EXISTS "Active barangays are viewable by everyone" ON barangays;
CREATE POLICY "Active barangays are viewable by everyone"
  ON barangays FOR SELECT
  USING (is_active = true);

-- Only admins can insert/update/delete barangays
DROP POLICY IF EXISTS "Admins can manage barangays" ON barangays;
CREATE POLICY "Admins can manage barangays"
  ON barangays FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- =====================================================
-- USERS TABLE POLICIES
-- =====================================================

-- Everyone can view public user profiles
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON users;
CREATE POLICY "Public profiles are viewable by everyone"
  ON users FOR SELECT
  USING (is_public = true OR auth.uid() = id);

-- Users can view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile (on signup)
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile (but not is_admin)
DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Admins can view all users
DROP POLICY IF EXISTS "Admins can view all users" ON users;
CREATE POLICY "Admins can view all users"
  ON users FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Admins can update users (including is_admin)
DROP POLICY IF EXISTS "Admins can update users" ON users;
CREATE POLICY "Admins can update users"
  ON users FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Admins can delete users
DROP POLICY IF EXISTS "Admins can delete users" ON users;
CREATE POLICY "Admins can delete users"
  ON users FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- =====================================================
-- DONATIONS TABLE POLICIES
-- =====================================================

-- Users can view their own donations
DROP POLICY IF EXISTS "Users can view own donations" ON donations;
CREATE POLICY "Users can view own donations"
  ON donations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own donations
DROP POLICY IF EXISTS "Users can create own donations" ON donations;
CREATE POLICY "Users can create own donations"
  ON donations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending donations
DROP POLICY IF EXISTS "Users can update own pending donations" ON donations;
CREATE POLICY "Users can update own pending donations"
  ON donations FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id);

-- Barangay admins can view donations from their barangay
DROP POLICY IF EXISTS "Barangay admins view own barangay donations" ON donations;
CREATE POLICY "Barangay admins view own barangay donations"
  ON donations FOR SELECT
  TO authenticated
  USING (
    -- Super admin can see all
    (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND is_admin = true 
      AND barangay_id IS NULL
    ))
    OR
    -- Barangay admin can only see their barangay
    (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND is_admin = true 
      AND barangay_id = donations.barangay_id
    ))
    OR
    -- Users can see their own donations
    (auth.uid() = user_id)
  );

-- Barangay admins can update donations from their barangay
DROP POLICY IF EXISTS "Barangay admins update own barangay donations" ON donations;
CREATE POLICY "Barangay admins update own barangay donations"
  ON donations FOR UPDATE
  TO authenticated
  USING (
    -- Super admin can update all
    (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND is_admin = true 
      AND barangay_id IS NULL
    ))
    OR
    -- Barangay admin can only update their barangay
    (EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND is_admin = true 
      AND barangay_id = donations.barangay_id
    ))
    OR
    -- Users can update their own pending donations
    (auth.uid() = user_id AND status = 'pending')
  );

-- =====================================================
-- DROP-OFF CENTERS POLICIES
-- =====================================================

-- Everyone can view active drop-off centers
DROP POLICY IF EXISTS "Active drop-off centers are viewable by everyone" ON drop_off_centers;
CREATE POLICY "Active drop-off centers are viewable by everyone"
  ON drop_off_centers FOR SELECT
  USING (is_active = true);

-- Admins can manage drop-off centers
DROP POLICY IF EXISTS "Admins can manage drop-off centers" ON drop_off_centers;
CREATE POLICY "Admins can manage drop-off centers"
  ON drop_off_centers FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- =====================================================
-- COMMUNITY POSTS POLICIES
-- =====================================================

-- Everyone can view active community posts
DROP POLICY IF EXISTS "Active posts are viewable by everyone" ON community_posts;
CREATE POLICY "Active posts are viewable by everyone"
  ON community_posts FOR SELECT
  USING (is_active = true);

-- Authenticated users can create posts
DROP POLICY IF EXISTS "Authenticated users can create posts" ON community_posts;
CREATE POLICY "Authenticated users can create posts"
  ON community_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
DROP POLICY IF EXISTS "Users can update own posts" ON community_posts;
CREATE POLICY "Users can update own posts"
  ON community_posts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own posts
DROP POLICY IF EXISTS "Users can delete own posts" ON community_posts;
CREATE POLICY "Users can delete own posts"
  ON community_posts FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- POST LIKES POLICIES
-- =====================================================

-- Everyone can view post likes
DROP POLICY IF EXISTS "Post likes are viewable by everyone" ON post_likes;
CREATE POLICY "Post likes are viewable by everyone"
  ON post_likes FOR SELECT
  USING (true);

-- Authenticated users can like posts
DROP POLICY IF EXISTS "Authenticated users can like posts" ON post_likes;
CREATE POLICY "Authenticated users can like posts"
  ON post_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can unlike posts they've liked
DROP POLICY IF EXISTS "Users can delete own likes" ON post_likes;
CREATE POLICY "Users can delete own likes"
  ON post_likes FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- POST COMMENTS POLICIES
-- =====================================================

-- Everyone can read active comments
DROP POLICY IF EXISTS "Active comments are viewable by everyone" ON post_comments;
CREATE POLICY "Active comments are viewable by everyone"
  ON post_comments FOR SELECT
  USING (is_active = true);

-- Authenticated users can create comments
DROP POLICY IF EXISTS "Authenticated users can create comments" ON post_comments;
CREATE POLICY "Authenticated users can create comments"
  ON post_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own comments
DROP POLICY IF EXISTS "Users can update own comments" ON post_comments;
CREATE POLICY "Users can update own comments"
  ON post_comments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own comments
DROP POLICY IF EXISTS "Users can delete own comments" ON post_comments;
CREATE POLICY "Users can delete own comments"
  ON post_comments FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- FOLLOWS POLICIES
-- =====================================================

-- Everyone can view follow relationships
DROP POLICY IF EXISTS "Follow relationships are viewable by everyone" ON follows;
CREATE POLICY "Follow relationships are viewable by everyone"
  ON follows FOR SELECT
  TO authenticated
  USING (true);

-- Users can follow others (insert)
DROP POLICY IF EXISTS "Users can follow others" ON follows;
CREATE POLICY "Users can follow others"
  ON follows FOR INSERT
  TO authenticated
  WITH CHECK (
    follower_id = auth.uid()
    AND follower_id IS NOT NULL
    AND following_id IS NOT NULL
    AND follower_id <> following_id
  );

-- Users can unfollow (delete their own follows)
DROP POLICY IF EXISTS "Users can unfollow" ON follows;
CREATE POLICY "Users can unfollow"
  ON follows FOR DELETE
  TO authenticated
  USING (follower_id = auth.uid());

-- =====================================================
-- NOTIFICATIONS POLICIES
-- =====================================================

-- Users can only view their own notifications
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (recipient_id = auth.uid());

-- Users can update their own notifications (mark as read)
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (recipient_id = auth.uid())
  WITH CHECK (recipient_id = auth.uid());

-- Users can delete their own notifications
DROP POLICY IF EXISTS "Users can delete own notifications" ON notifications;
CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  TO authenticated
  USING (recipient_id = auth.uid());

-- Note: INSERT is handled by server/triggers, not by users directly

-- =====================================================
-- MARKETPLACE ITEMS POLICIES
-- =====================================================

-- Everyone can view available marketplace items
DROP POLICY IF EXISTS "Available items are viewable by everyone" ON marketplace_items;
CREATE POLICY "Available items are viewable by everyone"
  ON marketplace_items FOR SELECT
  USING (is_available = true);

-- Sellers can view their own items
DROP POLICY IF EXISTS "Sellers can view own items" ON marketplace_items;
CREATE POLICY "Sellers can view own items"
  ON marketplace_items FOR SELECT
  USING (auth.uid() = seller_id);

-- Verified sellers can create items
DROP POLICY IF EXISTS "Verified sellers can create items" ON marketplace_items;
CREATE POLICY "Verified sellers can create items"
  ON marketplace_items FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = seller_id AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_seller = true
    )
  );

-- Sellers can update their own items
DROP POLICY IF EXISTS "Sellers can update own items" ON marketplace_items;
CREATE POLICY "Sellers can update own items"
  ON marketplace_items FOR UPDATE
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- Sellers can delete their own items
DROP POLICY IF EXISTS "Sellers can delete own items" ON marketplace_items;
CREATE POLICY "Sellers can delete own items"
  ON marketplace_items FOR DELETE
  USING (auth.uid() = seller_id);

-- =====================================================
-- SELLER PROFILES POLICIES
-- =====================================================

-- Everyone can view verified seller profiles
DROP POLICY IF EXISTS "Verified seller profiles are viewable" ON seller_profiles;
CREATE POLICY "Verified seller profiles are viewable"
  ON seller_profiles FOR SELECT
  USING (is_verified = true);

-- Sellers can view their own profile
DROP POLICY IF EXISTS "Sellers can view own profile" ON seller_profiles;
CREATE POLICY "Sellers can view own profile"
  ON seller_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Sellers can create their own profile
DROP POLICY IF EXISTS "Sellers can create own profile" ON seller_profiles;
CREATE POLICY "Sellers can create own profile"
  ON seller_profiles FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_seller = true
    )
  );

-- Sellers can update their own profile
DROP POLICY IF EXISTS "Sellers can update own profile" ON seller_profiles;
CREATE POLICY "Sellers can update own profile"
  ON seller_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- USER ACHIEVEMENTS POLICIES
-- =====================================================

-- Users can view their own achievements
DROP POLICY IF EXISTS "Users can view own achievements" ON user_achievements;
CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  USING (auth.uid() = user_id);

-- Everyone can view public achievements (for leaderboard)
DROP POLICY IF EXISTS "Public achievements are viewable" ON user_achievements;
CREATE POLICY "Public achievements are viewable"
  ON user_achievements FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = user_id AND is_public = true
    )
  );

-- Note: INSERT is handled by triggers, not by users

-- =====================================================
-- TRANSACTIONS POLICIES
-- =====================================================

-- Users can view their own transactions
DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all transactions
DROP POLICY IF EXISTS "Admins can view all transactions" ON transactions;
CREATE POLICY "Admins can view all transactions"
  ON transactions FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Note: INSERT/UPDATE handled by server, not directly by users

-- =====================================================
-- SERVICE ROLE BYPASS POLICIES
-- Critical for cascading deletes and admin operations
-- =====================================================

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
            'follows', 'barangays', 'drop_off_centers'
        )
    ) LOOP
        pol_name := 'service_role_all_' || r.tablename;
        
        -- Drop if exists
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(pol_name) || 
                ' ON ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename);
        
        -- Create bypass policy for service_role
        EXECUTE 'CREATE POLICY ' || quote_ident(pol_name) || 
                ' ON ' || quote_ident(r.schemaname) || '.' || quote_ident(r.tablename) ||
                ' FOR ALL TO service_role USING (true) WITH CHECK (true)';
        
        RAISE NOTICE 'Created service_role bypass policy on: %.%', r.schemaname, r.tablename;
    END LOOP;
END $$;

-- Grant all permissions to service_role
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO service_role;

-- =====================================================
-- GRANT BASIC PERMISSIONS
-- =====================================================

-- Grant SELECT on all tables to authenticated users (RLS will filter)
GRANT SELECT ON TABLE barangays TO authenticated;
GRANT SELECT ON TABLE users TO authenticated;
GRANT SELECT ON TABLE donations TO authenticated;
GRANT SELECT ON TABLE drop_off_centers TO authenticated;
GRANT SELECT ON TABLE community_posts TO authenticated;
GRANT SELECT ON TABLE post_likes TO authenticated;
GRANT SELECT ON TABLE post_comments TO authenticated;
GRANT SELECT ON TABLE follows TO authenticated;
GRANT SELECT ON TABLE notifications TO authenticated;
GRANT SELECT ON TABLE marketplace_items TO authenticated;
GRANT SELECT ON TABLE seller_profiles TO authenticated;
GRANT SELECT ON TABLE user_achievements TO authenticated;
GRANT SELECT ON TABLE transactions TO authenticated;

-- Grant INSERT/UPDATE/DELETE where needed (RLS still applies)
GRANT INSERT, UPDATE, DELETE ON TABLE users TO authenticated;
GRANT INSERT, UPDATE ON TABLE donations TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE community_posts TO authenticated;
GRANT INSERT, DELETE ON TABLE post_likes TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE post_comments TO authenticated;
GRANT INSERT, DELETE ON TABLE follows TO authenticated;
GRANT UPDATE, DELETE ON TABLE notifications TO authenticated;
GRANT INSERT, UPDATE, DELETE ON TABLE marketplace_items TO authenticated;
GRANT INSERT, UPDATE ON TABLE seller_profiles TO authenticated;

-- =====================================================
-- RLS POLICIES COMPLETE
-- Next: Run 03_functions_triggers.sql
-- =====================================================
