import { createLazyFileRoute } from '@tanstack/react-router'
import { DocumentDetails } from '@/pages'

export const Route = createLazyFileRoute('/_authenticated/documents/$id')({
  component: DocumentDetails,
})
