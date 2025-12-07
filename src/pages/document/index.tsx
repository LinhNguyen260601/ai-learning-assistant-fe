import { QUERY_KEY } from '@/constants'
import { useToggle } from '@/hooks'
import {
  DocumentCard,
  DocumentCardSkeleton,
  UploadDocumentModal,
} from '@/pages/document/components'
import type { DocumentsResponse } from '@/pages/document/core'
import { documentsService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Button, Empty, Typography } from 'antd'
import { Plus } from 'lucide-react'

const { Title, Text } = Typography

const Document = () => {
  const navigate = useNavigate()

  const {
    data: documentsResponse,
    isLoading: isLoadingDocumentsResponse,
    isRefetching: isRefetchingDocumentsResponse,
  } = useQuery<DocumentsResponse>({
    queryKey: [QUERY_KEY.DOCUMENTS],
    queryFn: documentsService.getDocuments,
    refetchOnMount: (query) => !query.state.data,
  })

  const documents = documentsResponse?.documents || []

  const { value: isUploadModalOpen, open, close } = useToggle(false)

  const handleCloseUploadModal = () => {
    close()
    navigate({ to: '/documents' })
  }

  if (isLoadingDocumentsResponse || isRefetchingDocumentsResponse) {
    return <DocumentCardSkeleton />
  }

  return (
    <main className="p-6">
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <Title
            level={1}
            className="mb-2! text-2xl! font-bold! text-gray-900!"
          >
            My Documents
          </Title>
          <Text className="text-base text-gray-500">
            Manage and organize your learning materials.
          </Text>
        </div>
        <Button
          type="primary"
          size="large"
          icon={<Plus size={20} />}
          onClick={open}
        >
          Upload Document
        </Button>
      </header>

      <section>
        {documents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((document) => (
              <DocumentCard
                key={document._id}
                document={document}
                onOpen={open}
              />
            ))}
          </div>
        ) : (
          <Empty
            description="No documents yet"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
      </section>

      <UploadDocumentModal
        open={isUploadModalOpen}
        onCancel={handleCloseUploadModal}
      />
    </main>
  )
}

export default Document
