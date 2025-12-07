import type { Document } from '@/types'

export interface DocumentsResponse {
  documents: Document[]
  count: number
}
