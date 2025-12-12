import { Card, Tag, Typography } from 'antd'
import { BookOpen, Check, X } from 'lucide-react'
import { Activity } from 'react'
import type { QuizResultsResponse } from '@/pages/quizzes/core'
import { cn } from '@/utils'

const { Title, Text } = Typography

interface QuestionResultCardProps {
  result: QuizResultsResponse['results'][number]
}

const QuestionResultCard = ({ result }: QuestionResultCardProps) => {
  const isCorrect = result.isCorrect === true

  return (
    <Card className="shadow-sm">
      <header className="mb-4">
        {/* Question Number and Text */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <Tag
            color="gray"
            className="bg-gray-100! text-gray-700! border-none! rounded-full! px-3! py-1!"
          >
            Question {result.questionIndex + 1}
          </Tag>
          {/* Status Icon */}
          {isCorrect ? (
            <div className="size-8 rounded-full flex items-center justify-center shrink-0 bg-(--ant-color-primary)/15">
              <Check size={20} className="text-(--ant-color-primary)" />
            </div>
          ) : (
            <div className="size-8 rounded-full flex items-center justify-center shrink-0 bg-red-50">
              <X size={20} className="text-red-600" />
            </div>
          )}
        </div>

        <Title
          level={4}
          className="mb-0! text-lg! font-bold! text-gray-900! flex-1"
        >
          {result.question}
        </Title>
      </header>

      {/* Answer Options */}
      <div className="flex flex-col gap-3 mb-4">
        {result.options.map((option, optionIndex) => {
          const isCorrectAnswer = option === result.correctAnswer
          const isUserAnswer = option === result.selectedAnswer
          const showCorrectBadge = isCorrectAnswer
          const showUserAnswerBadge = isUserAnswer && !isCorrectAnswer

          return (
            <div
              key={optionIndex}
              className={cn(
                'flex items-center gap-3 p-4 rounded-lg border-2',
                isCorrectAnswer
                  ? 'border-(--ant-color-primary) bg-(--ant-color-primary)/10'
                  : showUserAnswerBadge
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200 bg-white',
              )}
            >
              <div
                className={cn(
                  'size-5 rounded-full border-2 shrink-0',
                  isCorrectAnswer
                    ? 'border-(--ant-color-primary) bg-(--ant-color-primary)'
                    : showUserAnswerBadge
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300 bg-white',
                )}
              />
              <span className="flex-1 text-base text-gray-900">{option}</span>
              <Activity mode={showCorrectBadge ? 'visible' : 'hidden'}>
                <Tag
                  className="bg-(--ant-color-primary)! text-white! border-none! rounded-full! px-3! py-1! flex! items-center gap-1.5!"
                  icon={<Check size={14} />}
                >
                  Correct
                </Tag>
              </Activity>

              <Activity mode={showUserAnswerBadge ? 'visible' : 'hidden'}>
                <Tag
                  className="bg-red-500! text-white! border-none! rounded-full! px-3! py-1! flex! items-center gap-1.5!"
                  icon={<X size={14} />}
                >
                  Your Answer
                </Tag>
              </Activity>
            </div>
          )
        })}
      </div>

      {/* Explanation */}
      <Activity mode={result.explanation ? 'visible' : 'hidden'}>
        <Card className="shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="size-8 rounded-lg flex items-center justify-center shrink-0 bg-gray-200">
              <BookOpen size={16} className="text-gray-600" />
            </div>
            <Text className="text-sm! font-semibold! text-gray-700! uppercase! tracking-wide!">
              EXPLANATION
            </Text>
          </div>
          <Text className="text-base! text-gray-700! leading-relaxed!">
            {result.explanation}
          </Text>
        </Card>
      </Activity>
    </Card>
  )
}

export default QuestionResultCard
