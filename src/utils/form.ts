import type { FormInstance } from 'antd'

export const hasFormErrors = (form: FormInstance) =>
  form.getFieldsError().some(({ errors }) => errors.length > 0)
