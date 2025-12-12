import { Link } from '@tanstack/react-router'
import { Button, Result } from 'antd'

const QuizTakingErrorComponent = ({ documentId }: { documentId: string }) => {
  return (
    <Result
      status="404"
      title="Quiz Not Found"
      subTitle="Sorry, the quiz you are looking for does not exist."
      className="mt-[10%]"
      extra={
        <Link to="/documents/$id" params={{ id: documentId }}>
          <Button type="primary">Back to Document</Button>
        </Link>
      }
    />
  )
}

export default QuizTakingErrorComponent
