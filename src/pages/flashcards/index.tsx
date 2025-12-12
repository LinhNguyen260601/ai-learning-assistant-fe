import { useQuery } from '@tanstack/react-query'
import { Link } from '@tanstack/react-router'
import { Empty, Typography } from 'antd'
import { FlashcardSetCard, FlashcardsLoading } from './components'
import { flashcardsService } from '@/services'
import { QUERY_KEY } from '@/constants'

const { Title, Text } = Typography

const Flashcards = () => {
  const {
    data: flashcardSetsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY.FLASHCARD_SETS],
    queryFn: () => flashcardsService.getFlashcardSets(),
  })

  const flashcardSets = flashcardSetsData?.flashcardSets || []
  const count = flashcardSetsData?.count || 0

  if (isLoading) return <FlashcardsLoading />

  if (isError || !flashcardSetsData) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <Empty description="Failed to load flashcard sets" />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <header className="mb-8">
        <Title level={1} className="mb-2! text-2xl! font-bold! text-gray-900!">
          All Flashcard Sets
        </Title>
        <Text className="text-base text-gray-500">
          {count} {count === 1 ? 'set' : 'sets'} available
        </Text>
      </header>

      {flashcardSets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flashcardSets.map((flashcardSet) => (
            <Link
              key={flashcardSet._id}
              to="/documents/$id"
              params={{ id: flashcardSet.documentId }}
              search={{ tab: 'flashcards', flashcardSetId: flashcardSet._id }}
            >
              <FlashcardSetCard flashcardSet={flashcardSet} />
            </Link>
          ))}
        </div>
      ) : (
        <Empty
          description="No flashcard sets yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </div>
  )
}

export default Flashcards
