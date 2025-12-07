import { Link } from '@tanstack/react-router'
import { Button, Result } from 'antd'

const NotFound = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    className="min-h-screen flex items-center justify-center flex-col"
    extra={
      <Link to="/dashboard">
        <Button type="primary">Back to the Dashboard</Button>
      </Link>
    }
  />
)

export default NotFound
