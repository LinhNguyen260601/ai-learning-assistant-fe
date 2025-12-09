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
