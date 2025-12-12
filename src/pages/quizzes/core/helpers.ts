import type { QuizResultsResponse } from '@/pages/quizzes/core/types'

/**
export const compileAnswersIntoPayload = (
 * Compiles the selected answers into an array of objects with the question index and selected answer
 * @param selectedAnswers - The selected answers
 * @returns An array of objects with the question index and selected answer
 */
export const compileAnswersIntoPayload = (
  selectedAnswers: Record<number, string>,
): Array<{ questionIndex: number; selectedAnswer: string }> =>
  Object.entries(selectedAnswers).map(([index, answer]) => ({
    questionIndex: parseInt(index, 10),
    selectedAnswer: answer,
  }))

/**
 * Gets the score data from the results data
 * @param resultsData - The results data
 * @returns The score data
 */
export const getScoreData = (resultsData: QuizResultsResponse) => {
  const { quiz, results } = resultsData
  const correctCount = results.filter((r) => r.isCorrect).length
  const incorrectCount = results.filter((r) => r.isCorrect === false).length
  const percentage = Math.round(quiz.score)

  const messageMap = {
    low: 'Keep practicing!',
    mid: 'Not bad!',
    high: 'Well done!',
    top: 'Excellent!',
  }[percentage]

  return {
    percentage,
    message: messageMap,
    total: quiz.totalQuestions,
    correct: correctCount,
    incorrect: incorrectCount,
  }
}
