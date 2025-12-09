import { Button, Modal } from 'antd'
import ReactMarkdown from 'react-markdown'

interface ExplainConceptModalProps {
  open: boolean
  onCancel: () => void
  loading: boolean
  concept: string
  explanation: string
}
const ExplainConceptModal = ({
  open,
  onCancel,
  loading,
  concept,
  explanation,
}: ExplainConceptModalProps) => {
  return (
    <Modal
      title={`Explanation of "${concept}"`}
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
        <ReactMarkdown children={explanation} />
      </div>
    </Modal>
  )
}

export default ExplainConceptModal
