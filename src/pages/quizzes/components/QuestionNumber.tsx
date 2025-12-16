import type { QuizQuestion } from '@/types'
import { cn } from '@/utils'

interface QuestionNumberProps {
  questions: Array<QuizQuestion>
  selectedAnswers: Record<number, string>
  currentQuestionIndex: number
  onQuestionNumberClick: (index: number) => () => void
}

const QuestionNumber: React.FC<QuestionNumberProps> = ({
  questions,
  selectedAnswers,
  currentQuestionIndex,
  onQuestionNumberClick,
}) => {
  return (
    <div className="flex items-center gap-2">
      {questions.map((_, index) => {
        const isAnswered = !!selectedAnswers[index]
        const isCurrent = index === currentQuestionIndex

        const allPreviousAnswered =
          index === 0 ||
          Array.from({ length: index }, (__, prevIdx) => prevIdx).every(
            (prevIndex) => !!selectedAnswers[prevIndex],
          )

        const isDisabled = !isAnswered && !allPreviousAnswered

        return (
          <button
            key={index}
            type="button"
            onClick={onQuestionNumberClick(index)}
            className={cn(
              'size-10 rounded-full flex items-center justify-center font-semibold transition-all',
              isCurrent
                ? 'text-white bg-(--ant-color-primary)! cursor-pointer'
                : isAnswered
                  ? 'text-gray-700 bg-gray-200 cursor-pointer'
                  : isDisabled
                    ? 'text-gray-400 bg-gray-50 cursor-not-allowed opacity-50'
                    : 'text-gray-400 bg-gray-50 cursor-pointer',
            )}
            disabled={isDisabled}
          >
            {index + 1}
          </button>
        )
      })}
    </div>
  )
}

export default QuestionNumber
