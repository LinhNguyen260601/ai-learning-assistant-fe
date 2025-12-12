import { Button, Card, Modal, Tag, Typography } from 'antd'
import { BarChart3, Medal, Play, Trash2 } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import type { QuizByDocumentIdResponse } from '@/types'
import useQuizController from '@/pages/document/controllers/useQuizController'
import { cn, formatDate } from '@/utils'

const { Title, Text } = Typography

interface QuizProps {
  quiz: QuizByDocumentIdResponse
}

const QuizComponent = ({ quiz }: QuizProps) => {
  const {
    isDeleting,
    isDeleteModalOpen,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteCancel,
  } = useQuizController(quiz)

  const isCompleted = !!quiz.completedAt

  const createdDate = useMemo(() => {
    if (!quiz.createdAt) return 'Unknown date'
    return formatDate(new Date(quiz.createdAt), 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).toUpperCase()
  }, [quiz.createdAt])

  return (
    <>
      <Card className="shadow-sm hover:shadow-md transition-shadow relative group">
        <button
          type="button"
          onClick={handleDeleteClick}
          className="cursor-pointer absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-full text-red-500 hover:text-red-600 z-10"
          aria-label="Delete quiz"
        >
          <Trash2 size={18} />
        </button>

        <div className="flex flex-col gap-4">
          {/* Score Tag */}
          <div className="flex items-start">
            <Tag
              color="blue"
              className="flex! items-center! gap-1.5! px-3! py-1.5! rounded-lg! bg-(--ant-color-primary)/10! border-none!"
            >
              <Medal size={16} className="text-(--ant-color-primary)" />
              <span className="font-semibold text-sm text-(--ant-color-primary)">
                Score: {quiz.score}
              </span>
            </Tag>
          </div>

          {/* Title and Date */}
          <article className="flex-1 min-w-0">
            <Title
              level={4}
              className="mb-2! text-lg! font-bold! text-gray-900!"
            >
              {quiz.title || 'Quiz'}
            </Title>
            <Text className="text-sm text-gray-500 block mb-4">
              CREATED {createdDate}
            </Text>
          </article>

          {/* Questions Count Tag */}
          <div className="mb-2">
            <Tag className="bg-gray-100! text-gray-700! border-none! rounded-lg! px-3! py-1!">
              {quiz.totalQuestions}{' '}
              {quiz.totalQuestions === 1 ? 'Question' : 'Questions'}
            </Tag>
          </div>

          {/* Action Button */}
          {isCompleted ? (
            <Link to="/quizzes/$id/results" params={{ id: quiz._id }}>
              <Button
                size="large"
                icon={<BarChart3 size={18} />}
                className="w-full! rounded-lg! bg-gray-100! text-gray-700! border-none! hover:bg-gray-200!"
              >
                View Results
              </Button>
            </Link>
          ) : (
            <Link to="/quizzes/$id" params={{ id: quiz._id }}>
              <Button
                type="primary"
                size="large"
                icon={<Play size={18} />}
                className={cn(
                  'w-full rounded-lg!',
                  'bg-linear-to-r! from-(--ant-color-primary)! to-(--ant-color-primary)/80!',
                  'border-none! text-white! font-semibold! hover:opacity-90! transition-opacity!',
                )}
              >
                Start Quiz
              </Button>
            </Link>
          )}
        </div>
      </Card>

      <Modal
        centered
        title="Delete Quiz"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        confirmLoading={isDeleting}
        okText="Delete"
        okButtonProps={{ danger: true }}
        cancelText="Cancel"
      >
        <p>
          Are you sure you want to delete this <strong>{quiz.title}</strong>{' '}
          quiz? This action cannot be undone.
        </p>
      </Modal>
    </>
  )
}

export default QuizComponent
