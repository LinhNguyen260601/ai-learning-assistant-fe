import { EMAIL_FORM_RULES } from '@/pages/auth/login/core'
import { USERNAME_FORM_RULES } from '@/pages/auth/register/core'
import { UserInfoFormSkeleton } from '@/pages/profile/components/ProfileSkeleton'
import { useUserInfoFormController } from '@/pages/profile/controllers'
import { hasFormErrors } from '@/utils'
import { Button, Card, Form, Input, Typography } from 'antd'
import { Mail, User } from 'lucide-react'

const UserInfoForm = () => {
  const { form, user, isLoading, isUpdatingMe, onFinish } =
    useUserInfoFormController()

  if (isLoading) return <UserInfoFormSkeleton />

  return (
    <Card>
      <Typography.Title
        level={2}
        className="mb-4! text-lg! font-semibold! text-gray-900!"
      >
        User Information
      </Typography.Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={user}
      >
        <Form.Item
          label="Username"
          name="username"
          required
          rules={USERNAME_FORM_RULES}
        >
          <Input
            prefix={<User size={14} className="text-[#5d585873]" />}
            placeholder="Enter your username"
          />
        </Form.Item>
        <Form.Item label="Email" name="email" required rules={EMAIL_FORM_RULES}>
          <Input
            prefix={<Mail size={14} className="text-[#00000073]" />}
            placeholder="Enter your email"
          />
        </Form.Item>

        <div className="mt-6 flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasFormErrors(form) || isUpdatingMe}
            loading={isUpdatingMe}
          >
            {isUpdatingMe ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </Form>
    </Card>
  )
}

export default UserInfoForm
