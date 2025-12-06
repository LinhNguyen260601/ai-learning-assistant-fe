import formConfig from '@/integrations/antd/form-config'
import { ConfigProvider } from 'antd'

export const AntdConfigProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return <ConfigProvider form={formConfig}>{children}</ConfigProvider>
}
