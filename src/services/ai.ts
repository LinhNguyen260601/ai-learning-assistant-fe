import { message } from 'antd'
import type {
  ChatResponse,
  ExplainConceptResponse,
  SummaryResponse,
} from '@/pages/document/core/types'
import type { ChatHistoryResponse } from '@/pages/document/core'
import type { ApiReponse } from '@/types'
import { apiCall } from '@/utils'

const AIService = {
  getChatHistory: async (
    documentId: string,
  ): Promise<Array<ChatHistoryResponse>> => {
    const response = await apiCall<
      string,
      ApiReponse<Array<ChatHistoryResponse>>
    >({
      url: `/ai/chat-history/${documentId}`,
      method: 'GET',
    })
    if (!response?.success) throw new Error(response?.message)
    return response.data
  },

  sendMessage: async (payload: {
    documentId: string
    question: string
  }): Promise<ChatResponse> => {
    const response = await apiCall<
      { documentId: string; question: string },
      ApiReponse<ChatResponse>
    >({
      url: '/ai/chat',
      method: 'POST',
      data: payload,
    })
    if (!response?.success) throw new Error(response?.message)
    return response.data
  },

  generateSummary: async (payload: {
    documentId: string
  }): Promise<SummaryResponse> => {
    const response = await apiCall<
      { documentId: string },
      ApiReponse<SummaryResponse>
    >({
      url: '/ai/generate-summary',
      method: 'POST',
      data: payload,
    })
    if (!response?.success) throw new Error(response?.message)
    message.success(response.message)
    return response.data
  },

  explainConcept: async (payload: {
    documentId: string
    concept: string
  }): Promise<ExplainConceptResponse> => {
    const response = await apiCall<
      { documentId: string; concept: string },
      ApiReponse<ExplainConceptResponse>
    >({
      url: '/ai/explain-concept',
      method: 'POST',
      data: payload,
    })
    if (!response?.success) throw new Error(response?.message)
    message.success(response.message)
    return response.data
  },
}

export default AIService
