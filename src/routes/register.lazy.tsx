import { createLazyFileRoute } from '@tanstack/react-router'
import { Register } from '@/pages'

export const Route = createLazyFileRoute('/register')({
  component: Register,
})
