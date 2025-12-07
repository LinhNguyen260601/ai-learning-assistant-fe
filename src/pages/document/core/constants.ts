import type { Rule } from 'antd/es/form'

export const MAX_DOCUMENT_TITLE_LENGTH = 100
export const MAX_DOCUMENT_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const DOCUMENT_TITLE_RULES: Rule[] = [
  { required: true, message: 'Please enter a document title' },
  {
    max: MAX_DOCUMENT_TITLE_LENGTH,
    message: `Title must be less than ${MAX_DOCUMENT_TITLE_LENGTH} characters`,
  },
]

export const DOCUMENT_FILE_RULES: Rule[] = [
  { required: true, message: 'Please upload a PDF file' },
  {
    validator: (_, fileList) => {
      const file = fileList[0]
      if (file) {
        const maxSize = MAX_DOCUMENT_FILE_SIZE
        if (file.size > maxSize) {
          return Promise.reject(
            new Error(
              `File size must be less than ${MAX_DOCUMENT_FILE_SIZE}MB`,
            ),
          )
        }

        if (file.type !== 'application/pdf') {
          return Promise.reject(new Error('Only PDF files are allowed'))
        }
      }
      return Promise.resolve()
    },
  },
]
