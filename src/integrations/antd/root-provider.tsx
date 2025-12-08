import { ConfigProvider } from 'antd'
import formConfig from '@/integrations/antd/form-config'

export const AntdConfigProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <ConfigProvider form={formConfig}>{children}</ConfigProvider>
}
