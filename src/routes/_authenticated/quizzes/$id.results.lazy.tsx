import { createLazyFileRoute } from '@tanstack/react-router'
import { QuizResults, QuizResultsSkeleton } from '@/pages/quizzes'

export const Route = createLazyFileRoute('/_authenticated/quizzes/$id/results')(
  {
    component: QuizResults,
    pendingComponent: QuizResultsSkeleton,
  },
)
