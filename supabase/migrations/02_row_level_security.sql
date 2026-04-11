-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Secure data access for all tables
-- =====================================================

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE drop_off_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- USERS TABLE POLICIES
-- =====================================================

-- Everyone can view public user profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON users FOR SELECT
  USING (is_public = true OR auth.uid() = id);

-- Users can view their own profile regardless of privacy setting
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can insert their own profile (on signup)
CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users cannot delete their own profile (use soft delete via is_active)
CREATE POLICY "Users can soft delete own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- =====================================================
-- DONATIONS TABLE POLICIES
-- =====================================================

-- Users can view their own donations
CREATE POLICY "Users can view own donations"
  ON donations FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own donations
CREATE POLICY "Users can create own donations"
  ON donations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending donations
CREATE POLICY "Users can update own pending donations"
  ON donations FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- DROP-OFF CENTERS POLICIES
-- =====================================================

-- Everyone can view active drop-off centers
CREATE POLICY "Active drop-off centers are viewable by everyone"
  ON drop_off_centers FOR SELECT
  USING (is_active = true);

-- =====================================================
-- COMMUNITY POSTS POLICIES
-- =====================================================

-- Everyone can view active community posts
CREATE POLICY "Active posts are viewable by everyone"
  ON community_posts FOR SELECT
  USING (is_active = true);

-- Authenticated users can create posts
CREATE POLICY "Authenticated users can create posts"
  ON community_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own posts
CREATE POLICY "Users can update own posts"
  ON community_posts FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own posts
CREATE POLICY "Users can delete own posts"
  ON community_posts FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- POST LIKES POLICIES
-- =====================================================

-- Everyone can view post likes
CREATE POLICY "Post likes are viewable by everyone"
  ON post_likes FOR SELECT
  USING (true);

-- Authenticated users can like posts
CREATE POLICY "Authenticated users can like posts"
  ON post_likes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can unlike posts they've liked
CREATE POLICY "Users can delete own likes"
  ON post_likes FOR DELETE
  USING (auth.uid() = user_id);

-- =====================================================
-- MARKETPLACE ITEMS POLICIES
-- =====================================================

-- Everyone can view available marketplace items
CREATE POLICY "Available items are viewable by everyone"
  ON marketplace_items FOR SELECT
  USING (is_available = true);

-- Sellers can view their own items regardless of availability
CREATE POLICY "Sellers can view own items"
  ON marketplace_items FOR SELECT
  USING (auth.uid() = seller_id);

-- Verified sellers can create marketplace items
CREATE POLICY "Verified sellers can create items"
  ON marketplace_items FOR INSERT
  WITH CHECK (
    auth.uid() = seller_id AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_seller = true
    )
  );

-- Sellers can update their own items
CREATE POLICY "Sellers can update own items"
  ON marketplace_items FOR UPDATE
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- Sellers can delete their own items
CREATE POLICY "Sellers can delete own items"
  ON marketplace_items FOR DELETE
  USING (auth.uid() = seller_id);

-- =====================================================
-- SELLER PROFILES POLICIES
-- =====================================================

-- Everyone can view verified seller profiles
CREATE POLICY "Verified seller profiles are viewable by everyone"
  ON seller_profiles FOR SELECT
  USING (is_verified = true);

-- Users can view their own seller profile
CREATE POLICY "Users can view own seller profile"
  ON seller_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Sellers can create their own profile
CREATE POLICY "Sellers can create own profile"
  ON seller_profiles FOR INSERT
  WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND is_seller = true
    )
  );

-- Sellers can update their own profile
CREATE POLICY "Sellers can update own profile"
  ON seller_profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- USER ACHIEVEMENTS POLICIES
-- =====================================================

-- Users can view their own achievements
CREATE POLICY "Users can view own achievements"
  ON user_achievements FOR SELECT
  USING (auth.uid() = user_id);

-- System can insert achievements (handled by triggers/functions)
CREATE POLICY "System can insert achievements"
  ON user_achievements FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- TRANSACTIONS POLICIES
-- =====================================================

-- Users can view their own transactions
CREATE POLICY "Users can view own transactions"
  ON transactions FOR SELECT
  USING (auth.uid() = user_id);

-- System can create transactions
CREATE POLICY "System can create transactions"
  ON transactions FOR INSERT
  WITH CHECK (true);

-- =====================================================
-- STORAGE POLICIES (if using Supabase Storage)
-- =====================================================

-- Note: These are applied in the Supabase dashboard under Storage > Policies
-- Bucket: profile-images
-- Policy: Users can upload their own profile images
-- Policy: Everyone can view profile images

-- Bucket: device-images
-- Policy: Users can upload device images for donations
-- Policy: Everyone can view device images

-- Bucket: marketplace-images
-- Policy: Sellers can upload marketplace item images
-- Policy: Everyone can view marketplace images
