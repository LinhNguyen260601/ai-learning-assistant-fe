import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FlashcardCard, FlashcardSetsResponse } from '@/types'
import { QUERY_KEY } from '@/constants'
import { useToggle } from '@/hooks'
import { aiService, flashcardsService } from '@/services'

const useFlashCardController = () => {
  const { value: isFlipped, toggle, close } = useToggle(false)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedSetId, setSelectedSetId] = useState<string | null>(null)

  const isManualNavigationRef = useRef(false)
  const previousFlashcardSetIdRef = useRef<string | undefined>(undefined)

  const { id: documentId } = useParams({
    from: '/_authenticated/documents/$id',
  })
  const navigate = useNavigate()
  const search = useSearch({ from: '/_authenticated/documents/$id' })
  const flashcardSetIdFromSearch = (search as { flashcardSetId?: string })
    .flashcardSetId
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

  // Filter flashcard sets by documentId
  const documentFlashcardSets = useMemo(
    () => flashcardSets.filter((set) => set.documentId === documentId),
    [flashcardSets, documentId],
  )
  const count = documentFlashcardSets.length

  // Auto-select flashcard set from search params
  useEffect(() => {
    // Skip auto-selection if user manually navigated back to sets
    if (isManualNavigationRef.current) {
      isManualNavigationRef.current = false
      previousFlashcardSetIdRef.current = flashcardSetIdFromSearch
      return
    }

    const previousFlashcardSetId = previousFlashcardSetIdRef.current
    previousFlashcardSetIdRef.current = flashcardSetIdFromSearch

    // Only auto-select if:
    // 1. flashcardSetIdFromSearch exists in URL
    // 2. selectedSetId is null OR different from flashcardSetIdFromSearch
    if (
      flashcardSetIdFromSearch &&
      selectedSetId !== flashcardSetIdFromSearch
    ) {
      const setExists = documentFlashcardSets.some(
        (set) => set._id === flashcardSetIdFromSearch,
      )
      if (setExists) {
        setSelectedSetId(flashcardSetIdFromSearch)
        setCurrentIndex(0)
        close()
      }
    }

    if (!flashcardSetIdFromSearch && previousFlashcardSetId && selectedSetId) {
      // Only clear selection if flashcardSetId was removed from URL
      // (i.e., URL changed from having flashcardSetId to not having it)
      setSelectedSetId(null)
      setCurrentIndex(0)
      close()
    }
  }, [flashcardSetIdFromSearch, selectedSetId, documentFlashcardSets, close])

  const selectedSet = useMemo(() => {
    if (!selectedSetId) return null
    return (
      documentFlashcardSets.find((set) => set._id === selectedSetId) || null
    )
  }, [documentFlashcardSets, selectedSetId])

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
    // Mark as manual navigation to prevent useEffect from auto-selecting
    isManualNavigationRef.current = true
    setSelectedSetId(null)
    setCurrentIndex(0)
    close()
    // Remove flashcardSetId from URL
    navigate({
      to: '/documents/$id',
      params: { id: documentId },
      search: { tab: 'flashcards' },
      replace: true,
    })
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
    flashcardSets: documentFlashcardSets,
    count,
    selectedSet,
    handleGenerateFlashcards,
    isGeneratingFlashcards,
  }
}

export default useFlashCardController
