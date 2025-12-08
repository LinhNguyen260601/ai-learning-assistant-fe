export enum DocumentStatus {
  PROCESSING = 'processing',
  READY = 'ready',
  FAILED = 'failed',
}

export interface DocumentChunk {
  content: string
  pageNumber: number
  chunkIndex: number
  _id: string
}

export interface Document {
  _id: string
  userId: string
  title: string
  fileName: string
  filePath: string
  fileSize: number
  status: DocumentStatus
  lastAccessed: string
  flashcardCount: number
  quizCount: number
  uploadDate: string
  extractedText?: string
  chunks?: Array<DocumentChunk>
}
