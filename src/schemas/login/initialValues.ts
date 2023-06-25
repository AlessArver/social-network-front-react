import { loginForm } from './form'

const { email, password } = loginForm

export const loginInitialValues = {
  [email.name]: '',
  [password.name]: ''
}
