import { ChangePasswordForm, UserInfoForm } from '@/pages/profile/components'
import { Typography } from 'antd'

const Profile = () => {
  return (
    <section className="p-6">
      <Typography.Title
        level={1}
        className="mb-10! text-2xl! font-semibold! text-gray-900!"
      >
        Profile Settings
      </Typography.Title>

      <UserInfoForm />
      <ChangePasswordForm />
    </section>
  )
}

export default Profile
