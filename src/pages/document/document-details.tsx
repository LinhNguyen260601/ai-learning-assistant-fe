import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate, useParams, useSearch } from '@tanstack/react-router'
import { Button, Layout, Spin, Tabs, Typography } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { Suspense, lazy, useMemo } from 'react'
import type { TabsProps } from 'antd'
import type { Document } from '@/types'
import { documentsService } from '@/services'
import {
  AIActionSkeleton,
  FlashCardLoading,
  PDFDocument,
} from '@/pages/document/components'
import { QUERY_KEY } from '@/constants'
import { cn } from '@/utils'

const Chat = lazy(() => import('@/pages/document/components/Chat'))
const AIAction = lazy(() => import('@/pages/document/components/AIAction'))
const FlashCard = lazy(() => import('@/pages/document/components/FlashCard'))

const DocumentDetails = () => {
  const navigate = useNavigate()
  const { id } = useParams({ from: '/_authenticated/documents/$id' })
  const search = useSearch({ from: '/_authenticated/documents/$id' })
  const tab = (search as { tab?: string }).tab || 'content'

  const {
    data: document,
    isLoading,
    isError,
  } = useQuery<Document>({
    queryKey: [QUERY_KEY.DOCUMENT, id],
    queryFn: () => documentsService.getDocument(id),
    enabled: !!id,
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <Spin size="large" />
      </div>
    )
  }

  if (isError || !document) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <Typography.Title level={3}>Document not found</Typography.Title>
        <Link to="/documents">
          <Button type="primary">Back to Documents</Button>
        </Link>
      </div>
    )
  }

  const tabItems: TabsProps['items'] = useMemo(
    () => [
      {
        key: 'content',
        label: 'Content',
        children: (
          <PDFDocument title={document.title} filePath={document.filePath} />
        ),
      },
      {
        key: 'chat',
        label: 'Chat',
        children: (
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-[calc(100vh-237px)]">
                <Spin size="large" />
              </div>
            }
          >
            <Chat />
          </Suspense>
        ),
      },
      {
        key: 'ai-actions',
        label: 'AI Actions',
        children: (
          <Suspense fallback={<AIActionSkeleton />}>
            <AIAction />
          </Suspense>
        ),
      },
      {
        key: 'flashcards',
        label: 'Flashcards',
        children: (
          <Suspense fallback={<FlashCardLoading />}>
            <FlashCard />
          </Suspense>
        ),
      },
      {
        key: 'quiz',
        label: 'Quiz',
        children: (
          <div className="flex-1 flex items-center justify-center">
            <Typography.Text className="text-gray-500">
              Quiz feature coming soon
            </Typography.Text>
          </div>
        ),
      },
    ],
    [document],
  )

  const handleTabChange = (key: string) => {
    navigate({ to: `/documents/${id}?tab=${key}` })
  }

  return (
    <main className="h-[calc(100vh-64px)] flex flex-col">
      {/* Header Section */}
      <Layout>
        <header
          className={cn('px-6 py-4 shrink-0 h-full', {
            'border-b border-gray-200': tab === 'content',
          })}
        >
          <div className="mb-4">
            <Link to="/documents">
              <Button
                type="text"
                icon={<ArrowLeft size={16} />}
                className="p-0! h-auto! mb-2!"
              >
                Back to Documents
              </Button>
            </Link>
            <Typography.Title level={1} className="mb-0! text-2xl!">
              {document.title}
            </Typography.Title>
          </div>

          {/* Tabs */}
          <Tabs
            activeKey={tab}
            onChange={handleTabChange}
            items={tabItems}
            className="border-none! flex-1 flex flex-col [&_.ant-tabs-nav]:shrink-0 [&_.ant-tabs-tab]:min-w-[110px] [&_.ant-tabs-tab-btn]:min-w-[110px] [&_.ant-tabs-tab-btn]:text-center [&_.ant-tabs-tab-btn]:px-3 [&_.ant-tabs-content-holder]:flex-1 [&_.ant-tabs-content-holder]:min-h-0 [&_.ant-tabs-content]:h-full [&_.ant-tabs-tabpane]:h-full"
            animated
          />
        </header>
      </Layout>
    </main>
  )
}

export default DocumentDetails
