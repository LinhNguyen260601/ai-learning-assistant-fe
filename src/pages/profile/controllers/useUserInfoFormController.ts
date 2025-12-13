import { QUERY_KEY } from '@/constants'
import { authService } from '@/services'
import type { User as UserType } from '@/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Form } from 'antd'
import { useCallback, useEffect } from 'react'

const useUserInfoFormController = () => {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const {
    data: user,
    isSuccess,
    isLoading,
  } = useQuery<Omit<UserType, 'password'>>({
    queryKey: [QUERY_KEY.ME],
    queryFn: authService.getMe,
  })

  useEffect(() => {
    if (isSuccess)
      form.setFieldsValue({
        username: user?.username,
        email: user?.email,
      })
  }, [isSuccess, form, user])

  const { mutate: updateMeMutation, isPending: isUpdatingMe } = useMutation({
    mutationFn: authService.updateMe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
    },
  })

  const onFinish = useCallback(
    async (values: Pick<UserType, 'username' | 'email'>) => {
      updateMeMutation(values)
    },
    [updateMeMutation],
  )

  return {
    form,
    user,
    isLoading,
    isUpdatingMe,
    onFinish,
  }
}

export default useUserInfoFormController
