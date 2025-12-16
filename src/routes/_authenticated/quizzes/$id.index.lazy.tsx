import { createLazyFileRoute } from '@tanstack/react-router'
import { QuizTaking, QuizTakingSkeleton } from '@/pages/quizzes'

export const Route = createLazyFileRoute('/_authenticated/quizzes/$id/')({
  component: QuizTaking,
  pendingComponent: QuizTakingSkeleton,
})
