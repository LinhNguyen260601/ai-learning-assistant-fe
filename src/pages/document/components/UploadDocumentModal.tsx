import { useUploadDocumentModalController } from '@/pages/document/controllers'
import {
  DOCUMENT_FILE_RULES,
  DOCUMENT_TITLE_RULES,
  draggerStyle,
  uploadIconStyle,
} from '@/pages/document/core'
import { useSearch } from '@tanstack/react-router'
import { Button, Form, Input, Modal, Typography, Upload } from 'antd'
import { Upload as UploadIcon } from 'lucide-react'

const { Text } = Typography
const { Dragger } = Upload

interface UploadDocumentModalProps {
  open: boolean
  onCancel: () => void
}

const UploadDocumentModal = ({ open, onCancel }: UploadDocumentModalProps) => {
  const search = useSearch({ from: '/_authenticated/documents' }) as {
    documentId?: string
  }
  const documentId = search.documentId || ''

  const {
    form,
    uploadProps,
    isUploading,
    isPendingDocument,
    handleSubmit,
    handleCancel,
  } = useUploadDocumentModalController(onCancel, documentId)

  const getValueFromEvent = (event: any) => {
    if (Array.isArray(event)) return event
    return event?.fileList
  }

  return (
    <Modal
      centered
      title="Upload New Document"
      open={open}
      onCancel={handleCancel}
      loading={documentId ? isPendingDocument : false}
      footer={[
        <Button key="cancel" onClick={handleCancel} disabled={isUploading}>
          Cancel
        </Button>,
        <Button
          key="upload"
          type="primary"
          onClick={handleSubmit}
          loading={isUploading}
          disabled={isUploading}
        >
          Upload
        </Button>,
      ]}
      width={600}
    >
      <Text className="block text-gray-600 mb-6">
        Add a PDF document to your library
      </Text>

      <Form form={form} layout="vertical">
        <Form.Item
          label="DOCUMENT TITLE"
          name="title"
          rules={DOCUMENT_TITLE_RULES}
        >
          <Input
            placeholder="e.g., React Interview Prep"
            size="large"
            disabled={isUploading}
          />
        </Form.Item>

        <Form.Item
          label="PDF FILE"
          name="file"
          rules={DOCUMENT_FILE_RULES}
          valuePropName="fileList"
          getValueFromEvent={getValueFromEvent}
        >
          <Dragger
            {...uploadProps}
            className="border-dashed!"
            style={draggerStyle}
            disabled={isUploading}
          >
            <div className="py-8">
              <UploadIcon
                size={48}
                className="mx-auto mb-4 text-primary"
                style={uploadIconStyle}
              />
              <Text className="block text-center text-base mb-2">
                Click to upload or drag and drop
              </Text>
              <Text className="block text-center text-sm text-gray-500">
                PDF up to 10MB
              </Text>
            </div>
          </Dragger>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default UploadDocumentModal
