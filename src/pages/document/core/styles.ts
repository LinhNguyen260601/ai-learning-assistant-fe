import type { CardClassNamesType } from 'antd/es/card/Card'
import type { TextAreaProps } from 'antd/es/input/TextArea'

export const draggerStyle: React.CSSProperties = {
  borderColor: 'var(--ant-color-primary)',
}

export const uploadIconStyle: React.CSSProperties = {
  color: 'var(--ant-color-primary)',
}

export const firstDotStyle: React.CSSProperties = {
  animation: 'bounceHigher 0.8s ease-in-out infinite',
  animationDelay: '0s',
}

export const secondDotStyle: React.CSSProperties = {
  animation: 'bounceHigher 0.8s ease-in-out infinite',
  animationDelay: '0.15s',
}

export const thirdDotStyle: React.CSSProperties = {
  animation: 'bounceHigher 0.8s ease-in-out infinite',
  animationDelay: '0.3s',
}

export const textareaAutoSize: TextAreaProps['autoSize'] = {
  minRows: 1,
  maxRows: 4,
}

export const cardContainerClassNames: CardClassNamesType = { body: 'p-0!' }

export const flashcardContainerStyle: React.CSSProperties = {
  perspective: '1000px',
}

export const flashcardStyle = (isFlipped: boolean): React.CSSProperties => ({
  transformStyle: 'preserve-3d',
  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
  transition: 'transform 0.6s',
})

export const flashcardFrontStyle: React.CSSProperties = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
}

export const flashcardBackStyleStyle: React.CSSProperties = {
  backfaceVisibility: 'hidden',
  WebkitBackfaceVisibility: 'hidden',
  transform: 'rotateY(180deg)',
}
