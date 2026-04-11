-- =====================================================
-- ECOKONEK COMPLETE DATABASE SCHEMA
-- Creates all tables from scratch
-- Run this file first before other migrations
-- =====================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- 1. BARANGAYS TABLE
-- Barangay locations for admin scoping
-- =====================================================
CREATE TABLE IF NOT EXISTS barangays (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  municipality VARCHAR(255) NOT NULL,
  province VARCHAR(255) NOT NULL DEFAULT 'Pampanga',
  description TEXT,
  contact_person VARCHAR(255),
  contact_phone VARCHAR(20),
  contact_email VARCHAR(255),
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 2. USERS TABLE
-- Core user profiles and statistics
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  bio TEXT,
  location VARCHAR(255),
  interests TEXT[],
  profile_image_url TEXT,
  
  -- User settings
  is_public BOOLEAN DEFAULT true,
  is_seller BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  is_admin BOOLEAN DEFAULT false,
  
  -- Barangay association
  barangay_id UUID REFERENCES barangays(id) ON DELETE SET NULL,
  
  -- User statistics
  eco_points INTEGER DEFAULT 0,
  total_donations INTEGER DEFAULT 0,
  total_co2_saved DECIMAL(10,2) DEFAULT 0,
  donated_devices INTEGER DEFAULT 0,
  recycled_devices INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 3. DROP-OFF CENTERS TABLE
-- Physical locations for donations
-- =====================================================
CREATE TABLE IF NOT EXISTS drop_off_centers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL UNIQUE,
  address TEXT NOT NULL,
  city VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  operating_hours TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  is_active BOOLEAN DEFAULT true,
  
  -- Barangay association
  barangay_id UUID REFERENCES barangays(id) ON DELETE SET NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 4. DONATIONS TABLE
-- Track all device donations and recycling
-- =====================================================
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Device information
  device_type VARCHAR(50) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  condition VARCHAR(20) NOT NULL CHECK (condition IN ('working', 'broken', 'damaged')),
  description TEXT,
  year INTEGER,
  
  -- Donation details
  drop_off_center VARCHAR(255),
  eco_points_earned INTEGER NOT NULL DEFAULT 0,
  co2_saved DECIMAL(10,2) NOT NULL DEFAULT 0,
  
  -- CDC Asset Tracking
  is_cdc_asset BOOLEAN NOT NULL DEFAULT false,
  property_number VARCHAR(100),
  serial_number VARCHAR(100),
  
  -- Status tracking
  status VARCHAR(30) DEFAULT 'pending_evaluation' CHECK (status IN ('pending_evaluation', 'reallocated', 'donated', 'disposed', 'voided')),
  
  -- Disposition metadata
  disposition_type VARCHAR(30) CHECK (disposition_type IS NULL OR disposition_type IN ('reallocate', 'donate', 'dispose', 'void')),
  disposition_notes TEXT,
  evaluated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  evaluated_at TIMESTAMP WITH TIME ZONE,
  
  -- Barangay association
  barangay_id UUID REFERENCES barangays(id) ON DELETE SET NULL,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- CDC asset constraint
  CONSTRAINT chk_cdc_asset_fields CHECK (
    is_cdc_asset = false
    OR (
      is_cdc_asset = true
      AND property_number IS NOT NULL
      AND property_number <> ''
      AND serial_number IS NOT NULL
      AND serial_number <> ''
    )
  )
);

-- =====================================================
-- 5. COMMUNITY POSTS TABLE
-- User-generated community content
-- =====================================================
CREATE TABLE IF NOT EXISTS community_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (LENGTH(content) <= 500),
  
  -- Engagement metrics
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 6. POST LIKES TABLE
-- Track which users liked which posts
-- =====================================================
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure a user can only like a post once
  UNIQUE(post_id, user_id)
);

-- =====================================================
-- 7. POST COMMENTS TABLE
-- Comments on community posts
-- =====================================================
CREATE TABLE IF NOT EXISTS post_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL CHECK (char_length(content) <= 500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT unique_comment_timestamp UNIQUE (post_id, user_id, created_at)
);

-- =====================================================
-- 8. FOLLOWS TABLE
-- User follow relationships
-- =====================================================
CREATE TABLE IF NOT EXISTS follows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Ensure unique follow and prevent self-follow
  CONSTRAINT follows_unique_follower_following UNIQUE (follower_id, following_id),
  CONSTRAINT follows_no_self_follow CHECK (follower_id <> following_id)
);

-- =====================================================
-- 9. NOTIFICATIONS TABLE
-- User notifications with aggregation support
-- =====================================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sender_id UUID REFERENCES users(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  content TEXT,
  link TEXT,
  aggregation_key TEXT,
  latest_actors JSONB,
  count INTEGER NOT NULL DEFAULT 1,
  post_id UUID REFERENCES community_posts(id) ON DELETE CASCADE,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================================================
-- 10. MARKETPLACE ITEMS TABLE (Optional)
-- Items listed for sale by sellers
-- =====================================================
CREATE TABLE IF NOT EXISTS marketplace_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Item details
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  original_price DECIMAL(10,2),
  category VARCHAR(100),
  condition VARCHAR(50),
  image_url TEXT,
  
  -- Status
  is_available BOOLEAN DEFAULT true,
  views_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 11. SELLER PROFILES TABLE (Optional)
-- Extended information for sellers
-- =====================================================
CREATE TABLE IF NOT EXISTS seller_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  
  -- Business information
  business_name VARCHAR(255),
  description TEXT,
  
  -- Performance metrics
  rating DECIMAL(3,2) DEFAULT 5.0 CHECK (rating >= 0 AND rating <= 5),
  total_sales INTEGER DEFAULT 0,
  commission_rate DECIMAL(5,2) DEFAULT 5.0,
  
  -- Verification
  is_verified BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 12. ACHIEVEMENTS TABLE (Optional)
-- Track user achievements and milestones
-- =====================================================
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  achievement_id VARCHAR(50) NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure a user can only earn each achievement once
  UNIQUE(user_id, achievement_id)
);

-- =====================================================
-- 13. TRANSACTIONS TABLE (Optional)
-- Financial transactions and payments
-- =====================================================
CREATE TABLE IF NOT EXISTS transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  item_id UUID REFERENCES marketplace_items(id) ON DELETE SET NULL,
  
  -- Transaction details
  type VARCHAR(20) NOT NULL CHECK (type IN ('purchase', 'sale', 'refund', 'commission')),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method VARCHAR(50),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- 14. AUDIT LOG TABLE
-- Track admin actions for security
-- =====================================================
CREATE TABLE IF NOT EXISTS audit_log (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ DEFAULT now(),
  admin_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action_details TEXT
);

-- =====================================================
-- CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_eco_points ON users(eco_points DESC);
CREATE INDEX IF NOT EXISTS idx_users_is_admin ON users(is_admin) WHERE is_admin = TRUE;
CREATE INDEX IF NOT EXISTS idx_users_barangay ON users(barangay_id) WHERE barangay_id IS NOT NULL;

-- Donations indexes
CREATE INDEX IF NOT EXISTS idx_donations_user_id ON donations(user_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_donations_barangay ON donations(barangay_id) WHERE barangay_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_donations_cdc_asset ON donations(is_cdc_asset) WHERE is_cdc_asset = true;

-- Community posts indexes
CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_posts_active_created ON community_posts(is_active, created_at DESC) WHERE is_active = true;

-- Post likes indexes
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON post_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_post ON post_likes(user_id, post_id);

-- Post comments indexes
CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_user_id ON post_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_created_at ON post_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_comments_active_post ON post_comments(post_id, is_active, created_at DESC);

-- Follows indexes
CREATE INDEX IF NOT EXISTS idx_follows_follower ON follows(follower_id);
CREATE INDEX IF NOT EXISTS idx_follows_following ON follows(following_id);

-- Notifications indexes
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_created_at ON notifications(recipient_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_read ON notifications(recipient_id, is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_aggregation_key ON notifications(aggregation_key);

-- Marketplace indexes
CREATE INDEX IF NOT EXISTS idx_marketplace_items_seller_id ON marketplace_items(seller_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_is_available ON marketplace_items(is_available);

-- =====================================================
-- INSERT DEFAULT DATA
-- =====================================================

-- Insert CDC departments (stored in barangays table for schema compatibility)
INSERT INTO barangays (name, municipality, province, description) VALUES
  ('ACCES',          'Clark Development Corporation', 'Pampanga', 'ACCES'),
  ('AD',             'Clark Development Corporation', 'Pampanga', 'AD'),
  ('AFG',            'Clark Development Corporation', 'Pampanga', 'AFG'),
  ('AMD',            'Clark Development Corporation', 'Pampanga', 'AMD'),
  ('AMD-SRD',        'Clark Development Corporation', 'Pampanga', 'AMD-SRD'),
  ('AMD-TO',         'Clark Development Corporation', 'Pampanga', 'AMD-TO'),
  ('AMD-WH',         'Clark Development Corporation', 'Pampanga', 'AMD-WH'),
  ('BAC',            'Clark Development Corporation', 'Pampanga', 'BAC'),
  ('BDBEG',          'Clark Development Corporation', 'Pampanga', 'BDBEG'),
  ('BDD',            'Clark Development Corporation', 'Pampanga', 'BDD'),
  ('BED',            'Clark Development Corporation', 'Pampanga', 'BED'),
  ('BFMD',           'Clark Development Corporation', 'Pampanga', 'BFMD'),
  ('BFPD',           'Clark Development Corporation', 'Pampanga', 'BFPD'),
  ('BOD',            'Clark Development Corporation', 'Pampanga', 'BOD'),
  ('BRO',            'Clark Development Corporation', 'Pampanga', 'BRO'),
  ('BS',             'Clark Development Corporation', 'Pampanga', 'BS'),
  ('CD',             'Clark Development Corporation', 'Pampanga', 'CD'),
  ('CMD',            'Clark Development Corporation', 'Pampanga', 'CMD'),
  ('COA',            'Clark Development Corporation', 'Pampanga', 'COA'),
  ('CPD',            'Clark Development Corporation', 'Pampanga', 'CPD'),
  ('CSD',            'Clark Development Corporation', 'Pampanga', 'CSD'),
  ('CSRPD',          'Clark Development Corporation', 'Pampanga', 'CSRPD'),
  ('EAD',            'Clark Development Corporation', 'Pampanga', 'EAD'),
  ('EPD',            'Clark Development Corporation', 'Pampanga', 'EPD'),
  ('EPRD',           'Clark Development Corporation', 'Pampanga', 'EPRD'),
  ('ESG',            'Clark Development Corporation', 'Pampanga', 'ESG'),
  ('FIN-AD',         'Clark Development Corporation', 'Pampanga', 'FIN-AD'),
  ('GIS',            'Clark Development Corporation', 'Pampanga', 'GIS'),
  ('HRD',            'Clark Development Corporation', 'Pampanga', 'HRD'),
  ('HSD',            'Clark Development Corporation', 'Pampanga', 'HSD'),
  ('HSDVACCINATION', 'Clark Development Corporation', 'Pampanga', 'HSDVACCINATION'),
  ('HSDVT POLY',     'Clark Development Corporation', 'Pampanga', 'HSDVT POLY'),
  ('IAD',            'Clark Development Corporation', 'Pampanga', 'IAD'),
  ('IPD',            'Clark Development Corporation', 'Pampanga', 'IPD'),
  ('ITD',            'Clark Development Corporation', 'Pampanga', 'ITD'),
  ('LAG',            'Clark Development Corporation', 'Pampanga', 'LAG'),
  ('LD',             'Clark Development Corporation', 'Pampanga', 'LD'),
  ('OAVP/A',         'Clark Development Corporation', 'Pampanga', 'OAVP/A'),
  ('OP',             'Clark Development Corporation', 'Pampanga', 'OP'),
  ('PD',             'Clark Development Corporation', 'Pampanga', 'PD'),
  ('PD-BAC',         'Clark Development Corporation', 'Pampanga', 'PD-BAC'),
  ('PF',             'Clark Development Corporation', 'Pampanga', 'PF'),
  ('PMD',            'Clark Development Corporation', 'Pampanga', 'PMD'),
  ('PSD',            'Clark Development Corporation', 'Pampanga', 'PSD'),
  ('RMD',            'Clark Development Corporation', 'Pampanga', 'RMD'),
  ('SCADC',          'Clark Development Corporation', 'Pampanga', 'SCADC'),
  ('SCD',            'Clark Development Corporation', 'Pampanga', 'SCD'),
  ('SSD',            'Clark Development Corporation', 'Pampanga', 'SSD'),
  ('SSG',            'Clark Development Corporation', 'Pampanga', 'SSG'),
  ('TD',             'Clark Development Corporation', 'Pampanga', 'TD'),
  ('TFD',            'Clark Development Corporation', 'Pampanga', 'TFD'),
  ('TPD',            'Clark Development Corporation', 'Pampanga', 'TPD'),
  ('TSD',            'Clark Development Corporation', 'Pampanga', 'TSD')
ON CONFLICT (name) DO NOTHING;

-- Insert default drop-off center
INSERT INTO drop_off_centers (name, address, city, location, phone, email, operating_hours) VALUES
  ('CDC IT Department Collection Point', 'Clark Freeport Zone', 'Clark', 'Clark Freeport Zone, Pampanga', NULL, NULL, 'Mon-Fri 8AM-5PM')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- TABLE COMMENTS (Documentation)
-- =====================================================
COMMENT ON TABLE barangays IS 'CDC departments (uses barangays table name for schema compatibility)';
COMMENT ON TABLE users IS 'Core user profiles with statistics and preferences';
COMMENT ON TABLE donations IS 'Device donations and recycling records';
COMMENT ON TABLE drop_off_centers IS 'Physical locations where donations can be dropped off';
COMMENT ON TABLE community_posts IS 'User-generated posts in the community feed';
COMMENT ON TABLE post_likes IS 'Tracks which users have liked which posts';
COMMENT ON TABLE post_comments IS 'Comments on community posts';
COMMENT ON TABLE follows IS 'Follow relationships between users';
COMMENT ON TABLE notifications IS 'User notifications with aggregation support';
COMMENT ON TABLE marketplace_items IS 'Items listed for sale in the marketplace';
COMMENT ON TABLE seller_profiles IS 'Extended profiles for verified sellers';
COMMENT ON TABLE user_achievements IS 'User achievements and milestones';
COMMENT ON TABLE transactions IS 'Financial transactions and payment records';
COMMENT ON TABLE audit_log IS 'Audit trail for admin actions';

-- =====================================================
-- SCHEMA CREATION COMPLETE
-- Next: Run 02_row_level_security.sql
-- =====================================================
