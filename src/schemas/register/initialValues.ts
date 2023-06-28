import { registerForm } from './form'
import { RegisterFields } from './types'

export const registerInitialValues = {
  [RegisterFields.first_name]: '',
  [RegisterFields.last_name]: '',
  [RegisterFields.email]: '',
  [RegisterFields.password]: ''
}
