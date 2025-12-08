import { createFileRoute, redirect } from '@tanstack/react-router'
import { MainLayout } from '@/layouts'
import { getAuthToken } from '@/utils'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ location }) => {
    const token = getAuthToken()
    if (!token) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: MainLayout,
})
