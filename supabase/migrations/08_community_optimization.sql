-- ============================================
-- COMMUNITY OPTIMIZATION MIGRATION
-- Adds comments, optimizes queries, ensures notifications
-- ============================================

-- 1. CREATE POST COMMENTS TABLE
-- ============================================
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

-- 2. ADD PERFORMANCE INDEXES
-- ============================================
-- Existing indexes are fine, but add composite ones for common queries
CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_user_id ON post_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_created_at ON post_comments(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_post_comments_active_post ON post_comments(post_id, is_active, created_at DESC);

-- Optimize post_likes lookups
CREATE INDEX IF NOT EXISTS idx_post_likes_user_post ON post_likes(user_id, post_id);

-- Optimize community_posts active filter
CREATE INDEX IF NOT EXISTS idx_community_posts_active_created ON community_posts(is_active, created_at DESC) WHERE is_active = true;

-- 3. ROW LEVEL SECURITY FOR COMMENTS
-- ============================================
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if present
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'post_comments' AND policyname = 'post_comments_select_policy') THEN
    EXECUTE 'DROP POLICY "post_comments_select_policy" ON post_comments';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'post_comments' AND policyname = 'post_comments_insert_policy') THEN
    EXECUTE 'DROP POLICY "post_comments_insert_policy" ON post_comments';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'post_comments' AND policyname = 'post_comments_update_policy') THEN
    EXECUTE 'DROP POLICY "post_comments_update_policy" ON post_comments';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_policies WHERE schemaname = 'public' AND tablename = 'post_comments' AND policyname = 'post_comments_delete_policy') THEN
    EXECUTE 'DROP POLICY "post_comments_delete_policy" ON post_comments';
  END IF;
END $$;

-- Anyone can read active comments
CREATE POLICY "post_comments_select_policy"
  ON post_comments FOR SELECT
  USING (is_active = true);

-- Authenticated users can create comments
CREATE POLICY "post_comments_insert_policy"
  ON post_comments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own comments
CREATE POLICY "post_comments_update_policy"
  ON post_comments FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own comments
CREATE POLICY "post_comments_delete_policy"
  ON post_comments FOR DELETE
  USING (auth.uid() = user_id);

-- 4. TRIGGERS FOR COMMENT COUNTS
-- ============================================
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_post_comments_count_insert') THEN
    EXECUTE 'DROP TRIGGER trigger_update_post_comments_count_insert ON post_comments';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_post_comments_count_delete') THEN
    EXECUTE 'DROP TRIGGER trigger_update_post_comments_count_delete ON post_comments';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'trigger_update_post_comments_count_update') THEN
    EXECUTE 'DROP TRIGGER trigger_update_post_comments_count_update ON post_comments';
  END IF;
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_post_comments_updated_at') THEN
    EXECUTE 'DROP TRIGGER update_post_comments_updated_at ON post_comments';
  END IF;
END $$;

CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT' AND NEW.is_active = true) THEN
    UPDATE community_posts 
    SET comments_count = comments_count + 1 
    WHERE id = NEW.post_id;
  ELSIF (TG_OP = 'DELETE' OR (TG_OP = 'UPDATE' AND OLD.is_active = true AND NEW.is_active = false)) THEN
    UPDATE community_posts 
    SET comments_count = GREATEST(0, comments_count - 1)
    WHERE id = COALESCE(OLD.post_id, NEW.post_id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_post_comments_count_insert
  AFTER INSERT ON post_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_post_comments_count();

CREATE TRIGGER trigger_update_post_comments_count_delete
  AFTER DELETE ON post_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_post_comments_count();

CREATE TRIGGER trigger_update_post_comments_count_update
  AFTER UPDATE ON post_comments
  FOR EACH ROW
  WHEN (OLD.is_active IS DISTINCT FROM NEW.is_active)
  EXECUTE FUNCTION update_post_comments_count();

-- 5. AUTO UPDATE TIMESTAMP FOR COMMENTS
-- ============================================
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'update_post_comments_updated_at') THEN
    EXECUTE 'DROP TRIGGER update_post_comments_updated_at ON post_comments';
  END IF;
END $$;
CREATE TRIGGER update_post_comments_updated_at
  BEFORE UPDATE ON post_comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 6. ADD TABLE COMMENTS
-- ============================================
COMMENT ON TABLE post_comments IS 'User comments on community posts';
COMMENT ON COLUMN post_comments.content IS 'Comment text (max 500 chars)';
COMMENT ON FUNCTION update_post_comments_count() IS 'Updates comments_count on community_posts when comments are added/removed';

