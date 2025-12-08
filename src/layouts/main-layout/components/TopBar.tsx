import { Avatar, Badge, Button, Divider, Dropdown, Flex } from 'antd'
import { Header } from 'antd/es/layout/layout'
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Bell,
  LogOut,
  UserRound,
} from 'lucide-react'
import type { MenuProps } from 'antd'
import { useAuthStore } from '@/stores'

interface TopBarProps {
  collapsed: boolean
  onToggle: () => void
  onLogoutClick: () => void
  onProfileClick: () => void
  onNotificationClick: () => void
}

const TopBar: React.FC<TopBarProps> = ({
  collapsed,
  onToggle,
  onLogoutClick,
  onProfileClick,
  onNotificationClick,
}) => {
  const user = useAuthStore().user

  const menuProps: MenuProps = {
    items: [
      {
        key: 'profile',
        icon: <UserRound size={16} />,
        label: 'Profile',
        onClick: onProfileClick,
      },
      {
        type: 'divider',
      },
      {
        key: 'logout',
        icon: <LogOut size={16} />,
        label: 'Logout',
        danger: true,
        onClick: onLogoutClick,
      },
    ],
  }

  return (
    <Header className="bg-white! px-0! border-b border-gray-200 flex justify-between items-center">
      <Button
        type="text"
        icon={
          collapsed ? (
            <ArrowRightToLine size={20} className="pt-1" />
          ) : (
            <ArrowLeftToLine size={20} className="pt-1" />
          )
        }
        onClick={onToggle}
        className="size-16!"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      />

      <Flex gap={16} align="center" className="w-60">
        <Button
          type="text"
          icon={
            <Badge dot>
              <Bell size={20} className=" translate-y-1" />
            </Badge>
          }
          onClick={onNotificationClick}
          className="flex items-center justify-center"
          aria-label="Notifications"
        />

        <Divider orientation="vertical" className="h-8!" />

        <Dropdown menu={menuProps}>
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="User menu"
          >
            <Avatar
              src={user?.profileImage}
              icon={!user?.profileImage && <UserRound size={20} />}
              alt={user?.username || 'User'}
              className="border border-gray-200"
            />
            <Flex vertical gap={2}>
              <span className="text-sm font-medium text-gray-700 text-left">
                {user?.username || 'User'}
              </span>
              <span className="text-xs font-medium text-gray-500">
                {user?.email || ''}
              </span>
            </Flex>
          </button>
        </Dropdown>
      </Flex>
    </Header>
  )
}

export default TopBar
