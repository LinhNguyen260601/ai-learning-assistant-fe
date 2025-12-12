export interface QuizResultsResponse {
  quiz: {
    id: string
    title: string
    document: {
      id: string
      title: string
    }
    score: number
    totalQuestions: number
    completedAt: string
  }
  results: Array<{
    questionIndex: number
    question: string
    options: Array<string>
    correctAnswer: string
    selectedAnswer?: string
    isCorrect?: boolean
    explanation: string
  }>
}

export interface SubmitQuizResponse {
  quizId: string
  score: number
  correctCount: number
  totalQuestions: number
  percentage: number
  userAnswers: Array<{
    questionIndex: number
    selectedAnswer: string
    isCorrect: boolean
    answeredAt: string
  }>
}
