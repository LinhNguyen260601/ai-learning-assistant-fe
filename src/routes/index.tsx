import { createFileRoute, redirect } from '@tanstack/react-router'
import { getAuthToken } from '@/utils'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const token = getAuthToken()
    if (!token) {
      throw redirect({ to: '/login', replace: true })
    }

    throw redirect({
      to: '/dashboard',
    })
  },
  component: () => null,
})
