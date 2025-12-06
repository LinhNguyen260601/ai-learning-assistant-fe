import { Sidebar, TopBar } from '@/layouts/main-layout/components'
import { useMainLayoutController } from '@/layouts/main-layout/core'
import { cn } from '@/utils'
import { Outlet } from '@tanstack/react-router'
import { Layout } from 'antd'
import { Content } from 'antd/es/layout/layout'

const MainLayout = () => {
  const {
    isMobile,
    collapsed,
    handleMenuClick,
    handleLogoutClick,
    handleProfileClick,
    handleToggleSidebar,
    handleNotificationClick,
  } = useMainLayoutController()

  return (
    <Layout className="h-screen">
      {/* Mobile overlay */}
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-[100] transition-opacity"
          onClick={handleMenuClick}
          aria-hidden="true"
        />
      )}

      <Sidebar
        collapsed={collapsed}
        isMobile={isMobile}
        onToggle={handleToggleSidebar}
        onMenuClick={handleMenuClick}
      />
      <Layout className={cn(isMobile && !collapsed && 'ml-0')}>
        <TopBar
          collapsed={collapsed}
          onToggle={handleToggleSidebar}
          onLogoutClick={handleLogoutClick}
          onProfileClick={handleProfileClick}
          onNotificationClick={handleNotificationClick}
        />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}

export default MainLayout
