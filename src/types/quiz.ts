export interface QuizQuestion {
  question: string
  options: Array<string>
  correctAnswer: string
  explanation?: string
  difficulty?: 'easy' | 'medium' | 'hard'
}

export interface QuizUserAnswer {
  questionIndex: number
  selectedAnswer: string
  isCorrect?: boolean
  answeredAt?: string
}

export interface Quiz {
  _id: string
  title: string
  documentId: string
  score: number
  totalQuestions: number
  completedAt: string | null
  createdAt: string
}

export interface QuizByDocumentIdResponse extends Quiz {
  userId: string
  documentId: string
  questions: Array<QuizQuestion>
  userAnswers: Array<QuizUserAnswer>
}

export interface QuizDetail extends Quiz {
  userId: string
  documentId: string
  questions: Array<QuizQuestion>
  userAnswers: Array<QuizUserAnswer>
}
