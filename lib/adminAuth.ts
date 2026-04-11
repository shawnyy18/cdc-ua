import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Check if the current user is an admin
 * @param userId - The user ID to check
 * @returns Object with admin status and user data
 */
export async function checkAdminAccess(userId: string): Promise<{
  isAdmin: boolean;
  allowed: boolean;
  redirect?: string;
  user?: any;
}> {
  try {
    // Fetch user's profile from the users table
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, full_name, username, is_admin')
      .eq('id', userId)
      .single();

    if (error || !user) {
      console.error('Error fetching user profile:', error);
      return {
        isAdmin: false,
        allowed: false,
        redirect: '/login'
      };
    }

    // Check if user is admin
    if (user.is_admin) {
      return {
        isAdmin: true,
        allowed: true,
        user
      };
    }

    // Regular user
    return {
      isAdmin: false,
      allowed: false,
      redirect: '/dashboard',
      user
    };
  } catch (error) {
    console.error('Admin check error:', error);
    return {
      isAdmin: false,
      allowed: false,
      redirect: '/dashboard'
    };
  }
}

/**
 * Get the appropriate redirect path based on user's admin status
 * @param userId - The user ID to check
 * @returns Redirect path (/admin or /dashboard)
 */
export async function getPostLoginRedirect(userId: string): Promise<string> {
  const adminCheck = await checkAdminAccess(userId);
  
  if (adminCheck.isAdmin) {
    return '/admin';
  }
  
  return '/dashboard';
}
