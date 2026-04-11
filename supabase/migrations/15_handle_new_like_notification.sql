-- Migration: 15_handle_new_like_notification.sql
-- Trigger function to create a notification when a post is liked

CREATE OR REPLACE FUNCTION public.handle_new_like_notification()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  recipient_uuid UUID;
  actor_uuid UUID := NEW.user_id;
  actor_row RECORD;
  agg_key TEXT;
  actors_json JSONB;
BEGIN
  -- Find the author of the post
  SELECT p.user_id INTO recipient_uuid
  FROM public.community_posts p
  WHERE p.id = NEW.post_id;

  -- If post or recipient not found, or actor is same as recipient, do nothing
  IF recipient_uuid IS NULL THEN
    RETURN NEW;
  END IF;

  IF actor_uuid = recipient_uuid THEN
    RETURN NEW;
  END IF;

  -- Build aggregation key and actor payload
  agg_key := CONCAT('post_like:', NEW.post_id::text);

  SELECT u.id, u.full_name, u.username, u.profile_image_url INTO actor_row
  FROM public.users u
  WHERE u.id = actor_uuid
  LIMIT 1;

  actors_json := jsonb_build_array(jsonb_build_object('id', actor_row.id, 'name', coalesce(actor_row.full_name, actor_row.username), 'avatar_url', actor_row.profile_image_url));

  -- Insert an aggregated notification row. Notifications table schema includes
  -- aggregation_key and latest_actors JSONB to match server-side aggregation logic.
  INSERT INTO public.notifications (
    recipient_id, sender_id, type, content, link, aggregation_key, latest_actors, count, post_id, is_read, created_at, updated_at
  ) VALUES (
    recipient_uuid,
    actor_uuid,
    'post_like',
    'liked your post',
    CONCAT('/community/profile/', actor_uuid::text),
    agg_key,
    actors_json,
    1,
    NEW.post_id,
    false,
    now(),
    now()
  );

  RETURN NEW;
END;
$$;

-- Create trigger: AFTER INSERT on post_likes
DROP TRIGGER IF EXISTS trg_handle_new_like_notification ON public.post_likes;
CREATE TRIGGER trg_handle_new_like_notification
AFTER INSERT ON public.post_likes
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_like_notification();

COMMENT ON FUNCTION public.handle_new_like_notification() IS 'Trigger function: create notification when a post is liked (skips self-likes) and populate aggregation metadata';
