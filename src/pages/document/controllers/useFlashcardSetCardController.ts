import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { QUERY_KEY } from '@/constants'
import { useToggle } from '@/hooks'
import { flashcardsService } from '@/services'

const useFlashcardSetCardController = (flashcardSetId: string) => {
  const { value: isDeleteModalOpen, open, close } = useToggle(false)
  const queryClient = useQueryClient()

  const { mutate: deleteFlashcardSetMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: flashcardsService.deleteFlashcardSet,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.FLASHCARD_SETS],
        })
      },
    })

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    open()
  }

  const handleDeleteConfirm = useCallback(() => {
    deleteFlashcardSetMutation(flashcardSetId)
    close()
  }, [deleteFlashcardSetMutation, flashcardSetId, close])

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

export default useFlashcardSetCardController
