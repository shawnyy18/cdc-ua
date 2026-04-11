import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

/**
 * Checks if the current user is an admin and redirects them to the admin dashboard
 * This should be called in client components on mount
 * @returns true if user is admin (and redirect will happen), false otherwise
 */
export async function redirectIfAdmin(): Promise<boolean> {
  try {
    // Get current user
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      return false
    }

    // Fetch user profile to check is_admin flag
    const { data: userProfile, error } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', session.user.id)
      .single()

    if (error) {
      console.error('Error checking admin status:', error)
      return false
    }

    // If user is admin, redirect to admin dashboard
    if (userProfile?.is_admin === true) {
      console.log('Admin user detected, redirecting to admin dashboard')
      if (typeof window !== 'undefined') {
        window.location.href = '/admin'
      }
      return true
    }

    return false
  } catch (error) {
    console.error('Error in redirectIfAdmin:', error)
    return false
  }
}
