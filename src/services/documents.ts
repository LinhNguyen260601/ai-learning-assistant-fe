import type { DocumentsResponse } from '@/pages/document/core'
import type { ApiReponse, Document } from '@/types'
import { apiCall } from '@/utils'
import { message } from 'antd'

const DocumentsService = {
  getDocuments: async (): Promise<DocumentsResponse> => {
    const response = await apiCall<undefined, ApiReponse<DocumentsResponse>>({
      url: '/documents',
      method: 'GET',
    })
    if (!response?.success) throw new Error(response?.message)
    return response.data
  },
  getDocument: async (documentId: string): Promise<Document> => {
    const response = await apiCall<undefined, ApiReponse<Document>>({
      url: `/documents/${documentId}`,
      method: 'GET',
    })
    if (!response?.success) throw new Error(response?.message)
    return response.data
  },
  deleteDocument: async (documentId: string): Promise<void> => {
    const response = await apiCall<undefined, ApiReponse<void>>({
      url: `/documents/${documentId}`,
      method: 'DELETE',
    })
    if (!response?.success) throw new Error(response?.message)
    message.success(response?.message)
  },
  uploadDocument: async (payload: {
    title: string
    file: File
  }): Promise<void> => {
    const { title, file } = payload
    const formData = new FormData()
    formData.append('title', title)
    formData.append('file', file)

    const response = await apiCall<FormData, ApiReponse<void>>({
      url: '/documents/upload',
      method: 'POST',
      data: formData,
      config: {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    })
    if (!response?.success) throw new Error(response?.message)
  },
}

export default DocumentsService
