import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import type { QuizByDocumentIdResponse } from '@/types'
import { QUERY_KEY } from '@/constants'
import { useToggle } from '@/hooks'
import { quizService } from '@/services'

const useQuizController = (quiz: QuizByDocumentIdResponse) => {
  const { value: isDeleteModalOpen, open, close } = useToggle(false)
  const queryClient = useQueryClient()

  const { mutate: deleteQuizMutation, isPending: isDeleting } = useMutation({
    mutationFn: quizService.deleteQuiz,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.QUIZZES, quiz.documentId],
      })
    },
  })

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    open()
  }

  const handleDeleteConfirm = useCallback(() => {
    deleteQuizMutation(quiz._id)
    close()
  }, [deleteQuizMutation, quiz._id, close])

  const handleDeleteCancel = () => {
    close()
  }

  return {
    isDeleting,
    isDeleteModalOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  }
}

export default useQuizController
