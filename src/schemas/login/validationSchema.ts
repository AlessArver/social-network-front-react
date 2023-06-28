import * as Yup from 'yup'

import { EMAIL_FIELD_VALIDATION, REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validatinoFields'
import { LoginFields } from './types'

export const loginValidationSchema = Yup.object().shape({
  [LoginFields.email]: EMAIL_FIELD_VALIDATION,
  [LoginFields.password]: REQUIRED_FIELD_VALIDATION
})
