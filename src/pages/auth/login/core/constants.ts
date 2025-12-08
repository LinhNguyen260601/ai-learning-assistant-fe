import type { Rule } from 'antd/es/form'

export const USER_FORM_RULES: Array<Rule> = [
  { required: true, message: 'Please enter your email' },
  { type: 'email', message: 'Please enter a valid email' },
]

export const PASSWORD_FORM_RULES: Array<Rule> = [
  { required: true, message: 'Please enter your password' },
  { min: 6, message: 'Password must be at least 6 characters long' },
]
