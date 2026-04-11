import { supabase } from './supabase'

export type SimpleProfile = {
  id: string
  username: string
  avatar_url: string | null
}

/**
 * Search users by username (case-insensitive, wildcarded) excluding the current user.
 * Returns up to 10 profiles with only id, username and avatar_url.
 */
export async function searchUsers(searchText: string): Promise<SimpleProfile[]> {
  if (!searchText || !searchText.trim()) return []

  // get current user id (if any)
  const { data: userData, error: userErr } = await supabase.auth.getUser()
  if (userErr) {
    console.error('searchUsers: failed to get current user', userErr)
  }
  const currentUserId = userData?.user?.id ?? null

  const pattern = `%${searchText.trim()}%`

  // build query
  let query = supabase
    .from('profiles')
    .select('id, username, avatar_url')
    .ilike('username', pattern)

  if (currentUserId) {
    query = query.neq('id', currentUserId)
  }

  const { data, error } = await query.limit(10)

  if (error) {
    console.error('searchUsers: query error', error)
    return []
  }

  return (data ?? []) as SimpleProfile[]
}

export default searchUsers
