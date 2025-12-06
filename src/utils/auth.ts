import { useAuthStore } from '@/stores'

/**
 * Gets the authentication token from the store or localStorage.
 * This handles cases where the store might not be rehydrated yet during route loading.
 *
 * @returns The authentication token string, or null if not authenticated
 */
export const getAuthToken = (): string | null => {
  try {
    // First, try to get from the store (this should work with create() and persist)
    const storeState = useAuthStore.getState()
    if (storeState?.token) return storeState.token

    // Fallback: read directly from localStorage (for rehydration timing issues)
    // Zustand persist stores data as: { state: { user, token }, version: 0 }
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('auth-storage')
      if (stored) {
        const parsed = JSON.parse(stored)
        // Zustand persist structure: { state: { token, user }, version: 0 }
        const token = parsed?.state?.token
        if (token && typeof token === 'string' && token.length > 0) return token
      }
    }
  } catch (error) {
    // Silently fail - user is not authenticated
    // Don't log in production to avoid console spam
    if (import.meta.env.NODE_ENV === 'development') {
      console.error('Error reading auth token:', error)
    }
  }

  return null
}
