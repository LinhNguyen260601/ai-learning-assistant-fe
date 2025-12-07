export enum DocumentStatus {
  PROCESSING = 'processing',
  READY = 'ready',
  FAILED = 'failed',
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
}
