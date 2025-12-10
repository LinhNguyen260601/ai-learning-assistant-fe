export type Difficulty = 'easy' | 'medium' | 'hard'

export interface FlashcardCard {
  _id: string
  question: string
  answer: string
  difficulty: Difficulty
  lastReviewed?: string | null
  reviewCount: number
  isStarred: boolean
}

export interface FlashcardSet {
  _id: string
  userId: string
  documentId: string
  cards: Array<FlashcardCard>
  createdAt: string
  updatedAt: string
}

export interface FlashcardSetsResponse {
  flashcardSets: Array<FlashcardSet>
  count: number
}
