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
    payload: Partial<User> & { profileImageFile?: File | null },
  ): Promise<Omit<User, 'password'>> => {
    const { profileImageFile, ...rest } = payload

    const formData = new FormData()

    Object.entries(rest).forEach(([key, value]) => {
      formData.append(key, String(value))
    })

    if (profileImageFile) {
      formData.append('profileImage', profileImageFile)
    }

    const response = await apiCall<
      FormData,
      ApiReponse<{ user: Omit<User, 'password'> }>
    >({
      url: '/auth/me',
      method: 'PATCH',
      data: formData,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    })
    if (!response?.success) throw new Error(response?.message)
    message.success(response.message)
    return response.data.user
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
