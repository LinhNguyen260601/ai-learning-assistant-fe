import { Card, Modal, Tag, Typography } from 'antd'
import { Brain, Trash2 } from 'lucide-react'
import { useMemo } from 'react'
import type { FlashcardSet } from '@/types'
import { useFlashcardSetCardController } from '@/pages/document/controllers'
import { formatDate } from '@/utils/format'

interface FlashcardSetCardProps {
  flashcardSet: FlashcardSet
  onCardClick: (setId: string) => () => void
}

const FlashcardSetCard = ({
  flashcardSet,
  onCardClick,
}: FlashcardSetCardProps) => {
  const {
    isDeleting,
    isDeleteModalOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useFlashcardSetCardController(flashcardSet._id)

  const cardCount = flashcardSet.cards.length

  const createdDate = useMemo(
    () =>
      formatDate(new Date(flashcardSet.createdAt), 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).toUpperCase(),
    [flashcardSet.createdAt],
  )

  return (
    <>
      <Card
        className="shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group"
        onClick={onCardClick(flashcardSet._id)}
      >
        <button
          type="button"
          onClick={handleDeleteClick}
          className="cursor-pointer absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full text-red-500 hover:text-red-600 z-10"
          aria-label="Delete flashcard set"
        >
          <Trash2 size={18} />
        </button>

        <div className="flex gap-4">
          <div className="w-16 h-16 rounded-lg bg-(--ant-color-primary) flex items-center justify-center shrink-0">
            <Brain size={32} className="text-white" />
          </div>

          <article className="flex-1 min-w-0">
            <Typography.Title
              level={4}
              className="mb-2! text-lg! font-bold! text-gray-900!"
            >
              Flashcard Set
            </Typography.Title>
            <Typography.Text className="text-sm text-gray-500 block mb-3">
              CREATED {createdDate}
            </Typography.Text>

            <div className="flex flex-wrap gap-2">
              <Tag
                color="blue"
                className="flex! items-center gap-1 bg-(--ant-color-primary) text-white border-none"
              >
                {cardCount} {cardCount === 1 ? 'card' : 'cards'}
              </Tag>
            </div>
          </article>
        </div>
      </Card>

      <Modal
        centered
        title="Delete Flashcard Set"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmLoading={isDeleting}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete this flashcard set? This action cannot
          be undone.
        </p>
      </Modal>
    </>
  )
}

export default FlashcardSetCard
