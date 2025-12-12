import { Button, Card, Progress, Tag, Typography } from 'antd'
import { BookOpen, Sparkles, TrendingUp } from 'lucide-react'
import { useMemo } from 'react'
import type { FlashcardSet } from '@/types'
import { cn } from '@/utils'
import { formatRelativeTime } from '@/utils/format'
import { getReviewCountAndPercentage } from '@/pages/flashcards/core'

interface FlashcardSetCardProps {
  flashcardSet: FlashcardSet
}

const FlashcardSetCard = ({ flashcardSet }: FlashcardSetCardProps) => {
  const cardCount = flashcardSet.cards.length

  const { reviewedCount, progressPercentage } = useMemo(
    () => getReviewCountAndPercentage(cardCount, flashcardSet.cards),
    [cardCount, flashcardSet.cards],
  )

  const createdTimeAgo = useMemo(() => {
    const timeStr = formatRelativeTime(new Date(flashcardSet.createdAt))
    return timeStr.toUpperCase()
  }, [flashcardSet.createdAt])

  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow border-gray-200">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="size-12 rounded-lg bg-(--ant-color-primary)/10 flex items-center justify-center shrink-0 border border-(--ant-color-primary)/20">
            <BookOpen size={24} className="text-(--ant-color-primary)" />
          </div>

          <article className="flex-1 min-w-0">
            <Typography.Title
              level={4}
              className="mb-1! text-lg! font-bold! text-gray-900!"
            >
              Flashcard Set
            </Typography.Title>
            <Typography.Text className="text-xs text-gray-500 block mb-3">
              CREATED {createdTimeAgo}
            </Typography.Text>

            <div className="flex flex-wrap gap-2">
              <Tag className="bg-gray-100! text-gray-700! border-none! rounded-lg! px-3! py-1!">
                {cardCount} {cardCount === 1 ? 'Card' : 'Cards'}
              </Tag>
              <Tag className="bg-(--ant-color-primary)/10! text-(--ant-color-primary)! border-none! rounded-lg! px-3! py-1! flex! items-center! gap-1.5!">
                <TrendingUp size={14} />
                {progressPercentage}%
              </Tag>
            </div>
          </article>
        </div>

        {/* Progress Section */}
        <div className="flex items-center justify-between mb-2">
          <Typography.Text className="text-sm font-semibold text-gray-700">
            Progress
          </Typography.Text>
          <Typography.Text className="text-xs text-gray-500">
            {reviewedCount}/{cardCount} reviewed
          </Typography.Text>
        </div>
        <Progress percent={progressPercentage} className="mb-4" />

        {/* Study Now Button */}

        <Button
          type="primary"
          size="large"
          icon={<Sparkles size={16} />}
          className={cn(
            'w-full! rounded-lg!',
            'bg-(--ant-color-primary)!',
            'border-none! text-white! font-semibold! hover:opacity-90! transition-opacity!',
          )}
        >
          Study Now
        </Button>
      </div>
    </Card>
  )
}

export default FlashcardSetCard
