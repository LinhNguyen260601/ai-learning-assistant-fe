import { Button, Modal } from 'antd'
import ReactMarkdown from 'react-markdown'

interface SummaryModalProps {
  open: boolean
  summary: string
  loading: boolean
  onCancel: () => void
}

const SummaryModal = ({
  open,
  loading,
  onCancel,
  summary,
}: SummaryModalProps) => {
  return (
    <Modal
      title="Generated Summary"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="close" onClick={onCancel}>
          Close
        </Button>,
      ]}
      loading={loading}
      width={1000}
    >
      <div className="prose prose-sm max-w-none [&_p]:my-2 [&_ul]:my-2 [&_ol]:my-2 [&_li]:my-1 [&_strong]:font-semibold max-h-[700px] overflow-y-auto">
        <ReactMarkdown children={summary} />
      </div>
    </Modal>
  )
}

export default SummaryModal
