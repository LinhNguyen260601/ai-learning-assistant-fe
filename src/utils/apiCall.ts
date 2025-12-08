import { message } from 'antd'
import { AxiosError } from 'axios'
import isArray from 'lodash/isArray'
import isString from 'lodash/isString'
import type { AxiosResponse } from 'axios'
import type { API } from '@/types'
import axiosInstance from '@/integrations/axios/axios-instance'

/**
 * Extracts a  error message from an AxiosError.
 *
 * @param error - The error object, typically an instance of AxiosError.
 * @returns A string message if available; otherwise, a generic error message.
 */
const getErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const responseError = error.response?.data?.message

    if (isArray(responseError)) return responseError[0]
    if (isString(responseError)) return responseError

    return error.message
  }
}

/**
 * Makes an API call using Axios with various HTTP methods.
 *
 * @template TRequest - The type of the request data (default is any).
 * @template TResponse - The type of the response data (default is any).
 * @param params - The parameters for the API call.
 * @param params.url - The endpoint URL.
 * @param params.data - The data to be sent with the request (for POST, PUT, PATCH).
 * @param params.method - The HTTP method to use (GET, POST, PUT, PATCH, DELETE).
 * @param params.config - Additional Axios request configuration.
 * @param params.isLoading - Flag to show/hide loading indicator.
 * @param params.isShowError - Flag to show/hide error messages.
 * @returns A promise that resolves to the response data or null if an error occurs.
 */
export const apiCall = async <TRequest = any, TResponse = any>({
  url,
  data,
  method,
  config,
  isShowError = true,
}: API<TRequest>): Promise<TResponse | null> => {
  const request = {
    GET: () => axiosInstance.get<TResponse>(url, config),
    POST: () =>
      axiosInstance.post<TRequest, AxiosResponse<TResponse>>(url, data, config),
    PUT: () =>
      axiosInstance.put<TRequest, AxiosResponse<TResponse>>(url, data, config),
    PATCH: () =>
      axiosInstance.patch<TRequest, AxiosResponse<TResponse>>(
        url,
        data,
        config,
      ),
    DELETE: () => axiosInstance.delete<TResponse>(url, { ...config, data }),
  }[method]

  try {
    const response = await request()
    return response.data
  } catch (error) {
    if (isShowError)
      message.open({
        type: 'error',
        content: getErrorMessage(error),
        duration: 4,
      })
    throw error
  }
}
