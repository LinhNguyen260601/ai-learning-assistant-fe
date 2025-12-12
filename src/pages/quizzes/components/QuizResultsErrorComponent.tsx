import { Link } from '@tanstack/react-router'
import { Button, Result } from 'antd'

const QuizResultsErrorComponent = ({ documentId }: { documentId: string }) => (
  <Result
    status="error"
    title="Failed to load quiz results"
    subTitle="Please try again later"
    extra={
      <Link
        to="/documents/$id"
        params={{ id: documentId }}
        search={{ tab: 'quiz' }}
      >
        <Button type="primary">Back to Documents</Button>
      </Link>
    }
  />
)

export default QuizResultsErrorComponent
