import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { QUERY_KEY } from '@/constants'
import { useToggle } from '@/hooks'
import { documentsService } from '@/services'

const useDocumentCardController = (documentId: string) => {
  const { value: isDeleteModalOpen, open, close } = useToggle(false)
  const queryClient = useQueryClient()

  const { mutate: deleteDocumentMutation, isPending: isDeleting } = useMutation(
    {
      mutationFn: documentsService.deleteDocument,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DOCUMENTS] })
      },
    },
  )

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    open()
  }

  const handleDeleteConfirm = useCallback(() => {
    deleteDocumentMutation(documentId)
  }, [deleteDocumentMutation, documentId])

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

export default useDocumentCardController
