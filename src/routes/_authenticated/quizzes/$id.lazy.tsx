import {
  Outlet,
  createLazyFileRoute,
  useLocation,
} from '@tanstack/react-router'
import { QuizTaking, QuizTakingSkeleton } from '@/pages/quizzes'

export const Route = createLazyFileRoute('/_authenticated/quizzes/$id')({
  component: () => {
    const pathname = useLocation().pathname
    if (pathname === '/quizzes/$id') return <QuizTaking />
    return <Outlet />
  },
  pendingComponent: QuizTakingSkeleton,
})
