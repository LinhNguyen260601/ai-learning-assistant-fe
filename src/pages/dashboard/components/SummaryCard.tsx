import { Card, Typography } from 'antd'
import { cn } from '@/utils'

const { Title, Text } = Typography

interface SummaryCardProps {
  title: string
  value: number
  iconBgColor: string
  icon: React.ReactNode
}

const SummaryCard = ({ title, value, icon, iconBgColor }: SummaryCardProps) => {
  return (
    <Card className="shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <div className="flex flex-col">
          <Text className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
            {title}
          </Text>
          <Title
            level={2}
            className="mb-0! text-3xl! font-bold! text-gray-900!"
          >
            {value}
          </Title>
        </div>
        <div
          className={cn(
            'absolute top-0 right-0 w-12 h-12 rounded-lg flex items-center justify-center',
            iconBgColor,
          )}
        >
          {icon}
        </div>
      </div>
    </Card>
  )
}

export default SummaryCard
