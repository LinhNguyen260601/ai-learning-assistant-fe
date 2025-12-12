import { Button, Card, Progress, Skeleton } from 'antd'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const QuizTakingSkeleton = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <header className="mb-6">
        <Skeleton.Input
          active
          size="large"
          className="w-[300px]! h-[32px]! mb-4"
        />

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Skeleton.Input
              active
              size="small"
              className="w-[150px]! h-[20px]!"
            />
          </div>
          <Skeleton.Input
            active
            size="small"
            className="w-[100px]! h-[20px]!"
          />
        </div>

        <Progress percent={0} showInfo={false} />
      </header>

      {/* Question Card Skeleton */}
      <Card className="shadow-md mb-6!">
        <div className="flex items-center gap-4 mb-6">
          {/* Question Number Badge Skeleton */}
          <Skeleton.Avatar
            active
            size={48}
            shape="circle"
            className="shrink-0!"
          />

          {/* Question Text Skeleton */}
          <div className="flex-1">
            <Skeleton
              active
              paragraph={{ rows: 2, width: ['100%', '80%'] }}
              title={{ width: '60%' }}
            />
          </div>
        </div>

        {/* Answer Options Skeleton */}
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200"
            >
              <Skeleton.Avatar
                active
                size={20}
                shape="circle"
                className="shrink-0!"
              />
              <Skeleton.Input
                active
                size="default"
                className="w-full! h-[24px]!"
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation Skeleton */}
      <div className="flex items-center justify-between">
        <Button
          icon={<ChevronLeft size={18} />}
          disabled
          className="text-gray-600"
        >
          Previous
        </Button>

        {/* Question Numbers Skeleton */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((i) => (
            <Skeleton.Avatar key={i} active size={40} shape="circle" />
          ))}
        </div>

        <Button
          type="primary"
          icon={<ChevronRight size={18} />}
          iconPlacement="end"
          disabled
        >
          Next
        </Button>
      </div>
    </div>
  )
}

export default QuizTakingSkeleton
