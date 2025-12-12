import { Card, Skeleton } from 'antd'

const FlashcardsLoading = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <Skeleton.Input
          active
          size="large"
          className="w-[250px]! h-[32px]! mb-2"
        />
        <Skeleton.Input
          active
          size="default"
          className="w-[200px]! h-[20px]!"
        />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <Card key={index} className="shadow-sm border-gray-200">
            <div className="flex flex-col gap-4">
              {/* Header Skeleton */}
              <div className="flex items-start gap-4">
                <Skeleton.Avatar
                  active
                  size={48}
                  shape="square"
                  className="rounded-lg shrink-0"
                />
                <article className="flex-1 min-w-0">
                  <div className="mb-1">
                    <Skeleton.Input
                      active
                      size="default"
                      className="w-full! h-[24px]! mb-2"
                    />
                  </div>
                  <div className="mb-3">
                    <Skeleton.Input
                      active
                      size="small"
                      className="w-3/4! h-[16px]!"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Skeleton.Button
                      active
                      size="small"
                      className="w-[80px]! h-[28px]! rounded-lg!"
                    />
                    <Skeleton.Button
                      active
                      size="small"
                      className="w-[70px]! h-[28px]! rounded-lg!"
                    />
                  </div>
                </article>
              </div>

              {/* Progress Skeleton */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <Skeleton.Input
                      active
                      size="small"
                      className="w-[70px]! h-[20px]!"
                    />
                  </div>
                  <div>
                    <Skeleton.Input
                      active
                      size="small"
                      className="w-[110px]! h-[16px]!"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Skeleton.Input
                    active
                    size="default"
                    className="w-full! h-[6px]! rounded-full!"
                  />
                </div>
              </div>

              {/* Button Skeleton */}
              <div>
                <Skeleton.Button
                  active
                  size="large"
                  className="w-full! h-[40px]! rounded-lg!"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FlashcardsLoading
