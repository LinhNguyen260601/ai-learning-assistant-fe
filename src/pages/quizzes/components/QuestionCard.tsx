import { Card, Radio } from 'antd'
import Title from 'antd/es/typography/Title'
import { Check } from 'lucide-react'
import type { RadioChangeEvent } from 'antd'
import type { QuizQuestion } from '@/types'
import { cn } from '@/utils'

interface QuestionCardProps {
  selectedAnswer: string
  currentQuestionIndex: number
  currentQuestion: QuizQuestion
  onAnswerSelect: (event: RadioChangeEvent) => void
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  currentQuestionIndex,
  currentQuestion,
  selectedAnswer,
  onAnswerSelect,
}) => {
  return (
    <Card className="shadow-md mb-6!">
      <div className="flex items-center gap-4 mb-6">
        {/* Question Number Badge */}
        <div className="shrink-0 size-12 rounded-full flex items-center justify-center text-white font-bold text-lg bg-(--ant-color-primary)">
          {currentQuestionIndex + 1}
        </div>

        {/* Question Text */}
        <div className="flex-1">
          <Title level={4} className="mb-0! text-xl! font-bold! text-gray-900!">
            {currentQuestion.question}
          </Title>
        </div>
      </div>

      {/* Answer Options */}
      <Radio.Group
        value={selectedAnswer}
        onChange={onAnswerSelect}
        className="w-full"
      >
        <div className="flex flex-col gap-3">
          {currentQuestion.options.map((option, optionIndex) => {
            const isSelected = selectedAnswer === option
            return (
              <label
                key={optionIndex}
                className={cn(
                  'flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-all',
                  isSelected
                    ? 'border-(--ant-color-primary) bg-(--ant-color-primary)/10'
                    : 'border-gray-200 bg-white hover:border-gray-300',
                )}
              >
                <Radio
                  value={option}
                  className={cn(
                    'shrink-0',
                    isSelected && 'text-(--ant-color-primary)!',
                  )}
                />
                <span className="flex-1 text-base text-gray-900">{option}</span>
                {isSelected && (
                  <Check
                    size={20}
                    className="shrink-0 text-(--ant-color-primary)!"
                  />
                )}
              </label>
            )
          })}
        </div>
      </Radio.Group>
    </Card>
  )
}

export default QuestionCard
