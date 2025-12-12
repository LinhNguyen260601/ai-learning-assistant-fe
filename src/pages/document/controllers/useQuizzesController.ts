import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useForm } from 'antd/es/form/Form'
import { useCallback } from 'react'
import type { QuizByDocumentIdResponse } from '@/types'
import { aiService, quizService } from '@/services'
import { useToggle } from '@/hooks'
import { QUERY_KEY } from '@/constants'

const useQuizzesController = () => {
  const {
    value: isGenerateQuizModalOpen,
    open: openGenerateQuizModal,
    close: closeGenerateQuizModal,
  } = useToggle(false)
  const [form] = useForm()
  const queryClient = useQueryClient()

  const { id: documentId } = useParams({
    from: '/_authenticated/documents/$id',
  })

  const { data: quizzes = [], isLoading } = useQuery<
    Array<QuizByDocumentIdResponse>
  >({
    queryKey: [QUERY_KEY.QUIZZES, documentId],
    queryFn: () => quizService.getQuizzesByDocumentId(documentId),
    enabled: !!documentId,
  })

  const { mutate: generateQuizMutation, isPending: isGeneratingQuiz } =
    useMutation({
      mutationFn: aiService.generateQuiz,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.QUIZZES, documentId],
        })
        closeGenerateQuizModal()
        form.resetFields()
      },
    })

  const handleCloseGenerateQuizModal = () => {
    closeGenerateQuizModal()
    form.resetFields()
  }

  const handleGenerateQuiz = useCallback(async () => {
    const values = await form.validateFields()
    generateQuizMutation({
      documentId,
      numQuestions: values.numQuestions || 5,
      title: values.title,
    })
  }, [form.validateFields, generateQuizMutation, documentId])

  return {
    form,
    quizzes,
    isLoading,
    isGeneratingQuiz,
    isGenerateQuizModalOpen,
    handleGenerateQuiz,
    openGenerateQuizModal,
    handleCloseGenerateQuizModal,
  }
}

export default useQuizzesController
