import { Link } from '@tanstack/react-router'
import { Button, Typography } from 'antd'
import { useCallback } from 'react'
import { cn, formatDate } from '@/utils'

const { Text } = Typography

export type ActivityType = 'document' | 'quiz'
export type ActivityColor = 'blue' | 'green'

export interface ActivityItemProps {
  id: string
  title: string
  date: Date | null
  color: ActivityColor
  type: ActivityType
}

const ActivityItem = ({ item }: { item: ActivityItemProps }) => {
  const handleView = useCallback(() => {
    // TODO: Navigate to item detail
    console.log('View item:', item.id)
  }, [item.id])

  const getActivityText = () => {
    if (item.type === 'document') return `Accessed Document: ${item.title}`
    return `Attempted Quiz: ${item.title}`
  }

  return (
    <Link
      to="/documents/$id"
      params={{ id: item.id }}
      className="flex items-start justify-between py-4 px-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-3 flex-1">
        <div
          className={cn(
            'w-2 h-2 rounded-full mt-2 shrink-0',
            item.color === 'blue' ? 'bg-blue-500' : 'bg-green-500',
          )}
        />
        <div className="flex-1 min-w-0">
          <Text className="text-sm font-medium text-gray-900 block">
            {getActivityText()}
          </Text>
          <Text className="text-xs text-gray-500 block mt-1">
            {formatDate(item.date)}
          </Text>
        </div>
      </div>
      <Button
        type="link"
        className="text-green-600 hover:text-green-700 p-0! h-auto! font-medium!"
        onClick={handleView}
      >
        View
      </Button>
    </Link>
  )
}

export default ActivityItem
