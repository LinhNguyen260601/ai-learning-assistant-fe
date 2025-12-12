import { Button, Progress, Typography } from 'antd'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { QuizDetail } from '@/types'
import {
  QuestionCard,
  QuestionNumber,
  QuizTakingErrorComponent,
} from '@/pages/quizzes/components'
import QuizTakingSkeleton from '@/pages/quizzes/components/QuizTakingSkeleton'
import { useQuizTakingController } from '@/pages/quizzes/controllers'

const { Title, Text } = Typography

const QuizTakingHeader = ({
  quiz,
  progress,
  answeredCount,
  totalQuestions,
  currentQuestionIndex,
}: {
  progress: number
  quiz: QuizDetail
  answeredCount: number
  totalQuestions: number
  currentQuestionIndex: number
}) => (
  <header className="mb-6">
    <Title level={1} className="mb-4! text-2xl! font-bold! text-gray-900!">
      {quiz.title}
    </Title>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Text className="text-base text-gray-700! font-semibold">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </Text>
      </div>
      <Text className="text-base text-gray-700!">{answeredCount} answered</Text>
    </div>

    <Progress percent={Number(progress)} />
  </header>
)

const QuizTaking = () => {
  const {
    quiz,
    isError,
    progress,
    isLoading,
    isSubmitting,
    answeredCount,
    totalQuestions,
    isLastQuestion,
    selectedAnswer,
    currentQuestion,
    selectedAnswers,
    handleNext,
    handleSubmit,
    handlePrevious,
    handleAnswerSelect,
    currentQuestionIndex,
    handleQuestionNumberClick,
  } = useQuizTakingController()

  if (isLoading) return <QuizTakingSkeleton />

  if (isError || !quiz || !currentQuestion)
    return <QuizTakingErrorComponent documentId={quiz?.documentId || ''} />

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <QuizTakingHeader
        quiz={quiz}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={totalQuestions}
        answeredCount={answeredCount}
        progress={Number(progress)}
      />

      {/* Question Card */}
      <QuestionCard
        selectedAnswer={selectedAnswer}
        currentQuestion={currentQuestion}
        onAnswerSelect={handleAnswerSelect}
        currentQuestionIndex={currentQuestionIndex}
      />

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          icon={<ChevronLeft size={18} />}
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="text-gray-600"
        >
          Previous
        </Button>

        {/* Question Numbers */}
        <QuestionNumber
          questions={quiz.questions}
          selectedAnswers={selectedAnswers}
          currentQuestionIndex={currentQuestionIndex}
          onQuestionNumberClick={handleQuestionNumberClick}
        />

        <Button
          type="primary"
          icon={<ChevronRight size={18} />}
          iconPlacement="end"
          onClick={isLastQuestion ? handleSubmit : handleNext}
          disabled={!selectedAnswer && !isLastQuestion}
          loading={isSubmitting}
        >
          {isLastQuestion ? 'Submit Quiz' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

export default QuizTaking
