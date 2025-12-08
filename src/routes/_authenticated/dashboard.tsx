import { createFileRoute } from '@tanstack/react-router'
import { QUERY_KEY } from '@/constants'
import { Dashboard } from '@/pages'
import { DashboardSkeleton } from '@/pages/dashboard/components'
import { dashboardService } from '@/services'

export const Route = createFileRoute('/_authenticated/dashboard')({
  component: Dashboard,
  loader: ({ context }) =>
    context.queryClient.ensureQueryData({
      queryKey: [QUERY_KEY.DASHBOARD],
      queryFn: () => dashboardService.getDashboard(),
    }),
  pendingComponent: DashboardSkeleton,
})
