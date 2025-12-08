import {
  Outlet,
  createLazyFileRoute,
  useLocation,
} from '@tanstack/react-router'
import { Document } from '@/pages'

export const Route = createLazyFileRoute('/_authenticated/documents')({
  component: () => {
    const { pathname } = useLocation()
    if (pathname === '/documents') return <Document />
    return <Outlet />
  },
})
