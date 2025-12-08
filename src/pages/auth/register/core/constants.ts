import type { Rule } from 'antd/es/form'

export const USERNAME_FORM_RULES: Array<Rule> = [
  { required: true, message: 'Please enter your username' },
  { min: 3, message: 'Username must be at least 3 characters long' },
]
