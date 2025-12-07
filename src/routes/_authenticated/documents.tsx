import { QUERY_KEY } from '@/constants'
import { Document } from '@/pages'
import { DocumentCardSkeleton } from '@/pages/document/components'
import { documentsService } from '@/services'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/documents')({
  component: Document,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: [QUERY_KEY.DOCUMENTS],
      queryFn: () => documentsService.getDocuments(),
    }),
  pendingComponent: DocumentCardSkeleton,
})
