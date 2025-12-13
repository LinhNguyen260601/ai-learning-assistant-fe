import { authService } from '@/services'
import { useMutation } from '@tanstack/react-query'
import { Form } from 'antd'
import { useCallback } from 'react'

const useChangePasswordFormController = () => {
  const [form] = Form.useForm()

  const { mutate: changePasswordMutation, isPending: isChangingPassword } =
    useMutation({
      mutationFn: authService.changePassword,
      onSuccess: () => {
        form.resetFields()
      },
    })

  const onFinish = useCallback(
    async (values: { currentPassword: string; newPassword: string }) => {
      changePasswordMutation({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      })
    },
    [changePasswordMutation],
  )

  return {
    form,
    isChangingPassword,
    onFinish,
  }
}

export default useChangePasswordFormController
