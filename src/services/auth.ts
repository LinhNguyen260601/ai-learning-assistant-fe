import type { ApiReponse, User } from '@/types'
import { apiCall } from '@/utils'
import { message } from 'antd'

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
    message.success(response?.message)
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
    message.success(response?.message)
    return response.data
  },
}

export default AuthService
