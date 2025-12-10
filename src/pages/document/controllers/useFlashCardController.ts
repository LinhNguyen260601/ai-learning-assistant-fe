import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { useCallback, useMemo, useState } from 'react'
import type { FlashcardCard, FlashcardSetsResponse } from '@/types'
import { QUERY_KEY } from '@/constants'
import { useToggle } from '@/hooks'
import { aiService, flashcardsService } from '@/services'

const useFlashCardController = () => {
  const { value: isFlipped, toggle, close } = useToggle(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null)

  const { id: documentId } = useParams({
    from: '/_authenticated/documents/$id',
  })
  const queryClient = useQueryClient()

  const {
    data: flashcardSetsResponse,
    isLoading,
    isRefetching,
  } = useQuery({
    queryKey: [QUERY_KEY.FLASHCARD_SETS],
    queryFn: flashcardsService.getFlashcardSets,
    refetchOnMount: (query) => !query.state.data,
  })

  const { mutate: toggleStarFlashcardMutation } = useMutation({
    mutationFn: flashcardsService.toggleStarFlashcard,
    onMutate: async (cardId: string) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.FLASHCARD_SETS],
      })

      // Snapshot the previous value
      const previousData = queryClient.getQueryData<FlashcardSetsResponse>([
        QUERY_KEY.FLASHCARD_SETS,
      ])

      // Optimistically update the cache
      if (previousData) {
        queryClient.setQueryData<FlashcardSetsResponse>(
          [QUERY_KEY.FLASHCARD_SETS],
          {
            ...previousData,
            flashcardSets: previousData.flashcardSets.map((set) => ({
              ...set,
              cards: set.cards.map((card) =>
                card._id === cardId
                  ? { ...card, isStarred: !card.isStarred }
                  : card,
              ),
            })),
          },
        )
      }

      // Return context with the previous data for rollback
      return { previousData }
    },
    onError: (_err, _cardId, context) => {
      // Rollback to previous data on error
      if (context?.previousData) {
        queryClient.setQueryData(
          [QUERY_KEY.FLASHCARD_SETS],
          context.previousData,
        )
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FLASHCARD_SETS],
      })
    },
  })

  const {
    mutate: generateFlashcardsMutation,
    isPending: isGeneratingFlashcards,
  } = useMutation({
    mutationFn: aiService.generateFlashcards,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.FLASHCARD_SETS],
      })
    },
  })

  const flashcardSets = flashcardSetsResponse?.flashcardSets || []
  const count = flashcardSetsResponse?.count || 0

  const selectedSet = useMemo(() => {
    if (!selectedSetId) return null
    return flashcardSets.find((set) => set._id === selectedSetId) || null
  }, [flashcardSets, selectedSetId])

  const currentCard: FlashcardCard | undefined =
    selectedSet?.cards[currentIndex]
  const totalCards = selectedSet?.cards.length || 0

  const handleFlip = useCallback(() => {
    toggle()
    if (!isFlipped && currentCard?._id) {
      flashcardsService.reviewFlashcard(currentCard._id)
    }
  }, [isFlipped, currentCard?._id, toggle])

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      close()
    }
  }

  const handleNext = () => {
    if (selectedSet && currentIndex < selectedSet.cards.length - 1) {
      setCurrentIndex(currentIndex + 1)
      close()
    }
  }

  const handleToggleStar = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation()
      if (!currentCard?._id) return
      toggleStarFlashcardMutation(currentCard._id)
    },
    [currentCard?._id, toggleStarFlashcardMutation],
  )

  const handleBackToSets = () => {
    setSelectedSetId(null)
    setCurrentIndex(0)
    close()
  }

  const handleCardClick = (setId: string) => () => {
    setSelectedSetId(setId)
    setCurrentIndex(0)
    close()
  }

  const handleGenerateFlashcards = useCallback(() => {
    generateFlashcardsMutation({ documentId })
  }, [generateFlashcardsMutation, documentId])

  const isLoadingData = isLoading || isRefetching

  return {
    isFlipped,
    selectedSetId,
    currentIndex,
    currentCard,
    totalCards,
    handleFlip,
    handlePrevious,
    handleNext,
    handleToggleStar,
    handleBackToSets,
    handleCardClick,
    isLoadingData,
    flashcardSets,
    count,
    selectedSet,
    handleGenerateFlashcards,
    isGeneratingFlashcards,
  }
}

export default useFlashCardController
