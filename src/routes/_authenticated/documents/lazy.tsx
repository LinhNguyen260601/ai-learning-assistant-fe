import {
  Outlet,
  createLazyFileRoute,
  useLocation,
} from '@tanstack/react-router'
import { Document } from '@/pages'
import { DocumentCardSkeleton } from '@/pages/document/components'

export const Route = createLazyFileRoute('/_authenticated/documents')({
  component: () => {
    const { pathname } = useLocation()
    if (pathname === '/documents') return <Document />
    return <Outlet />
  },
  pendingComponent: DocumentCardSkeleton,
})
