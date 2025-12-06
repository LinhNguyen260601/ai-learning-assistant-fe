import { useAuthStore } from '@/stores'
import type { User } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Form } from 'antd'
import { useCallback } from 'react'

export const useLoginController = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: useAuthStore.getState().login,
    onSuccess: () => {
      const token = useAuthStore.getState().token
      if (token) navigate({ to: '/dashboard', replace: true })
    },
  })

  const onFinish = useCallback(
    async (values: Pick<User, 'email' | 'password'>) => {
      loginMutation(values)
    },
    [loginMutation],
  )

  return {
    form,
    onFinish,
    isPending,
  }
}
