import * as Yup from 'yup'

import {
  EMAIL_FIELD_VALIDATION,
  PASSWORD_FIELD_VALIDATION,
  REQUIRED_FIELD_VALIDATION
} from 'utils/formValidation/validatinoFields'

import { registerForm } from './form'

const { first_name, last_name, email, password } = registerForm

export const registerValidationSchema = Yup.object().shape({
  [first_name.name]: REQUIRED_FIELD_VALIDATION,
  [last_name.name]: REQUIRED_FIELD_VALIDATION,
  [email.name]: EMAIL_FIELD_VALIDATION,
  [password.name]: PASSWORD_FIELD_VALIDATION
})
