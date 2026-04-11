-- Fixed optimize script for post_likes
-- This version avoids using 'ADD CONSTRAINT IF NOT EXISTS' (unsupported in Postgres)

-- 1) Conditionally add the UNIQUE constraint if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'post_likes_unique_post_user'
  ) THEN
    EXECUTE 'ALTER TABLE public.post_likes ADD CONSTRAINT post_likes_unique_post_user UNIQUE (post_id, user_id)';
  END IF;
END$$;

-- 2) Indexes: index by post_id for fast counting/fetching, and by user_id for user lookups
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON public.post_likes (post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON public.post_likes (user_id);

-- 3) Optional: a covering index if you often query by post_id and order by created_at
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id_created_at ON public.post_likes (post_id, created_at DESC);

-- 4) Trigger function to keep community_posts.likes_count accurate and avoid race conditions
CREATE OR REPLACE FUNCTION public.handle_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_posts
    SET likes_count = COALESCE(likes_count, 0) + 1
    WHERE id = NEW.post_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_posts
    SET likes_count = GREATEST(COALESCE(likes_count,0) - 1, 0)
    WHERE id = OLD.post_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 5) Attach triggers (use DROP IF EXISTS then CREATE)
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
-- - This script is safe to run, but take a DB backup/snapshot first.
-- - If your application also updates likes_count, monitor counts after enabling the trigger.
