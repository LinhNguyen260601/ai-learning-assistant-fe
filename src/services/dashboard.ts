import type { DashboardResponse } from '@/pages/dashboard/core'
import type { ApiReponse } from '@/types'
import { apiCall } from '@/utils'

const DashboardService = {
  getDashboard: async (): Promise<DashboardResponse> => {
    const response = await apiCall<undefined, ApiReponse<DashboardResponse>>({
      url: '/progress/dashboard',
      method: 'GET',
    })
    if (!response?.success) throw new Error(response?.message)
    return response.data
  },
}

export default DashboardService
