import { RecoverPasswordFields } from './types'

export const recoverPasswordForm = {
  [RecoverPasswordFields.password]: {
    name: RecoverPasswordFields.password,
    type: 'password',
    placeholder: 'Password',
    errorMsg: 'Enter password'
  }
}
