import { Card } from 'antd'

const DocumentCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="shadow-sm" loading />
      ))}
    </div>
  )
}

export default DocumentCardSkeleton
