import { PASSWORD_FORM_RULES } from '@/pages/auth/login/core'
import { useChangePasswordFormController } from '@/pages/profile/controllers'
import { CONFIRM_PASSWORD_FORM_RULES } from '@/pages/profile/core'
import { hasFormErrors } from '@/utils'
import { Button, Card, Form, Input, Typography } from 'antd'

const ChangePasswordForm = () => {
  const { form, isChangingPassword, onFinish } =
    useChangePasswordFormController()

  return (
    <Card className="mt-6!">
      <Typography.Title
        level={2}
        className="mb-4! text-lg! font-semibold! text-gray-900!"
      >
        Change Password
      </Typography.Title>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="currentPassword"
          required
          label="Current Password"
          rules={PASSWORD_FORM_RULES}
        >
          <Input.Password placeholder="********" />
        </Form.Item>
        <Form.Item
          name="newPassword"
          required
          label="New Password"
          rules={PASSWORD_FORM_RULES}
        >
          <Input.Password placeholder="********" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          required
          label="Confirm Password"
          rules={CONFIRM_PASSWORD_FORM_RULES}
        >
          <Input.Password placeholder="********" />
        </Form.Item>

        <div className="mt-6 flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            disabled={hasFormErrors(form) || isChangingPassword}
            loading={isChangingPassword}
          >
            {isChangingPassword ? 'Changing Password...' : 'Change Password'}
          </Button>
        </div>
      </Form>
    </Card>
  )
}

export default ChangePasswordForm
