import { useIsMobile, useToggle } from '@/hooks'
import { useAuthStore } from '@/stores'
import { useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect } from 'react'

export const useMainLayoutController = () => {
  const navigate = useNavigate()
  const isMobile = useIsMobile(1024)

  const { user, logout } = useAuthStore()
  const { value: collapsed, open, toggle } = useToggle(false)

  useEffect(() => {
    if (isMobile) open()
  }, [isMobile])

  const handleToggleSidebar = () => toggle()

  const handleMenuClick = () => isMobile && open()

  const handleNotificationClick = useCallback(() => {}, [])

  const handleProfileClick = useCallback(() => {}, [])

  const handleLogoutClick = () => {
    logout()
    navigate({ to: '/login', replace: true })
  }

  return {
    user,
    isMobile,
    collapsed,
    handleMenuClick,
    handleLogoutClick,
    handleProfileClick,
    handleToggleSidebar,
    handleNotificationClick,
  }
}
