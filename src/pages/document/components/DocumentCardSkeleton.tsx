import { Button, Card } from 'antd'
import Title from 'antd/es/typography/Title'
import Text from 'antd/es/typography/Text'
import { Plus } from 'lucide-react'

const DocumentCardSkeleton = () => {
  return (
    <main className="p-6">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <Title
            level={1}
            className="mb-2! text-2xl! font-bold! text-gray-900!"
          >
            My Documents
          </Title>
          <Text className="text-base text-gray-500">
            Manage and organize your learning materials.
          </Text>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<Plus size={20} />}
          className="pointer-events-none"
        >
          Upload Document
        </Button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-sm" loading />
        ))}
      </div>
    </main>
  )
}

export default DocumentCardSkeleton
