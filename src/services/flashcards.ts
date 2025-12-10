import { message } from 'antd'
import type { ApiReponse, FlashcardSetsResponse } from '@/types'
import { apiCall } from '@/utils'

const FlashcardsService = {
  getFlashcardSets: async (): Promise<FlashcardSetsResponse> => {
    const response = await apiCall<
      undefined,
      ApiReponse<FlashcardSetsResponse>
    >({
      url: '/flashcards',
      method: 'GET',
    })
    if (!response?.success) throw new Error(response?.message)
    return response.data
  },

  deleteFlashcardSet: async (flashcardSetId: string): Promise<void> => {
    const response = await apiCall<undefined, ApiReponse<void>>({
      url: `/flashcards/${flashcardSetId}`,
      method: 'DELETE',
    })
    if (!response?.success) throw new Error(response?.message)
    message.success(response.message)
  },

  reviewFlashcard: async (cardId: string): Promise<void> => {
    const response = await apiCall<undefined, ApiReponse<void>>({
      url: `/flashcards/${cardId}/review`,
      method: 'POST',
    })
    if (!response?.success) throw new Error(response?.message)
  },

  toggleStarFlashcard: async (cardId: string): Promise<void> => {
    const response = await apiCall<undefined, ApiReponse<void>>({
      url: `/flashcards/${cardId}/star`,
      method: 'PUT',
    })
    if (!response?.success) throw new Error(response?.message)
  },
}

export default FlashcardsService
