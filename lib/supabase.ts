import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    debug: process.env.NODE_ENV === 'development' // Enable debug logs in dev
  }
})

// Helper function to get current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  return { user, error }
}

// Helper function to get session
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
}

// Helper function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}
