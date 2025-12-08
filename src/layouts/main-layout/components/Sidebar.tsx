import { useLocation } from '@tanstack/react-router'
import { Button, Menu } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { BookOpen, FileText, LayoutDashboard, UserRound, X } from 'lucide-react'
import isString from 'lodash/isString'
import type { ItemType, MenuItemType } from 'antd/es/menu/interface'
import { cn } from '@/utils'

interface SidebarProps {
  collapsed: boolean
  isMobile: boolean
  onToggle: () => void
  onMenuClick: ({ key }: { key: string }) => void
}

export const MENU_ITEMS: Array<ItemType<MenuItemType>> = [
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

  const getSelectedKey = (): string => {
    // First, try exact match
    const exactMatch = MENU_ITEMS.find((item) => item?.key === currentPath)
    if (exactMatch?.key && isString(exactMatch.key)) return exactMatch.key

    // Then, try prefix match (for child routes like /documents/$id)
    const prefixMatch = MENU_ITEMS.find(
      (item) =>
        item?.key &&
        isString(item.key) &&
        currentPath.startsWith(item.key + '/'),
    )
    if (prefixMatch?.key && isString(prefixMatch.key)) return prefixMatch.key
    return currentPath
  }

  const selectedKey = getSelectedKey()

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      breakpoint="lg"
      collapsedWidth={isMobile ? 0 : 80}
      width={256}
      className={cn(
        'h-[calc(100vh-64px)]',
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
        defaultSelectedKeys={[selectedKey]}
        selectedKeys={[selectedKey]}
        className="h-full pt-4!"
        items={MENU_ITEMS}
        onClick={onMenuClick}
      />
    </Sider>
  )
}

export default Sidebar
