import { Button, Card, Form, Skeleton, Typography } from 'antd'

export const UserInfoFormSkeleton = () => {
  return (
    <Card>
      <Typography.Title
        level={2}
        className="mb-4! text-lg! font-semibold! text-gray-900!"
      >
        User Information
      </Typography.Title>
      <Form layout="vertical">
        <Form.Item label="Username" required>
          <Skeleton.Input
            active
            size="large"
            className="w-full!"
            classNames={{ content: 'w-full!' }}
          />
        </Form.Item>
        <Form.Item label="Email" required>
          <Skeleton.Input
            active
            size="large"
            className="w-full!"
            classNames={{ content: 'w-full!' }}
          />
        </Form.Item>
      </Form>

      <div className="mt-6 flex justify-end">
        <Button type="primary" htmlType="submit">
          Save Changes
        </Button>
      </div>
    </Card>
  )
}

export const ChangePasswordFormSkeleton = () => {
  return (
    <Card>
      <Typography.Title
        level={2}
        className="mb-4! text-lg! font-semibold! text-gray-900!"
      >
        Change Password
      </Typography.Title>
      <Form layout="vertical">
        <Form.Item label="Current Password" required>
          <Skeleton.Input
            active
            size="large"
            className="w-full!"
            classNames={{ content: 'w-full!' }}
          />
        </Form.Item>
        <Form.Item label="New Password" required>
          <Skeleton.Input
            active
            size="large"
            className="w-full!"
            classNames={{ content: 'w-full!' }}
          />
        </Form.Item>
        <Form.Item label="Confirm Password" required>
          <Skeleton.Input
            active
            size="large"
            className="w-full!"
            classNames={{ content: 'w-full!' }}
          />
        </Form.Item>
      </Form>

      <div className="mt-6 flex justify-end">
        <Button type="primary" htmlType="submit">
          Change Password
        </Button>
      </div>
    </Card>
  )
}

const ProfileSkeleton = () => {
  return (
    <section className="p-6">
      <Typography.Title
        level={1}
        className="mb-10! text-2xl! font-semibold! text-gray-900!"
      >
        Profile Settings
      </Typography.Title>

      <UserInfoFormSkeleton />
      <ChangePasswordFormSkeleton />
    </section>
  )
}

export default ProfileSkeleton
