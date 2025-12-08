import { useQuery } from '@tanstack/react-query'
import { Card, Typography } from 'antd'
import { BookOpen, ClipboardCheck, Clock, FileText } from 'lucide-react'
import isEmpty from 'lodash/isEmpty'
import type { ActivityItemProps } from '@/pages/dashboard/components/ActivityItem'
import { dashboardService } from '@/services'
import { ActivityItem, SummaryCard } from '@/pages/dashboard/components'
import { QUERY_KEY } from '@/constants'

const { Title, Text } = Typography

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.DASHBOARD],
    queryFn: () => dashboardService.getDashboard(),
    refetchOnMount: (query) => !query.state.data,
    select: (res) => {
      const normarlizedDocuments = res.recentActivity.documents.map((doc) => ({
        id: doc._id,
        type: 'document',
        title: doc.title,
        date: new Date(doc.lastAccessed),
        color: 'blue',
      })) as Array<ActivityItemProps>

      const normarlizedQuizzes = res.recentActivity.quizzes.map((quiz) => ({
        id: quiz._id,
        type: 'quiz',
        title: quiz.title,
        date: new Date(quiz.completedAt),
        color: 'green',
      })) as Array<ActivityItemProps>

      return {
        overview: res.overview,
        recentActivity: normarlizedDocuments.concat(normarlizedQuizzes),
      }
    },
  })

  return (
    <main className="p-6">
      <header className="mb-8">
        <Title level={1} className="mb-2! text-2xl! font-bold! text-gray-900!">
          Dashboard
        </Title>
        <Text className="text-base text-gray-500">
          Track your learning progress and activity
        </Text>
      </header>

      <section className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SummaryCard
            title="Total Documents"
            value={data?.overview.totalDocuments ?? 0}
            icon={<FileText size={24} className="text-white" />}
            iconBgColor="bg-blue-500"
          />
          <SummaryCard
            title="Total Flashcards"
            value={data?.overview.totalFlashcards ?? 0}
            icon={<BookOpen size={24} className="text-white" />}
            iconBgColor="bg-gradient-to-br from-purple-500 to-pink-500"
          />
          <SummaryCard
            title="Total Quizzes"
            value={data?.overview.totalQuizzes ?? 0}
            icon={<ClipboardCheck size={24} className="text-white" />}
            iconBgColor="bg-green-500"
          />
        </div>
      </section>

      <section className="w-full">
        <Card className="shadow-sm w-full">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Clock size={16} className="text-gray-600" />
            </div>
            <Title level={4} className="mb-0! font-bold! text-gray-900!">
              Recent Activity
            </Title>
          </div>

          <div className="space-y-3">
            {!isEmpty(data?.recentActivity) ? (
              data?.recentActivity.map((activity) => (
                <ActivityItem key={activity.id} item={activity} />
              ))
            ) : (
              <div className="py-8 text-center">
                <Text className="text-gray-500">No recent activity</Text>
              </div>
            )}
          </div>
        </Card>
      </section>
    </main>
  )
}

export default Dashboard
