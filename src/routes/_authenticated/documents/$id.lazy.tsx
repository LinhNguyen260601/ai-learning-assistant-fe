import { createLazyFileRoute } from '@tanstack/react-router'
import { Spin } from 'antd'
import { DocumentDetails } from '@/pages'

export const Route = createLazyFileRoute('/_authenticated/documents/$id')({
  component: DocumentDetails,
  pendingComponent: () => (
    <div className="flex items-center justify-center h-[calc(100vh-64px)]">
      <Spin size="large" />
    </div>
  ),
})
