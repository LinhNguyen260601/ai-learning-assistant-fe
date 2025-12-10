import { Button, Card, Tag, Typography } from 'antd'
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Star,
} from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import type { FlashcardCard, FlashcardSet } from '@/types'
import {
  flashcardBackStyleStyle,
  flashcardContainerStyle,
  flashcardFrontStyle,
  flashcardStyle,
  getDifficultyColor,
} from '@/pages/document/core'
import { cn } from '@/utils'

const { Text } = Typography

interface FlashCardReviewsProps {
  isFlipped: boolean
  totalCards: number
  currentIndex: number
  currentCard: FlashcardCard
  selectedSet: FlashcardSet
  onNext: () => void
  onFlip: () => void
  onPrevious: () => void
  onBackToSets: () => void
  onToggleStar: (event: React.MouseEvent) => void
}

const FlashCardReviews = ({
  currentCard,
  totalCards,
  currentIndex,
  isFlipped,
  onFlip,
  onNext,
  onPrevious,
  onBackToSets,
  onToggleStar,
}: FlashCardReviewsProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      onFlip()
    }
  }

  return (
    <Card>
      {/* Back Navigation */}
      <Button
        type="text"
        icon={<ArrowLeft size={16} />}
        className="mb-6 p-0! h-auto!"
        onClick={onBackToSets}
      >
        Back to Sets
      </Button>

      {/* Flashcard Container */}
      <div className="flex flex-col items-center gap-6 mb-8">
        {/* Flashcard with 3D Flip Animation */}
        <div
          className="w-full max-w-2xl h-[400px]"
          style={flashcardContainerStyle}
        >
          <div
            className={cn(
              'relative w-full h-full transition-transform duration-500',
              'transform-style-preserve-3d',
              isFlipped && 'rotate-y-180',
            )}
            style={flashcardStyle(isFlipped)}
            onClick={onFlip}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            aria-label={
              isFlipped ? 'Click to see question' : 'Click to reveal answer'
            }
          >
            {/* Front Side (Question) */}
            <div
              className={cn(
                'absolute inset-0 w-full h-full rounded-2xl shadow-lg cursor-pointer',
                'backface-hidden bg-white',
              )}
              style={flashcardFrontStyle}
            >
              {/* Difficulty Tag */}
              <div className="absolute top-4 left-4 z-10">
                <Tag
                  color={getDifficultyColor(currentCard.difficulty)}
                  className="text-sm font-semibold"
                >
                  {currentCard.difficulty.toUpperCase()}
                </Tag>
              </div>

              {/* Star Icon */}
              <button
                type="button"
                onClick={onToggleStar}
                className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label={currentCard.isStarred ? 'Unstar card' : 'Star card'}
              >
                <Star
                  size={24}
                  className={cn(
                    'transition-colors',
                    currentCard.isStarred
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-400',
                  )}
                />
              </button>

              {/* Question Content */}
              <div className="h-full flex flex-col items-center justify-center p-8">
                <Text className="text-xl text-center mb-4 font-bold text-gray-900">
                  {currentCard.question}
                </Text>
                <div className="flex items-center gap-2 text-gray-500 text-sm mt-4">
                  <RotateCcw size={16} />
                  <span>Click to reveal answer</span>
                </div>
              </div>
            </div>

            {/* Back Side (Answer) */}
            <div
              className={cn(
                'absolute inset-0 w-full h-full rounded-2xl shadow-lg cursor-pointer',
                'backface-hidden bg-linear-to-br from-(--ant-color-primary) to-(--ant-color-primary)/80',
                'rotate-y-180',
              )}
              style={flashcardBackStyleStyle}
            >
              {/* Difficulty Tag */}
              <div className="absolute top-4 left-4 z-10">
                <Tag
                  color={getDifficultyColor(currentCard.difficulty)}
                  className="text-sm font-semibold"
                >
                  {currentCard.difficulty.toUpperCase()}
                </Tag>
              </div>

              {/* Star Icon */}
              <button
                type="button"
                onClick={onToggleStar}
                className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label={currentCard.isStarred ? 'Unstar card' : 'Star card'}
              >
                <Star
                  size={24}
                  className={cn(
                    'transition-colors',
                    currentCard.isStarred
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-white',
                  )}
                />
              </button>

              {/* Answer Content */}
              <div className="h-full flex flex-col items-center justify-center p-8">
                <ReactMarkdown
                  components={{
                    p: (props) => (
                      <p className="text-white">{props.children}</p>
                    ),
                  }}
                >
                  {currentCard.answer}
                </ReactMarkdown>

                <div className="flex items-center gap-2 text-white/90 text-sm mt-4">
                  <RotateCcw size={16} />
                  <span className="font-semibold">Click to see question</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          icon={<ChevronLeft size={18} />}
          onClick={onPrevious}
          disabled={currentIndex === 0}
          size="large"
        >
          Previous
        </Button>

        <div className="px-6 py-2 bg-gray-100 rounded-lg">
          <Text className="text-base font-medium text-gray-700">
            {currentIndex + 1} / {totalCards}
          </Text>
        </div>

        <Button
          icon={<ChevronRight size={18} />}
          onClick={onNext}
          disabled={currentIndex >= totalCards - 1}
          size="large"
        >
          Next
        </Button>
      </div>
    </Card>
  )
}

export default FlashCardReviews
