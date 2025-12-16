import { Avatar, Button, Card, Form, Input, Typography, Upload } from 'antd'
import { Mail, Upload as UploadIcon, User } from 'lucide-react'
import { EMAIL_FORM_RULES } from '@/pages/auth/login/core'
import { USERNAME_FORM_RULES } from '@/pages/auth/register/core'
import { UserInfoFormSkeleton } from '@/pages/profile/components/ProfileSkeleton'
import { useUserInfoFormController } from '@/pages/profile/controllers'
import { hasFormErrors } from '@/utils'

const UserInfoForm = () => {
  const {
    form,
    user,
    isLoading,
    isUpdatingMe,
    avatarPreview,
    onFinish,
    normalizeFile,
    handleAvatarChange,
    handleBeforeUpload,
  } = useUserInfoFormController()

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
          label="Profile Picture"
          name="profileImageFile"
          valuePropName="fileList"
          getValueFromEvent={normalizeFile}
        >
          <Upload
            accept="image/*"
            maxCount={1}
            beforeUpload={handleBeforeUpload}
            showUploadList={false}
            onChange={handleAvatarChange}
          >
            <div className="flex items-center gap-4">
              <Avatar size={64} src={avatarPreview || user?.profileImage}>
                {user?.username[0]?.toUpperCase()}
              </Avatar>
              <Button icon={<UploadIcon size={14} />}>Upload new photo</Button>
            </div>
          </Upload>
        </Form.Item>

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
