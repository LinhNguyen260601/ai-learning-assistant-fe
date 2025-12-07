import { useAuthStore } from '@/stores'
import axios, { AxiosError } from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
})

const createHeaderToken = () => {
  const token = useAuthStore.getState().token
  return token ? `Bearer ${token}` : ''
}

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = createHeaderToken()
  config.headers.Accept = 'application/json'
  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    return Promise.reject(error)
  },
)

export default axiosInstance
