import { Card, Modal, Tag, Typography } from 'antd'
import { BookOpen, Clock, FileText, Lightbulb, Trash2 } from 'lucide-react'
import type { Document } from '@/types'
import { useDocumentCardController } from '@/pages/document/controllers'
import { formatFileSize, formatRelativeTime } from '@/utils/format'

const { Title, Text } = Typography

interface DocumentCardProps {
  document: Document
}

const DocumentCard = ({ document }: DocumentCardProps) => {
  const {
    isDeleting,
    isDeleteModalOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useDocumentCardController(document._id)

  return (
    <>
      <Card className="shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group">
        <button
          type="button"
          onClick={handleDeleteClick}
          className="cursor-pointer absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full text-red-500 hover:text-red-600 z-10"
          aria-label="Delete document"
        >
          <Trash2 size={18} />
        </button>

        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-lg bg-linear-to-br from-blue-400 to-blue-500 flex items-center justify-center shrink-0">
            <FileText size={32} className="text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <Title
              level={4}
              className="mb-2! text-lg! font-bold! text-gray-900!"
            >
              {document.title}
            </Title>
            <Text className="text-sm text-gray-500 block mb-3">
              {formatFileSize(document.fileSize)}
            </Text>

            <div className="flex flex-wrap gap-2 mb-3">
              <Tag
                color="purple"
                icon={<BookOpen size={14} />}
                className="flex! items-center gap-1"
              >
                {document.flashcardCount || 0} Flashcards
              </Tag>
              <Tag
                color="green"
                icon={<Lightbulb size={14} />}
                className="flex! items-center gap-1"
              >
                {document.quizCount || 0} Quizzes
              </Tag>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock size={14} />
              <Text className="text-xs text-gray-500">
                Uploaded {formatRelativeTime(new Date(document.uploadDate))}
              </Text>
            </div>
          </div>
        </div>
      </Card>

      <Modal
        centered
        title="Delete Document"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmLoading={isDeleting}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete <strong>{document.title}</strong>?
          This action cannot be undone.
        </p>
      </Modal>
    </>
  )
}

export default DocumentCard
