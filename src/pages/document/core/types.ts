import type { Document } from '@/types'

export type MessageRole = 'user' | 'assistant'

export interface DocumentsResponse {
  documents: Array<Document>
  count: number
}

export interface ChatHistoryResponse {
  role: MessageRole
  content: string
  relevantChunks: Array<number>
  _id: string
  timestamp: string
}

export interface Message {
  role: MessageRole
  relevantChunks?: Array<number>
  content: string
  timestamp?: string
}

export interface ChatResponse {
  question: string
  answer: string
  relevantChunks: Array<number>
  chatHistoryId: string
}
