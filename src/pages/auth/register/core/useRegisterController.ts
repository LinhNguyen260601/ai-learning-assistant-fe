import { useAuthStore } from '@/stores'
import type { User } from '@/types'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Form } from 'antd'
import { useCallback } from 'react'

export const useRegisterController = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const { mutate: registerMutation, isPending } = useMutation({
    mutationFn: useAuthStore.getState().register,
    onSuccess: () => {
      const token = useAuthStore.getState().token
      if (token) navigate({ to: '/dashboard', replace: true })
    },
  })

  const onFinish = useCallback(
    async (values: Pick<User, 'username' | 'email' | 'password'>) => {
      registerMutation(values)
    },
    [registerMutation],
  )

  return {
    form,
    onFinish,
    isPending,
  }
}
