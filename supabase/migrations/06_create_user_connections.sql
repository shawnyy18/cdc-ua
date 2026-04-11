-- CREATE USER CONNECTIONS TABLE
-- This allows users to follow/connect with each other

-- 1. Create user_connections table
CREATE TABLE IF NOT EXISTS public.user_connections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  following_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Prevent duplicate connections
  UNIQUE(follower_id, following_id),
  
  -- Prevent self-following
  CHECK (follower_id != following_id)
);

-- 2. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_connections_follower ON public.user_connections(follower_id);
CREATE INDEX IF NOT EXISTS idx_user_connections_following ON public.user_connections(following_id);
CREATE INDEX IF NOT EXISTS idx_user_connections_created_at ON public.user_connections(created_at DESC);

-- 3. Enable RLS
ALTER TABLE public.user_connections ENABLE ROW LEVEL SECURITY;

-- 4. RLS Policies

-- Anyone can view connections
DROP POLICY IF EXISTS anyone_can_view_connections ON public.user_connections;
CREATE POLICY anyone_can_view_connections
  ON public.user_connections
  FOR SELECT
  USING (true);

-- Users can create their own connections (follow others)
DROP POLICY IF EXISTS users_can_create_connections ON public.user_connections;
CREATE POLICY users_can_create_connections
  ON public.user_connections
  FOR INSERT
  WITH CHECK (follower_id = auth.uid());

-- Users can delete their own connections (unfollow)
DROP POLICY IF EXISTS users_can_delete_own_connections ON public.user_connections;
CREATE POLICY users_can_delete_own_connections
  ON public.user_connections
  FOR DELETE
  USING (follower_id = auth.uid());

-- 5. Add follower/following counts to users table (optional, for performance)
ALTER TABLE public.users 
  ADD COLUMN IF NOT EXISTS followers_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS following_count INTEGER DEFAULT 0;

-- 6. Create function to update follower counts
CREATE OR REPLACE FUNCTION public.update_connection_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- Increment following count for follower
    UPDATE public.users 
    SET following_count = following_count + 1 
    WHERE id = NEW.follower_id;
    
    -- Increment followers count for the one being followed
    UPDATE public.users 
    SET followers_count = followers_count + 1 
    WHERE id = NEW.following_id;
    
  ELSIF TG_OP = 'DELETE' THEN
    -- Decrement following count for follower
    UPDATE public.users 
    SET following_count = GREATEST(0, following_count - 1) 
    WHERE id = OLD.follower_id;
    
    -- Decrement followers count for the one being unfollowed
    UPDATE public.users 
    SET followers_count = GREATEST(0, followers_count - 1) 
    WHERE id = OLD.following_id;
  END IF;
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Create trigger to auto-update counts
DROP TRIGGER IF EXISTS trigger_update_connection_counts ON public.user_connections;
CREATE TRIGGER trigger_update_connection_counts
  AFTER INSERT OR DELETE ON public.user_connections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_connection_counts();

-- 8. Add comments
COMMENT ON TABLE public.user_connections IS 'Stores follower/following relationships between users';
COMMENT ON COLUMN public.users.followers_count IS 'Number of users following this user';
COMMENT ON COLUMN public.users.following_count IS 'Number of users this user is following';
