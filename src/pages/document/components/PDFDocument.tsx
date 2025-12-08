import { Button, Typography } from 'antd'
import { ExternalLink } from 'lucide-react'

interface PDFDocumentProps {
  title: string
  filePath: string
}

const PDFDocument = ({ title, filePath }: PDFDocumentProps) => {
  const handleOpenInNewTab = () => {
    if (filePath) window.open(filePath, '_blank')
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Document Viewer Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <Typography.Text strong className="text-base">
          Document Viewer
        </Typography.Text>
        <Button
          type="text"
          icon={<ExternalLink size={16} />}
          onClick={handleOpenInNewTab}
          className="flex items-center gap-1"
        >
          Open in new tab
        </Button>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-auto bg-gray-100 p-4">
        <div className="bg-white shadow-lg mx-auto size-full min-h-full">
          <iframe
            src={`${filePath}#toolbar=1&navpanes=0&scrollbar=1`}
            title={title}
            className="w-full border-0 h-[calc(100vh-200px)] min-h-[800px]"
          />
        </div>
      </div>
    </div>
  )
}

export default PDFDocument
