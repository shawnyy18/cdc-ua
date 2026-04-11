-- =====================================================
-- DATABASE FUNCTIONS AND TRIGGERS
-- Automated logic and data integrity
-- =====================================================

-- =====================================================
-- FUNCTION: Update updated_at timestamp
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at
  BEFORE UPDATE ON donations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_drop_off_centers_updated_at
  BEFORE UPDATE ON drop_off_centers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_community_posts_updated_at
  BEFORE UPDATE ON community_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_marketplace_items_updated_at
  BEFORE UPDATE ON marketplace_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_seller_profiles_updated_at
  BEFORE UPDATE ON seller_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE ON transactions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- FUNCTION: Update post likes count when like is added/removed
-- =====================================================
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE community_posts 
    SET likes_count = likes_count + 1 
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE community_posts 
    SET likes_count = GREATEST(0, likes_count - 1)
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_likes_count_on_insert
  AFTER INSERT ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_post_likes_count();

CREATE TRIGGER update_likes_count_on_delete
  AFTER DELETE ON post_likes
  FOR EACH ROW
  EXECUTE FUNCTION update_post_likes_count();

-- =====================================================
-- FUNCTION: Validate donation data
-- =====================================================
CREATE OR REPLACE FUNCTION validate_donation()
RETURNS TRIGGER AS $$
BEGIN
  -- Ensure eco_points_earned is positive
  IF NEW.eco_points_earned < 0 THEN
    RAISE EXCEPTION 'Eco points earned cannot be negative';
  END IF;
  
  -- Ensure co2_saved is positive
  IF NEW.co2_saved < 0 THEN
    RAISE EXCEPTION 'CO2 saved cannot be negative';
  END IF;
  
  -- Ensure year is reasonable if provided
  IF NEW.year IS NOT NULL AND (NEW.year < 1900 OR NEW.year > EXTRACT(YEAR FROM NOW()) + 1) THEN
    RAISE EXCEPTION 'Invalid year provided';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_donation_before_insert
  BEFORE INSERT ON donations
  FOR EACH ROW
  EXECUTE FUNCTION validate_donation();

-- =====================================================
-- FUNCTION: Check achievement eligibility
-- =====================================================
CREATE OR REPLACE FUNCTION check_achievements(p_user_id UUID)
RETURNS void AS $$
DECLARE
  v_eco_points INTEGER;
  v_total_donations INTEGER;
  v_total_co2_saved DECIMAL;
  v_recycled_devices INTEGER;
BEGIN
  -- Get user stats
  SELECT eco_points, total_donations, total_co2_saved, recycled_devices
  INTO v_eco_points, v_total_donations, v_total_co2_saved, v_recycled_devices
  FROM users
  WHERE id = p_user_id;
  
  -- First donation achievement
  IF v_total_donations >= 1 THEN
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, 'first-donation')
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;
  
  -- Eco Warrior (100 points)
  IF v_eco_points >= 100 THEN
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, 'eco-warrior')
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;
  
  -- Eco Champion (500 points)
  IF v_eco_points >= 500 THEN
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, 'eco-champion')
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;
  
  -- Generous Giver (5 donations)
  IF v_total_donations >= 5 THEN
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, 'generous-giver')
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;
  
  -- Donation Hero (10 donations)
  IF v_total_donations >= 10 THEN
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, 'donation-hero')
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;
  
  -- Carbon Saver (50kg CO2)
  IF v_total_co2_saved >= 50 THEN
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, 'carbon-saver')
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;
  
  -- Climate Protector (100kg CO2)
  IF v_total_co2_saved >= 100 THEN
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, 'climate-protector')
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;
  
  -- Tech Recycler
  IF v_recycled_devices >= 1 THEN
    INSERT INTO user_achievements (user_id, achievement_id)
    VALUES (p_user_id, 'tech-recycler')
    ON CONFLICT (user_id, achievement_id) DO NOTHING;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- FUNCTION: Get user rank by eco points
-- =====================================================
CREATE OR REPLACE FUNCTION get_user_rank(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_rank INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO v_rank
  FROM users
  WHERE eco_points > (SELECT eco_points FROM users WHERE id = p_user_id)
    AND is_active = true;
  
  RETURN v_rank;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- FUNCTION: Calculate eco impact for device type
-- =====================================================
CREATE OR REPLACE FUNCTION calculate_eco_impact(
  p_device_type VARCHAR,
  p_condition VARCHAR
)
RETURNS TABLE(eco_points INTEGER, co2_saved DECIMAL) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN p_device_type = 'smartphone' AND p_condition = 'working' THEN 75
      WHEN p_device_type = 'smartphone' AND p_condition != 'working' THEN 35
      WHEN p_device_type = 'laptop' AND p_condition = 'working' THEN 150
      WHEN p_device_type = 'laptop' AND p_condition != 'working' THEN 75
      WHEN p_device_type = 'tablet' AND p_condition = 'working' THEN 90
      WHEN p_device_type = 'tablet' AND p_condition != 'working' THEN 45
      WHEN p_device_type = 'desktop' AND p_condition = 'working' THEN 120
      WHEN p_device_type = 'desktop' AND p_condition != 'working' THEN 60
      WHEN p_device_type = 'appliance' AND p_condition = 'working' THEN 60
      WHEN p_device_type = 'appliance' AND p_condition != 'working' THEN 30
      WHEN p_device_type = 'battery' AND p_condition = 'working' THEN 25
      WHEN p_device_type = 'battery' AND p_condition != 'working' THEN 15
      WHEN p_device_type = 'cable' AND p_condition = 'working' THEN 15
      WHEN p_device_type = 'cable' AND p_condition != 'working' THEN 8
      WHEN p_device_type = 'headphones' AND p_condition = 'working' THEN 40
      WHEN p_device_type = 'headphones' AND p_condition != 'working' THEN 20
      ELSE 50
    END AS eco_points,
    CASE 
      WHEN p_device_type = 'smartphone' AND p_condition = 'working' THEN 8.5
      WHEN p_device_type = 'smartphone' AND p_condition != 'working' THEN 4.2
      WHEN p_device_type = 'laptop' AND p_condition = 'working' THEN 18.7
      WHEN p_device_type = 'laptop' AND p_condition != 'working' THEN 9.4
      WHEN p_device_type = 'tablet' AND p_condition = 'working' THEN 11.3
      WHEN p_device_type = 'tablet' AND p_condition != 'working' THEN 5.7
      WHEN p_device_type = 'desktop' AND p_condition = 'working' THEN 22.1
      WHEN p_device_type = 'desktop' AND p_condition != 'working' THEN 11.1
      WHEN p_device_type = 'appliance' AND p_condition = 'working' THEN 7.8
      WHEN p_device_type = 'appliance' AND p_condition != 'working' THEN 3.9
      WHEN p_device_type = 'battery' AND p_condition = 'working' THEN 3.2
      WHEN p_device_type = 'battery' AND p_condition != 'working' THEN 1.6
      WHEN p_device_type = 'cable' AND p_condition = 'working' THEN 1.5
      WHEN p_device_type = 'cable' AND p_condition != 'working' THEN 0.8
      WHEN p_device_type = 'headphones' AND p_condition = 'working' THEN 5.4
      WHEN p_device_type = 'headphones' AND p_condition != 'working' THEN 2.7
      ELSE 5.0
    END::DECIMAL AS co2_saved;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- FUNCTION: Handle new user creation
-- =====================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (
    id,
    email,
    full_name,
    username,
    phone,
    bio,
    location,
    interests,
    profile_image_url,
    is_public,
    is_seller,
    is_active,
    eco_points,
    total_donations,
    total_co2_saved,
    donated_devices,
    recycled_devices,
    created_at,
    updated_at
  ) VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'username', SPLIT_PART(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'phone', NULL),
    '',
    '',
    ARRAY[]::TEXT[],
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    true,
    false,
    true,
    0,
    0,
    0,
    0,
    0,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating user profile on auth.users insert
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- =====================================================
-- FUNCTION: Search users by username or name
-- =====================================================
CREATE OR REPLACE FUNCTION search_users(search_term TEXT)
RETURNS TABLE(
  id UUID,
  username VARCHAR,
  full_name VARCHAR,
  profile_image_url TEXT,
  eco_points INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.username,
    u.full_name,
    u.profile_image_url,
    u.eco_points
  FROM users u
  WHERE 
    u.is_active = true 
    AND u.is_public = true
    AND (
      u.username ILIKE '%' || search_term || '%'
      OR u.full_name ILIKE '%' || search_term || '%'
    )
  ORDER BY u.eco_points DESC
  LIMIT 20;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- FUNCTION: Get community feed with user info
-- =====================================================
CREATE OR REPLACE FUNCTION get_community_feed(p_limit INTEGER DEFAULT 50)
RETURNS TABLE(
  post_id UUID,
  content TEXT,
  likes_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE,
  user_id UUID,
  username VARCHAR,
  full_name VARCHAR,
  profile_image_url TEXT,
  is_seller BOOLEAN
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.content,
    p.likes_count,
    p.created_at,
    u.id,
    u.username,
    u.full_name,
    u.profile_image_url,
    u.is_seller
  FROM community_posts p
  JOIN users u ON p.user_id = u.id
  WHERE p.is_active = true
  ORDER BY p.created_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION update_updated_at_column() IS 'Automatically updates the updated_at timestamp';
COMMENT ON FUNCTION update_post_likes_count() IS 'Updates likes_count on community_posts when likes are added/removed';
COMMENT ON FUNCTION validate_donation() IS 'Validates donation data before insert';
COMMENT ON FUNCTION check_achievements(UUID) IS 'Checks and awards achievements based on user stats';
COMMENT ON FUNCTION get_user_rank(UUID) IS 'Returns user rank based on eco points';
COMMENT ON FUNCTION calculate_eco_impact(VARCHAR, VARCHAR) IS 'Calculates eco points and CO2 saved for device donations';
COMMENT ON FUNCTION handle_new_user() IS 'Automatically creates user profile when auth user is created';
COMMENT ON FUNCTION search_users(TEXT) IS 'Searches users by username or full name';
COMMENT ON FUNCTION get_community_feed(INTEGER) IS 'Returns community posts with user information';
