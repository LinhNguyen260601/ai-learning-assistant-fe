import { Button, Card, Empty, Typography } from 'antd'
import { Plus } from 'lucide-react'
import { FlashCardLoading } from '@/pages/document/components'
import FlashCardReviews from '@/pages/document/components/FlashCardReviews'
import FlashcardSetCard from '@/pages/document/components/FlashcardSetCard'
import useFlashCardController from '@/pages/document/controllers/useFlashCardController'

const { Title, Text } = Typography

const FlashCard = () => {
  const {
    isFlipped,
    selectedSetId,
    currentIndex,
    currentCard,
    totalCards,
    selectedSet,
    count,
    flashcardSets,
    handleNext,
    handlePrevious,
    handleToggleStar,
    handleBackToSets,
    handleCardClick,
    handleFlip,
    isLoadingData,
    handleGenerateFlashcards,
    isGeneratingFlashcards,
  } = useFlashCardController()

  if (selectedSetId && selectedSet && currentCard) {
    return (
      <FlashCardReviews
        isFlipped={isFlipped}
        totalCards={totalCards}
        currentIndex={currentIndex}
        currentCard={currentCard}
        selectedSet={selectedSet}
        onNext={handleNext}
        onFlip={handleFlip}
        onPrevious={handlePrevious}
        onToggleStar={handleToggleStar}
        onBackToSets={handleBackToSets}
      />
    )
  }

  if (isLoadingData) return <FlashCardLoading />

  return (
    <Card>
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <article>
          <Title
            level={1}
            className="mb-2! text-2xl! font-bold! text-gray-900!"
          >
            Your Flashcard Sets
          </Title>
          <Text className="text-base text-gray-500">
            {count} {count === 1 ? 'set' : 'sets'} available
          </Text>
        </article>
        <Button
          type="primary"
          size="large"
          icon={<Plus size={20} />}
          onClick={handleGenerateFlashcards}
          loading={isGeneratingFlashcards}
        >
          Generate New Set
        </Button>
      </header>

      {flashcardSets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {flashcardSets.map((flashcardSet) => (
            <FlashcardSetCard
              key={flashcardSet._id}
              flashcardSet={flashcardSet}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      ) : (
        <Empty
          description="No flashcard sets yet"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}
    </Card>
  )
}

export default FlashCard
