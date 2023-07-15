import { RecoverPasswordFields } from './types'

export const recoverPasswordForm = {
  [RecoverPasswordFields.password_old]: {
    name: RecoverPasswordFields.password_old,
    type: 'password',
    placeholder: 'Old password',
    errorMsg: 'Enter old password'
  },
  [RecoverPasswordFields.password_new]: {
    name: RecoverPasswordFields.password_new,
    type: 'password',
    placeholder: 'New password',
    errorMsg: 'Passwords must be compare'
  }
}
