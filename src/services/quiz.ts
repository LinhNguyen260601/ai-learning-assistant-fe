import { message } from 'antd'
import type { ApiReponse, QuizByDocumentIdResponse, QuizDetail } from '@/types'
import type {
  QuizResultsResponse,
  SubmitQuizResponse,
} from '@/pages/quizzes/core'
import { apiCall } from '@/utils'

const QuizService = {
  getQuizzesByDocumentId: async (
    documentId: string,
  ): Promise<Array<QuizByDocumentIdResponse>> => {
    const response = await apiCall<
      undefined,
      ApiReponse<{ quizzes: Array<QuizByDocumentIdResponse> }>
    >({
      url: `/quizzes/${documentId}`,
      method: 'GET',
    })
    if (!response?.success) throw new Error(response?.message)
    return response.data.quizzes
  },

  getQuiz: async (quizId: string): Promise<QuizDetail> => {
    const response = await apiCall<undefined, ApiReponse<QuizDetail>>({
      url: `/quizzes/quiz/${quizId}`,
      method: 'GET',
    })
    if (!response?.success) throw new Error(response?.message)
    return response.data
  },

  submitQuiz: async (
    quizId: string,
    answers: Array<{ questionIndex: number; selectedAnswer: string }>,
  ): Promise<SubmitQuizResponse> => {
    const response = await apiCall<
      { answers: Array<{ questionIndex: number; selectedAnswer: string }> },
      ApiReponse<SubmitQuizResponse>
    >({
      url: `/quizzes/${quizId}/submit`,
      method: 'POST',
      data: { answers },
    })
    if (!response?.success) throw new Error(response?.message)
    message.success('Quiz submitted successfully!')
    return response.data
  },

  getQuizResults: async (quizId: string): Promise<QuizResultsResponse> => {
    const response = await apiCall<undefined, ApiReponse<QuizResultsResponse>>({
      url: `/quizzes/${quizId}/results`,
      method: 'GET',
    })
    if (!response?.success) throw new Error(response?.message)
    return response.data
  },

  deleteQuiz: async (quizId: string): Promise<void> => {
    const response = await apiCall<undefined, ApiReponse<void>>({
      url: `/quizzes/${quizId}`,
      method: 'DELETE',
    })
    if (!response?.success) throw new Error(response?.message)
    message.success(response.message)
  },
}

export default QuizService
