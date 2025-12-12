import { createLazyFileRoute } from '@tanstack/react-router'
import Flashcards from '@/pages/flashcards'
import { FlashcardsLoading } from '@/pages/flashcards/components'

export const Route = createLazyFileRoute('/_authenticated/flashcards')({
  component: Flashcards,
  pendingComponent: FlashcardsLoading,
})
