/**
 * Safe localStorage utilities to prevent QuotaExceededError
 */

export interface MinimalUser {
  id: string;
  email: string;
  full_name: string;
  username: string;
  eco_points?: number;
  total_donations?: number;
  total_co2_saved?: number;
  donated_devices?: number;
  recycled_devices?: number;
  phone?: string;
  bio?: string;
  location?: string;
  interests?: string[];
  is_public?: boolean;
  is_seller?: boolean;
  created_at?: string;
}

/**
 * Safely store user data in localStorage
 * Excludes large fields (profile_image_url, base64 data) to avoid quota errors
 */
export function saveUserToLocalStorage(userData: any): void {
  try {
    // Create minimal user object without large fields
    const minimalUser: MinimalUser = {
      id: userData.id,
      email: userData.email,
      full_name: userData.full_name,
      username: userData.username,
      eco_points: userData.eco_points,
      total_donations: userData.total_donations,
      total_co2_saved: userData.total_co2_saved,
      donated_devices: userData.donated_devices,
      recycled_devices: userData.recycled_devices,
      phone: userData.phone,
      bio: userData.bio,
      location: userData.location,
      interests: userData.interests,
      is_public: userData.is_public,
      is_seller: userData.is_seller,
      created_at: userData.created_at
      // profile_image_url intentionally omitted (can be huge base64 string)
    };

    localStorage.setItem('ecokonek_user', JSON.stringify(minimalUser));
  } catch (error) {
    console.warn('Failed to save user to localStorage (quota may be exceeded):', error);
    // Fallback: try saving only essential fields
    try {
      const essentialUser = {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        username: userData.username
      };
      localStorage.setItem('ecokonek_user', JSON.stringify(essentialUser));
    } catch (fallbackError) {
      console.error('Cannot save to localStorage even with minimal data:', fallbackError);
    }
  }
}

/**
 * Get user from localStorage
 */
export function getUserFromLocalStorage(): MinimalUser | null {
  try {
    const stored = localStorage.getItem('ecokonek_user');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to read user from localStorage:', error);
    return null;
  }
}

/**
 * Clear user from localStorage
 */
export function clearUserFromLocalStorage(): void {
  try {
    localStorage.removeItem('ecokonek_user');
  } catch (error) {
    console.error('Failed to clear user from localStorage:', error);
  }
}
