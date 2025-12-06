import { Login } from '@/pages'
import { getAuthToken } from '@/utils'
import { createFileRoute, redirect } from '@tanstack/react-router'

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
