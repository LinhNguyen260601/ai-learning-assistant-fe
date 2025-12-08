import { createFileRoute, redirect } from '@tanstack/react-router'
import { Login } from '@/pages'
import { getAuthToken } from '@/utils'

export const Route = createFileRoute('/login')({
  beforeLoad: () => {
    const token = getAuthToken()
    if (token) {
      throw redirect({
        to: '/dashboard',
        replace: true,
      })
    }
  },
  component: Login,
})
