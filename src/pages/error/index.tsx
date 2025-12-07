import { Link } from '@tanstack/react-router'
import { Button, Result } from 'antd'

const Error = () => (
  <Result
    status="500"
    title="500"
    subTitle="Sorry, something went wrong."
    className="mt-14"
    extra={
      <Link to="/dashboard">
        <Button type="primary">Back to the Dashboard</Button>
      </Link>
    }
  />
)

export default Error
