import { PASSWORD_FORM_RULES } from '@/pages/auth/login/core'
import type { Rule } from 'antd/es/form'

export const CONFIRM_PASSWORD_FORM_RULES: Array<Rule> = [
  ...PASSWORD_FORM_RULES,
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue('newPassword') === value) {
        return Promise.resolve()
      }

      return Promise.reject(
        new Error('The two passwords that you entered do not match!'),
      )
    },
  }),
]
