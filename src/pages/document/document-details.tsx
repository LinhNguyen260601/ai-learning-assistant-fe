import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import { Button, Spin, Tabs, Typography } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { useState } from 'react'
import { documentsService } from '@/services'
import { PDFDocument } from '@/pages/document/components'
import { QUERY_KEY } from '@/constants'

const DocumentDetails = () => {
  const [activeTab, setActiveTab] = useState('content')
  const { id } = useParams({ from: '/_authenticated/documents/$id' })

  const {
    data: document,
    isLoading,
    isError,
  } = useQuery({
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

  const tabItems = [
    {
      key: 'content',
      label: 'Content',
    },
    {
      key: 'chat',
      label: 'Chat',
    },
    {
      key: 'ai-actions',
      label: (
        <span className="flex flex-col items-center leading-tight px-2 whitespace-nowrap">
          <span className="whitespace-nowrap">AI</span>
          <span className="whitespace-nowrap">Actions</span>
        </span>
      ),
    },
    {
      key: 'flashcards',
      label: 'Flashcards',
    },
    {
      key: 'quiz',
      label: 'Quiz',
    },
  ]

  const renderContentBasedOnTab = {
    content: (
      <PDFDocument title={document.title} filePath={document.filePath} />
    ),
    chat: (
      <div className="flex-1 flex items-center justify-center">
        <Typography.Text className="text-gray-500">
          Chat feature coming soon
        </Typography.Text>
      </div>
    ),
    'ai-actions': (
      <div className="flex-1 flex items-center justify-center">
        <Typography.Text className="text-gray-500">
          AI Actions feature coming soon
        </Typography.Text>
      </div>
    ),
    flashcard: (
      <div className="flex-1 flex items-center justify-center">
        <Typography.Text className="text-gray-500">
          Flashcards feature coming soon
        </Typography.Text>
      </div>
    ),
    quiz: (
      <div className="flex-1 flex items-center justify-center">
        <Typography.Text className="text-gray-500">
          Quiz feature coming soon
        </Typography.Text>
      </div>
    ),
  }[activeTab]

  return (
    <main className="h-[calc(100vh-64px)] flex flex-col bg-white">
      {/* Header Section */}
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mb-4">
          <Link to="/documents">
            <Button
              type="text"
              icon={<ArrowLeft size={20} />}
              className="p-0! h-auto! mb-2!"
            >
              Back to Documents
            </Button>
          </Link>
          <Typography.Title level={1} className="mb-0! text-2xl! font-bold!">
            {document.title}
          </Typography.Title>
        </div>

        {/* Tabs */}
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          className="border-none! [&_.ant-tabs-tab]:min-w-[110px] [&_.ant-tabs-tab-btn]:min-w-[110px] [&_.ant-tabs-tab-btn]:text-center [&_.ant-tabs-tab-btn]:px-3"
          animated
        />
      </header>

      {/* Content Section */}
      <section className="flex-1 overflow-hidden flex flex-col">
        {renderContentBasedOnTab}
      </section>
    </main>
  )
}

export default DocumentDetails
