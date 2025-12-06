import { authService } from '@/services'
import type { User } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  user: Omit<User, 'password'> | null
  setUser: (user: Omit<User, 'password'> | null) => void
  token: string | null
  setToken: (token: string | null) => void
  login: (payload: Pick<User, 'email' | 'password'>) => Promise<void>
  register: (
    payload: Pick<User, 'username' | 'email' | 'password'>,
  ) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => {
      return {
        user: null,
        setUser: (user) => set({ user }),
        token: null,
        setToken: (token) => set({ token }),
        register: async (
          payload: Pick<User, 'username' | 'email' | 'password'>,
        ) => {
          const { user, token } = await authService.register(payload)
          set({ user, token })
        },
        login: async (payload: Pick<User, 'email' | 'password'>) => {
          const { user, token } = await authService.login(payload)
          set({ user, token })
        },
        logout: () => set({ user: null, token: null }),
        get isAuthenticated() {
          try {
            const state = get()
            return !!state?.token
          } catch {
            return false
          }
        },
      }
    },
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
      }),
      onRehydrateStorage: () => (_state, error) => {
        if (error) {
          console.error('Error rehydrating auth store:', error)
          return
        }
      },
    },
  ),
)

export default useAuthStore
