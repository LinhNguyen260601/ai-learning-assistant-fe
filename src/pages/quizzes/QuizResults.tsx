import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import { Button, Card, Tag, Typography } from 'antd'
import { ArrowLeft, BookOpen, Check, Target, Trophy, X } from 'lucide-react'
import { useMemo } from 'react'
import { QUERY_KEY } from '@/constants'
import QuestionResultCard from '@/pages/quizzes/components/QuizResultCard'
import QuizResultsSkeleton from '@/pages/quizzes/components/QuizResultsSkeleton'
import { getScoreData, scorePercentageStyle } from '@/pages/quizzes/core'
import { quizService } from '@/services'
import { QuizResultsErrorComponent } from '@/pages/quizzes/components'

const { Title, Text } = Typography

const QuizResults = () => {
  const { id } = useParams({ from: '/_authenticated/quizzes/$id/results' })

  const {
    data: resultsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY.QUIZ_RESULTS, id],
    queryFn: () => quizService.getQuizResults(id),
    enabled: !!id,
  })

  const scoreData = useMemo(() => {
    if (!resultsData) return null
    return getScoreData(resultsData)
  }, [resultsData])

  if (isLoading) return <QuizResultsSkeleton />

  if (isError || !resultsData || !scoreData)
    return (
      <QuizResultsErrorComponent
        documentId={resultsData?.quiz.document.id ?? ''}
      />
    )

  const { quiz, results } = resultsData

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Navigation */}
      <Link
        to="/documents/$id"
        params={{ id: quiz.document.id }}
        search={{ tab: 'quiz' }}
      >
        <Button
          type="text"
          icon={<ArrowLeft size={16} />}
          className="mb-6 p-0! h-auto!"
        >
          Back to Document
        </Button>
      </Link>

      {/* Title */}
      <Title level={1} className="mb-6! text-2xl! font-bold! text-gray-900!">
        {quiz.title} - Quiz Results
      </Title>

      {/* Summary Card */}
      <Card className="shadow-md mb-6! text-center">
        {/* Trophy Icon */}
        <div className="flex justify-center mb-4">
          <div className="size-20 rounded-3xl shadow-md flex items-center justify-center bg-(--ant-color-primary)/15">
            <Trophy size={48} className="text-(--ant-color-primary)" />
          </div>
        </div>

        {/* Score Text */}
        <Text className="block text-sm text-gray-600 mb-2 font-semibold uppercase tracking-wide">
          YOUR SCORE
        </Text>

        {/* Score Percentage */}
        <Title
          level={1}
          className="mb-2! text-5xl! font-bold! mt-0! relative! inline-block!"
          style={scorePercentageStyle}
        >
          {scoreData.percentage}%
          <style>{`
            @keyframes shimmer {
              0% {
                background-position: 0% center;
              }
              100% {
                background-position: 200% center;
              }
            }
          `}</style>
        </Title>

        {/* Encouraging Message */}
        <Text className="block text-base! text-gray-60! mb-6 font-semibold!">
          {scoreData.message}
        </Text>

        {/* Stats Buttons */}
        <div className="flex items-center justify-center gap-3">
          <Tag
            color="gray"
            className="px-4! py-2! rounded-full! bg-gray-100! text-gray-700! border-none! flex! items-center! gap-2!"
            icon={<Target size={16} />}
          >
            {scoreData.total} Total
          </Tag>
          <Tag
            color="green"
            className="px-4! py-2! rounded-full! border-none! flex! items-center! gap-2!"
            icon={<Check size={16} />}
          >
            {scoreData.correct} Correct
          </Tag>
          <Tag
            color="red"
            className="px-4! py-2! rounded-full! bg-red-50! text-red-600! border-none! flex! items-center! gap-2!"
            icon={<X size={16} />}
          >
            {scoreData.incorrect} Incorrect
          </Tag>
        </div>
      </Card>

      {/* Detailed Review Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={20} className="text-gray-600" />
          <Title level={3} className="mb-0! text-xl! font-bold! text-gray-900!">
            Detailed Review
          </Title>
        </div>

        <div className="flex flex-col gap-6">
          {results.map((result, index) => (
            <QuestionResultCard key={index} result={result} />
          ))}
        </div>
      </div>

      {/* Return to Document Button */}
      <div className="text-center">
        <Link
          to="/documents/$id"
          params={{ id: quiz.document.id }}
          search={{ tab: 'quiz' }}
        >
          <Button type="primary" size="large" icon={<ArrowLeft size={18} />}>
            Return to Document
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default QuizResults
