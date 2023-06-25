import * as Yup from 'yup'
import { loginForm } from './form'

import { EMAIL_FIELD_VALIDATION, REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validatinoFields'

const { email, password } = loginForm

export const loginValidationSchema = Yup.object().shape({
  [email.name]: EMAIL_FIELD_VALIDATION,
  [password.name]: REQUIRED_FIELD_VALIDATION
})
