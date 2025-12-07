import { Card, Skeleton } from 'antd'

const DashboardSkeleton = () => {
  return (
    <main className="p-4 sm:p-6">
      <header className="mb-6 sm:mb-8 flex flex-col">
        <Skeleton.Input
          active
          size="large"
          className="w-full sm:w-48 md:w-56 mb-2"
        />
        <Skeleton.Input
          active
          size="default"
          className="w-full sm:w-72 md:w-80"
        />
      </header>

      <section className="mb-6 sm:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((index) => (
            <Card key={index} className="shadow-sm">
              <div className="relative">
                <div className="flex flex-col pr-14 sm:pr-16">
                  <Skeleton.Input
                    active
                    size="small"
                    className="w-24 sm:w-28 md:w-32 mb-2"
                  />
                  <Skeleton.Input
                    active
                    size="large"
                    className="w-16 sm:w-20 md:w-24"
                  />
                </div>
                <Skeleton.Avatar
                  active
                  size={48}
                  shape="square"
                  className="absolute top-0 right-0 rounded-lg"
                />
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section className="w-full">
        <Card className="shadow-sm w-full">
          <div className="flex items-center gap-2 mb-6">
            <Skeleton.Avatar
              active
              size={32}
              shape="circle"
              className="bg-gray-100 shrink-0"
            />
            <Skeleton.Input
              active
              size="default"
              className="w-32 sm:w-40 md:w-48"
            />
          </div>

          <div className="space-y-3">
            {[1, 2].map((index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 py-4 px-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start gap-3 flex-1 w-full sm:w-auto">
                  <Skeleton.Avatar
                    active
                    size={8}
                    shape="circle"
                    className="mt-2 shrink-0"
                  />
                  <div className="flex-1 min-w-0 w-full sm:w-auto flex flex-col gap-2">
                    <Skeleton.Input
                      active
                      size="default"
                      className="w-full sm:w-3/4 md:w-2/3 mb-2"
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      className="w-2/3 sm:w-1/2 md:w-2/5"
                    />
                  </div>
                </div>
                <Skeleton.Button
                  active
                  size="small"
                  className="w-12 sm:w-14 shrink-0"
                />
              </div>
            ))}
          </div>
        </Card>
      </section>
    </main>
  )
}

export default DashboardSkeleton
