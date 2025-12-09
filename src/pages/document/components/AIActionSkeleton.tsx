import { Card, Divider, Skeleton } from 'antd'
import { cardContainerClassNames } from '@/pages/document/core'

const AIActionSkeleton = () => {
  return (
    <Card className="flex flex-col" classNames={cardContainerClassNames}>
      {/* Header Skeleton */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-1">
          <Skeleton.Avatar
            active
            size={40}
            shape="square"
            className="rounded-lg shrink-0"
          />
          <div className="flex flex-col">
            <Skeleton.Input active size="large" className="w-48 mb-2" />
            <Skeleton.Input active size="small" className="w-40" />
          </div>
        </div>
      </div>

      <Divider className="my-0!" />

      {/* Action Cards Skeleton */}
      <div className="space-y-4 p-6">
        {/* Generate Summary Card Skeleton */}
        <Card className="shadow-sm border-0 bg-white mb-6!">
          <div className="flex items-center gap-4">
            <Skeleton.Avatar
              active
              size={48}
              shape="square"
              className="rounded-lg shrink-0"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <Skeleton.Input active size="default" className="w-40 mb-2" />
              <Skeleton.Input active size="small" className="w-64" />
            </div>
            <Skeleton.Button
              active
              size="large"
              className="w-28 shrink-0 self-end"
            />
          </div>
        </Card>

        {/* Explain Concept Card Skeleton */}
        <Card className="shadow-sm border-0 bg-white">
          <div className="flex items-start gap-4">
            <Skeleton.Avatar
              active
              size={48}
              shape="square"
              className="rounded-lg shrink-0 mt-1"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <Skeleton.Input active size="default" className="w-40 mb-2" />
              <Skeleton.Input active size="small" className="w-64 mb-3" />
              <Skeleton.Input
                active
                size="large"
                classNames={{ content: 'w-full!' }}
              />
            </div>
            <Skeleton.Button
              active
              size="large"
              className="w-24 shrink-0 self-end"
            />
          </div>
        </Card>
      </div>
    </Card>
  )
}

export default AIActionSkeleton
