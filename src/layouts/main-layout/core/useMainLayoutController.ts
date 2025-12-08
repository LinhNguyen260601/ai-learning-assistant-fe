import { useNavigate } from '@tanstack/react-router'
import { useCallback, useEffect } from 'react'
import { useIsMobile, useToggle } from '@/hooks'
import { useAuthStore } from '@/stores'

export const useMainLayoutController = () => {
  const navigate = useNavigate()
  const isMobile = useIsMobile(1024)

  const { user, logout } = useAuthStore()
  const { value: collapsed, open, toggle } = useToggle(false)

  useEffect(() => {
    if (isMobile) open()
  }, [isMobile])

  const handleToggleSidebar = () => toggle()

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate({ to: key })
  }

  const handleSidebarOpen = () => {
    isMobile && open()
  }

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
    handleSidebarOpen,
    handleLogoutClick,
    handleProfileClick,
    handleToggleSidebar,
    handleNotificationClick,
  }
}
