import * as Yup from 'yup'

import {
  EMAIL_FIELD_VALIDATION,
  PASSWORD_FIELD_VALIDATION,
  REQUIRED_FIELD_VALIDATION
} from 'utils/formValidation/validatinoFields'

import { RegisterFields } from './types'

export const registerValidationSchema = Yup.object().shape({
  [RegisterFields.first_name]: REQUIRED_FIELD_VALIDATION,
  [RegisterFields.last_name]: REQUIRED_FIELD_VALIDATION,
  [RegisterFields.email]: EMAIL_FIELD_VALIDATION,
  [RegisterFields.password]: PASSWORD_FIELD_VALIDATION
})
