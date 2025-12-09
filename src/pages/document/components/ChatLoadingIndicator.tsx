import { Sparkles } from 'lucide-react'
import {
  firstDotStyle,
  secondDotStyle,
  thirdDotStyle,
} from '@/pages/document/core'

const ChatLoadingIndicator = () => (
  <div className="flex items-start gap-4 mt-6">
    <div className="shrink-0">
      <div className="size-8 rounded-full bg-(--ant-color-primary) flex items-center justify-center">
        <Sparkles size={16} className="text-white" />
      </div>
    </div>
    <div className="bg-white rounded-2xl px-5 py-4 shadow-sm">
      <div className="flex items-center gap-1.5">
        <span
          className="size-2 rounded-full bg-gray-400"
          style={firstDotStyle}
        />
        <span
          className="size-2 rounded-full bg-gray-400"
          style={secondDotStyle}
        />
        <span
          className="size-2 rounded-full bg-gray-400"
          style={thirdDotStyle}
        />
      </div>
      <style>{`
@keyframes bounceHigher {
0%, 100% {
  transform: translateY(0);
}
50% {
  transform: translateY(-8px);
}
}
`}</style>
    </div>
  </div>
)

export default ChatLoadingIndicator
