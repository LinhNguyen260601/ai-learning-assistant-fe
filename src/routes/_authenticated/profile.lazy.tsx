import { Profile } from '@/pages'
import { ProfileSkeleton } from '@/pages/profile/components'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_authenticated/profile')({
  component: Profile,
  pendingComponent: ProfileSkeleton,
})
