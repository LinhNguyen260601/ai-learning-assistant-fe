import { QUERY_KEY } from '@/constants'
import { useToggle } from '@/hooks'
import { documentsService } from '@/services'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import React, { useCallback } from 'react'

const useDocumentCardController = (documentId: string, onOpen: () => void) => {
  const { value: isDeleteModalOpen, open, close } = useToggle(false)
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate: deleteDocumentMutation, isPending: isDeleting } = useMutation(
    {
      mutationFn: documentsService.deleteDocument,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DOCUMENTS] })
      },
    },
  )

  const handleCardClick = () => {
    onOpen()
    navigate({ to: '/documents', search: { documentId } })
  }

  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    open()
  }

  const handleDeleteConfirm = useCallback(async () => {
    deleteDocumentMutation(documentId)
  }, [deleteDocumentMutation, documentId])

  const handleDeleteCancel = () => {
    close()
  }

  return {
    isDeleting,
    isDeleteModalOpen,
    handleCardClick,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  }
}

export default useDocumentCardController
