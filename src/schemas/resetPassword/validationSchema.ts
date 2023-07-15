import * as Yup from 'yup'

import { EMAIL_FIELD_VALIDATION } from 'utils/formValidation/validatinoFields'
import { ResetPasswordFields } from './types'

export const resetPasswordValidationSchema = Yup.object().shape({
  [ResetPasswordFields.email]: EMAIL_FIELD_VALIDATION
})
