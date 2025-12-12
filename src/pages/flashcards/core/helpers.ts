import type { FlashcardCard } from '@/types'

export const getReviewCountAndPercentage = (
  cardCount: number,
  cards: Array<FlashcardCard>,
) => {
  const reviewed = cards.filter((card) => card.lastReviewed).length

  const percentage =
    cardCount > 0 ? Math.round((reviewed / cardCount) * 100) : 0

  return {
    reviewedCount: reviewed,
    progressPercentage: percentage,
  }
}
