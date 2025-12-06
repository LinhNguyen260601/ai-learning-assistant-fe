import { cn } from '@/utils'
import { useLocation } from '@tanstack/react-router'
import { Button, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import type { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { BookOpen, FileText, LayoutDashboard, UserRound, X } from 'lucide-react'

interface SidebarProps {
  collapsed: boolean
  isMobile: boolean
  onToggle: () => void
  onMenuClick: () => void
}

export const MENU_ITEMS: ItemType<MenuItemType>[] = [
  {
    key: '/dashboard',
    icon: <LayoutDashboard />,
    label: 'Dashboard',
  },
  {
    key: '/documents',
    icon: <FileText />,
    label: 'Documents',
  },
  {
    key: '/flashcards',
    icon: <BookOpen />,
    label: 'Flashcards',
  },
  {
    key: '/profile',
    icon: <UserRound />,
    label: 'Profile',
  },
]

const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  isMobile,
  onToggle,
  onMenuClick,
}) => {
  const currentPath = useLocation().pathname

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth={isMobile ? 0 : 80}
      width={256}
      className={cn(
        'h-screen',
        isMobile && 'fixed! left-0! top-0! z-[101] transition-transform!',
        isMobile && collapsed && '-translate-x-full',
      )}
    >
      <header className="border-b border-r border-gray-200 bg-white h-16 flex items-center justify-between px-4">
        <figure className={cn('w-16', !isMobile && 'mx-auto')}>
          <img src="/logo.webp" alt="logo" className="size-full object-cover" />
        </figure>

        {isMobile && (
          <Button
            type="text"
            icon={<X size={20} className="translate-y-1" />}
            onClick={onToggle}
            className="flex items-center justify-center"
            aria-label="Close sidebar"
          />
        )}
      </header>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={[currentPath]}
        selectedKeys={[currentPath]}
        className="h-full pt-4!"
        items={MENU_ITEMS}
        onClick={onMenuClick}
      />
    </Sider>
  )
}

export default Sidebar
