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
          set({ user, token, isAuthenticated: true })
        },
        login: async (payload: Pick<User, 'email' | 'password'>) => {
          const { user, token } = await authService.login(payload)
          set({ user, token, isAuthenticated: true })
        },
        logout: () => set({ user: null, token: null, isAuthenticated: false }),
        get isAuthenticated() {
          return !!get().token
        },
      }
    },
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) state.isAuthenticated = true
      },
    },
  ),
)

export default useAuthStore
