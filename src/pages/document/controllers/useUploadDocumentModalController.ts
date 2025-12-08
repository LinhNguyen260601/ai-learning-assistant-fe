import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Form, message } from 'antd'
import { useCallback, useEffect, useMemo } from 'react'
import type { UploadFile, UploadProps } from 'antd'
import type { Document } from '@/types'
import { documentsService } from '@/services'
import { QUERY_KEY } from '@/constants'

const useUploadDocumentModalController = (
  onCancel: () => void,
  documentId: string,
) => {
  const [form] = Form.useForm()
  const queryClient = useQueryClient()

  const {
    data: document,
    isSuccess,
    isPending: isPendingDocument,
  } = useQuery<Document>({
    queryKey: [QUERY_KEY.DOCUMENT, documentId],
    queryFn: () => documentsService.getDocument(documentId),
    enabled: !!documentId,
  })

  const { mutate: uploadDocumentMutation, isPending: isUploading } =
    useMutation({
      mutationFn: documentsService.uploadDocument,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DOCUMENTS] })
        message.success('Document uploaded successfully')
        handleCancel()
      },
    })

  useEffect(() => {
    if (isSuccess) {
      const fileList: Array<UploadFile> = [
        {
          uid: document._id,
          name: document.fileName,
          status: 'done',
          url: document.filePath,
        },
      ]

      form.setFieldsValue({
        title: document.title,
        file: fileList,
      })
    }
  }, [isSuccess, document])

  const handleSubmit = useCallback(async () => {
    const values = await form.validateFields()
    uploadDocumentMutation({
      title: values.title,
      file: values.file[0].originFileObj as File,
    })
  }, [form.validateFields, uploadDocumentMutation])

  const handleCancel = useCallback(() => {
    form.resetFields()
    onCancel()
  }, [form, onCancel])

  const uploadProps: UploadProps = useMemo(
    () => ({
      name: 'file',
      multiple: false,
      accept: 'application/pdf',
      maxCount: 1,
      beforeUpload: () => false,
      onChange: (info) => {
        const { fileList } = info
        form.setFieldsValue({ file: fileList })
        form.validateFields(['file'])
      },
      onRemove: () => {
        form.setFieldsValue({ file: [] })
        form.validateFields(['file'])
      },
    }),
    [form],
  )

  return {
    form,
    uploadProps,
    isUploading,
    isPendingDocument,
    handleSubmit,
    handleCancel,
  }
}

export default useUploadDocumentModalController
