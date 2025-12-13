import { message } from 'antd'
import type { ApiReponse, User } from '@/types'
import { apiCall } from '@/utils'

const AuthService = {
  register: async (
    payload: Pick<User, 'username' | 'email' | 'password'>,
  ): Promise<{ user: Omit<User, 'password'>; token: string }> => {
    const response = await apiCall<
      Pick<User, 'username' | 'email' | 'password'>,
      ApiReponse<{ user: Omit<User, 'password'>; token: string }>
    >({
      url: '/auth/register',
      method: 'POST',
      data: payload,
    })
    if (!response?.success) throw new Error(response?.message)
    message.success(response.message)
    return response.data
  },
  login: async (
    payload: Pick<User, 'email' | 'password'>,
  ): Promise<{ user: Omit<User, 'password'>; token: string }> => {
    const response = await apiCall<
      Pick<User, 'email' | 'password'>,
      ApiReponse<{ user: Omit<User, 'password'>; token: string }>
    >({
      url: '/auth/login',
      method: 'POST',
      data: payload,
    })
    if (!response?.success) throw new Error(response?.message)
    message.success(response.message)
    return response.data
  },
  getMe: async (): Promise<Omit<User, 'password'>> => {
    const response = await apiCall<
      {},
      ApiReponse<{ user: Omit<User, 'password'> }>
    >({
      url: '/auth/me',
      method: 'GET',
    })
    if (!response?.success) throw new Error(response?.message)
    return response.data.user
  },
  updateMe: async (
    payload: Partial<User>,
  ): Promise<{ user: Omit<User, 'password'> }> => {
    const response = await apiCall<
      Partial<User>,
      ApiReponse<{ user: Omit<User, 'password'> }>
    >({
      url: '/auth/me',
      method: 'PATCH',
      data: payload,
    })
    if (!response?.success) throw new Error(response?.message)
    message.success(response.message)
    return response.data
  },
  changePassword: async (payload: {
    currentPassword: string
    newPassword: string
  }): Promise<{ user: Omit<User, 'password'> }> => {
    const response = await apiCall<
      { currentPassword: string; newPassword: string },
      ApiReponse<{ user: Omit<User, 'password'> }>
    >({
      url: '/auth/change-password',
      method: 'POST',
      data: payload,
    })
    if (!response?.success) throw new Error(response?.message)
    message.success(response.message)
    return response.data
  },
}

export default AuthService
