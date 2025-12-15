import { createLazyFileRoute } from '@tanstack/react-router'
import { Dashboard } from '@/pages'
import { DashboardSkeleton } from '@/pages/dashboard/components'

export const Route = createLazyFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
  pendingComponent: DashboardSkeleton,
})
