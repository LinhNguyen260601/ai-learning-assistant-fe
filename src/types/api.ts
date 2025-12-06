import type { AxiosRequestConfig } from 'axios'

export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface API<T> {
  url: string
  data?: T | T[]
  method: RequestMethod
  config?: AxiosRequestConfig<any> | undefined
  isShowError?: boolean
}

export interface ApiReponse<T> {
  data: T
  success: boolean
  message: string
}
