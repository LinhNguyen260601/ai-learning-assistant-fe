import type { Document } from '@/types'

export interface DocumentsResponse {
  documents: Array<Document>
  count: number
}
