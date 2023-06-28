import { LoginFields } from './types'

export const loginForm = {
  [LoginFields.email]: {
    name: LoginFields.email,
    placeholder: 'Email',
    errorMsg: 'Enter email'
  },
  [LoginFields.password]: {
    name: LoginFields.password,
    type: 'password',
    placeholder: '********',
    errorMsg: 'Enter password'
  }
}
