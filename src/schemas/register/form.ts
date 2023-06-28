import { RegisterFields } from './types'

export const registerForm = {
  [RegisterFields.first_name]: {
    name: RegisterFields.first_name,
    placeholder: 'First name',
    errorMsg: 'Enter first name',
    type: 'text'
  },
  [RegisterFields.last_name]: {
    name: RegisterFields.last_name,
    placeholder: 'Last name',
    errorMsg: 'Enter last name',
    type: 'text'
  },
  [RegisterFields.email]: {
    name: RegisterFields.email,
    placeholder: 'Email',
    errorMsg: 'Enter email',
    type: 'text'
  },
  [RegisterFields.password]: {
    name: RegisterFields.password,
    type: 'password',
    placeholder: '********',
    errorMsg: 'Enter password'
  }
}
