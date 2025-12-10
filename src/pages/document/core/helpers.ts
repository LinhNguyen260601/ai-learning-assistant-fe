import type { Difficulty } from '@/types/flashcard'

export const getDifficultyColor = (difficulty: Difficulty) =>
  ({
    easy: 'green',
    medium: 'orange',
    hard: 'red',
    default: 'default',
  })[difficulty] || 'default'
