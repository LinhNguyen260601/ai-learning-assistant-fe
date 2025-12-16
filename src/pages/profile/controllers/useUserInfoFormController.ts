import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Form } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { User as UserType } from '@/types'
import type { UploadChangeParam, UploadFile } from 'antd/es/upload'
import { QUERY_KEY } from '@/constants'
import { authService } from '@/services'
import { useAuthStore } from '@/stores'

const useUserInfoFormController = () => {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)

  const avatarPreview = useMemo(
    () =>
      profileImageFile ? URL.createObjectURL(profileImageFile) : undefined,
    [profileImageFile],
  )

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
        username: user.username,
        email: user.email,
        profileImageFile: !user.profileImage
          ? []
          : [
              {
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: user.profileImage,
              },
            ],
      })
  }, [isSuccess, form, user])

  const { mutate: updateMeMutation, isPending: isUpdatingMe } = useMutation({
    mutationFn: authService.updateMe,
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.ME] })
      useAuthStore.getState().setUser(updatedUser)
    },
  })

  const onFinish = useCallback(
    (values: Pick<UserType, 'username' | 'email'>) => {
      const { username, email } = values

      updateMeMutation({
        username,
        email,
        profileImageFile,
      } as any)
    },
    [updateMeMutation, profileImageFile],
  )

  const handleAvatarFileChange = (file: File | null) => {
    setProfileImageFile(file)
  }

  const normalizeFile = useCallback((event: any) => {
    if (Array.isArray(event)) return event
    return event?.fileList
  }, [])

  const handleBeforeUpload = () => false

  const handleAvatarChange = useCallback(
    (info: UploadChangeParam<UploadFile>) => {
      const file = info.fileList[0]?.originFileObj as File | undefined
      handleAvatarFileChange(file ?? null)
    },
    [handleAvatarFileChange],
  )

  return {
    form,
    user,
    isLoading,
    isUpdatingMe,
    avatarPreview,
    onFinish,
    normalizeFile,
    handleAvatarChange,
    handleBeforeUpload,
  }
}

export default useUserInfoFormController
