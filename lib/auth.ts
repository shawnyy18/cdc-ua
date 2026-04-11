/**
 * Synchronous localStorage auth helper.
 * Reads credentials without any network round-trip — use for fast-path auth checks.
 */

export interface StoredAuth {
  token: string
  userId: string
  user: Record<string, any>
}

/**
 * Read auth from localStorage synchronously.
 * Returns null when not authenticated or when running on the server.
 */
export function getStoredAuth(): StoredAuth | null {
  if (typeof window === 'undefined') return null
  try {
    const token = localStorage.getItem('ecokonek_token')
    const userStr = localStorage.getItem('ecokonek_user')
    if (!token || !userStr) return null
    const user = JSON.parse(userStr)
    if (!user?.id) return null
    return { token, userId: user.id, user }
  } catch {
    return null
  }
}

/**
 * Returns true if a valid (present) token exists in localStorage.
 * Does NOT verify the signature — token validity is enforced by AuthChecker and server routes.
 */
export function isStoredAuthPresent(): boolean {
  return getStoredAuth() !== null
}
