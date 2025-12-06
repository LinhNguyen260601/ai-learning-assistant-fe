import type { FormProps } from 'antd'

const RequiredMark: FormProps['requiredMark'] = (label, { required }) => {
  if (!required) return label

  return (
    <>
      {label}
      <span className="ant-required-mark ml-1">*</span>
    </>
  )
}

export default RequiredMark
