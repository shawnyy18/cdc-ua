-- Optimize post_likes table
-- Run these statements to ensure indexes and triggers exist for efficient like operations

-- 1) Ensure the unique constraint exists to prevent duplicate likes
ALTER TABLE IF EXISTS public.post_likes
  ADD CONSTRAINT IF NOT EXISTS post_likes_unique_post_user UNIQUE (post_id, user_id);

-- 2) Indexes: index by post_id for fast counting/fetching, and by user_id for user lookups
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON public.post_likes (post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON public.post_likes (user_id);

-- 3) Optional: a covering index if you often query by post_id and order by created_at
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id_created_at ON public.post_likes (post_id, created_at DESC);

-- 4) Trigger function to keep community_posts.likes_count accurate and avoid race conditions
-- This function increments/decrements the likes_count on insert/delete of post_likes.
CREATE OR REPLACE FUNCTION public.handle_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts
    SET likes_count = likes_count + 1
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts
    SET likes_count = GREATEST(coalesce(likes_count,0) - 1, 0)
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 5) Attach triggers
DROP TRIGGER IF EXISTS trg_post_likes_after_insert ON public.post_likes;
CREATE TRIGGER trg_post_likes_after_insert
AFTER INSERT ON public.post_likes
FOR EACH ROW
EXECUTE FUNCTION public.handle_post_likes_count();

DROP TRIGGER IF EXISTS trg_post_likes_after_delete ON public.post_likes;
CREATE TRIGGER trg_post_likes_after_delete
AFTER DELETE ON public.post_likes
FOR EACH ROW
EXECUTE FUNCTION public.handle_post_likes_count();

-- 6) Run ANALYZE to update planner statistics
ANALYZE public.post_likes;
ANALYZE public.community_posts;

-- Notes:
-- - These changes are safe to run on a live database but please take a backup/snapshot
--   before running destructive migrations.
-- - If you already update likes_count in application code, the trigger provides
--   a database-level guard against race conditions. You may remove the application-level
--   manual likes_count updates once the trigger is confirmed working.
