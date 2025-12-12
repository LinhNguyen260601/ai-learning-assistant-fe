import { Card, Skeleton } from 'antd'

const QuizResultsSkeleton = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Navigation Skeleton */}
      <div className="mb-6">
        <Skeleton.Button active size="small" className="w-[140px]! h-[24px]!" />
      </div>

      {/* Title Skeleton */}
      <Skeleton.Input
        active
        size="large"
        className="w-[400px]! h-[32px]! mb-6!"
      />

      {/* Summary Card Skeleton */}
      <Card className="shadow-md mb-6! text-center">
        {/* Trophy Icon Skeleton */}
        <div className="flex justify-center mb-4">
          <Skeleton.Avatar
            active
            size={80}
            shape="square"
            className="rounded-3xl"
          />
        </div>

        {/* Score Text Skeleton */}
        <div className="mb-2">
          <Skeleton.Input
            active
            size="small"
            className="w-[120px]! h-[16px]! mx-auto"
          />
        </div>

        {/* Score Percentage Skeleton */}
        <div className="mb-2">
          <Skeleton.Input active size="large" />
        </div>

        {/* Encouraging Message Skeleton */}
        <div className="mb-6">
          <Skeleton.Input
            active
            size="default"
            className="w-[150px]! h-[20px]! mx-auto"
          />
        </div>

        {/* Stats Tags Skeleton */}
        <div className="flex items-center justify-center gap-3">
          {[1, 2, 3].map((index) => (
            <Skeleton.Button
              key={index}
              active
              size="default"
              className="w-[80px]! h-[32px]! rounded-full!"
            />
          ))}
        </div>
      </Card>

      {/* Detailed Review Section Skeleton */}
      <div className="mb-6">
        {/* Section Header Skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton.Avatar
            active
            size={20}
            shape="square"
            className="rounded shrink-0"
          />
          <Skeleton.Input
            active
            size="default"
            className="w-[180px]! h-[24px]!"
          />
        </div>

        {/* Question Cards Skeleton */}
        <div className="flex flex-col gap-6">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="shadow-sm">
              {/* Question Header Skeleton */}
              <div className="mb-4">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <Skeleton.Button
                    active
                    size="small"
                    className="w-[100px]! h-[24px]! rounded-full!"
                  />
                  <Skeleton.Avatar
                    active
                    size={32}
                    shape="circle"
                    className="shrink-0"
                  />
                </div>

                {/* Question Text Skeleton */}
                <Skeleton.Input
                  active
                  size="default"
                  className="w-full! h-[24px]! mb-2"
                />
                <Skeleton.Input
                  active
                  size="default"
                  className="w-3/4! h-[24px]!"
                />
              </div>

              {/* Answer Options Skeleton */}
              <div className="flex flex-col gap-3 mb-4">
                {[1, 2, 3, 4].map((optionIndex) => (
                  <div
                    key={optionIndex}
                    className="flex items-center gap-3 p-4 rounded-lg border-2 border-gray-200"
                  >
                    <Skeleton.Avatar
                      active
                      size={20}
                      shape="circle"
                      className="shrink-0"
                    />
                    <div className="flex-1">
                      <Skeleton.Input
                        active
                        size="default"
                        className="w-full! h-[20px]!"
                      />
                    </div>
                    <Skeleton.Button
                      active
                      size="small"
                      className="w-[80px]! h-[24px]! rounded-full! shrink-0"
                    />
                  </div>
                ))}
              </div>

              {/* Explanation Card Skeleton */}
              <Card className="shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Skeleton.Avatar
                    active
                    size={32}
                    shape="square"
                    className="rounded-lg shrink-0"
                  />
                  <Skeleton.Input
                    active
                    size="small"
                    className="w-[120px]! h-[16px]!"
                  />
                </div>
                <div className="mb-2">
                  <Skeleton.Input
                    active
                    size="default"
                    className="w-full! h-[20px]!"
                  />
                </div>
                <div>
                  <Skeleton.Input
                    active
                    size="default"
                    className="w-5/6! h-[20px]!"
                  />
                </div>
              </Card>
            </Card>
          ))}
        </div>
      </div>

      {/* Return to Document Button Skeleton */}
      <div className="text-center">
        <Skeleton.Button active size="large" className="w-[200px]! h-[40px]!" />
      </div>
    </div>
  )
}

export default QuizResultsSkeleton
