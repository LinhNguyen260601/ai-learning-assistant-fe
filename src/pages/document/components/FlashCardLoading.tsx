import { Card } from 'antd'
import Title from 'antd/es/typography/Title'
import Text from 'antd/es/typography/Text'

const FlashCardLoading = () => {
  return (
    <div className="p-6">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <article>
          <Title
            level={1}
            className="mb-2! text-2xl! font-bold! text-gray-900!"
          >
            Your Flashcard Sets
          </Title>
          <Text className="text-base text-gray-500">
            Loading flashcard sets...
          </Text>
        </article>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="shadow-sm" loading />
        ))}
      </div>
    </div>
  )
}

export default FlashCardLoading
