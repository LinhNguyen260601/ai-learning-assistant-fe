import type { Document, Quiz } from '@/types'

export interface DashboardResponse {
  overview: {
    totalDocuments: number
    totalFlashcardSets: number
    totalFlashcards: number
    reviewedFlashcards: number
    starredFlashcards: number
    totalQuizzes: number
    completedQuizzes: number
    averageScore: number
    studyStreak: number
  }
  recentActivity: {
    documents: Document[]
    quizzes: Quiz[]
  }
}
