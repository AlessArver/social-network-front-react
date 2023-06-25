import { registerForm } from './form'

const { first_name, last_name, email, password } = registerForm

export const registerInitialValues = {
  [first_name.name]: '',
  [last_name.name]: '',
  [email.name]: '',
  [password.name]: ''
}
