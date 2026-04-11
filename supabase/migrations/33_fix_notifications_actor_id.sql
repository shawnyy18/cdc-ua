-- Fix: Drop ALL triggers on post_likes that cause notification issues
-- The app already handles notifications in code, so database triggers are redundant

-- Drop all known trigger variations
DROP TRIGGER IF EXISTS on_post_like_notification ON post_likes;
DROP TRIGGER IF EXISTS create_like_notification_trigger ON post_likes;
DROP TRIGGER IF EXISTS notify_on_like ON post_likes;
DROP TRIGGER IF EXISTS post_like_notification ON post_likes;
DROP TRIGGER IF EXISTS handle_post_like ON post_likes;
DROP TRIGGER IF EXISTS after_post_like ON post_likes;
DROP TRIGGER IF EXISTS on_like_insert ON post_likes;
DROP TRIGGER IF EXISTS trigger_post_like_notification ON post_likes;

-- Drop all known function variations
DROP FUNCTION IF EXISTS create_like_notification();
DROP FUNCTION IF EXISTS notify_on_post_like();
DROP FUNCTION IF EXISTS handle_post_like_notification();
DROP FUNCTION IF EXISTS on_post_like();

-- Verify no triggers remain (run this query to check):
-- SELECT trigger_name FROM information_schema.triggers WHERE event_object_table = 'post_likes';
