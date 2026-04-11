-- =====================================================
-- ECOKONEK DATABASE SCHEMA
-- Complete table structure for the application
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
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
-- DONATIONS TABLE
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
  
  -- Status tracking
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'processing', 'completed', 'rejected')),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- DROP-OFF CENTERS TABLE
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
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- COMMUNITY POSTS TABLE
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
-- POST LIKES TABLE
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
-- MARKETPLACE ITEMS TABLE
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
-- SELLER PROFILES TABLE
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
-- ACHIEVEMENTS TABLE
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
-- TRANSACTIONS TABLE
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
-- Add indexes for better query performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_eco_points ON users(eco_points DESC);
CREATE INDEX IF NOT EXISTS idx_donations_user_id ON donations(user_id);
CREATE INDEX IF NOT EXISTS idx_donations_status ON donations(status);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_created_at ON community_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON post_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_seller_id ON marketplace_items(seller_id);
CREATE INDEX IF NOT EXISTS idx_marketplace_items_is_available ON marketplace_items(is_available);

-- =====================================================
-- Insert default drop-off centers
-- =====================================================
INSERT INTO drop_off_centers (name, address, city, location, phone, email, operating_hours) VALUES
  ('EcoKonek Central Hub', 'Jose Abad Santos Avenue', 'San Fernando', 'Jose Abad Santos Avenue, San Fernando, Pampanga', '+63 45 123 4567', 'central@ecokonek.ph', 'Mon-Sat 8AM-6PM'),
  ('EcoKonek Angeles Branch', 'MacArthur Highway', 'Angeles City', 'MacArthur Highway, Angeles City, Pampanga', '+63 45 234 5678', 'angeles@ecokonek.ph', 'Mon-Fri 9AM-5PM'),
  ('EcoKonek Clark Branch', 'Clark Freeport Zone', 'Angeles City', 'Clark Freeport Zone, Angeles City, Pampanga', '+63 45 345 6789', 'clark@ecokonek.ph', 'Mon-Sun 9AM-7PM')
ON CONFLICT (name) DO NOTHING;

COMMENT ON TABLE users IS 'Core user profiles with statistics and preferences';
COMMENT ON TABLE donations IS 'Device donations and recycling records';
COMMENT ON TABLE drop_off_centers IS 'Physical locations where donations can be dropped off';
COMMENT ON TABLE community_posts IS 'User-generated posts in the community feed';
COMMENT ON TABLE post_likes IS 'Tracks which users have liked which posts';
COMMENT ON TABLE marketplace_items IS 'Items listed for sale in the marketplace';
COMMENT ON TABLE seller_profiles IS 'Extended profiles for verified sellers';
COMMENT ON TABLE user_achievements IS 'User achievements and milestones';
COMMENT ON TABLE transactions IS 'Financial transactions and payment records';
