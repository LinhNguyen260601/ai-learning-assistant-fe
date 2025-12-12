import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from '@tanstack/react-router'
import { useCallback, useState } from 'react'
import type { QuizDetail } from '@/types'
import type { RadioChangeEvent } from 'antd'
import { QUERY_KEY } from '@/constants'
import { compileAnswersIntoPayload } from '@/pages/quizzes/core'
import { quizService } from '@/services'

const useQuizTakingController = () => {
  const navigate = useNavigate()
  const { id } = useParams({ from: '/_authenticated/quizzes/$id' })

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, string>
  >({})

  const {
    data: quiz,
    isLoading,
    isError,
  } = useQuery<QuizDetail>({
    queryKey: [QUERY_KEY.QUIZ, id],
    queryFn: () => quizService.getQuiz(id),
    enabled: !!id,
  })

  const { mutate: submitQuizMutation, isPending: isSubmitting } = useMutation({
    mutationFn: (
      answers: Array<{ questionIndex: number; selectedAnswer: string }>,
    ) => quizService.submitQuiz(id, answers),
    onSuccess: () => {
      navigate({ to: '/quizzes/$id/results', params: { id } })
    },
  })

  const currentQuestion = quiz?.questions[currentQuestionIndex]
  const totalQuestions = quiz?.totalQuestions || 0
  const answeredCount = Object.keys(selectedAnswers).length
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1
  const selectedAnswer = selectedAnswers[currentQuestionIndex]
  const progress =
    totalQuestions > 0 ? ((answeredCount / totalQuestions) * 100).toFixed(0) : 0

  const handleAnswerSelect = (event: RadioChangeEvent) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: event.target.value,
    }))
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex((prev) => prev - 1)
  }

  const handleNext = useCallback(() => {
    if (quiz && currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      return
    }

    // Submit quiz if on last question
    const answers = compileAnswersIntoPayload(selectedAnswers)
    submitQuizMutation(answers)
  }, [currentQuestionIndex, quiz, selectedAnswers, submitQuizMutation])

  const handleQuestionNumberClick = (index: number) => () => {
    setCurrentQuestionIndex(index)
  }

  const handleSubmit = useCallback(() => {
    const answers = compileAnswersIntoPayload(selectedAnswers)
    submitQuizMutation(answers)
  }, [selectedAnswers, submitQuizMutation])

  return {
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
  }
}

export default useQuizTakingController
