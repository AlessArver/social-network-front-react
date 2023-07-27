import * as Yup from 'yup'

import { PASSWORD_FIELD_VALIDATION } from 'utils/formValidation/validatinoFields'
import { RecoverPasswordFields } from './types'

export const recoverPasswordValidationSchema = Yup.object().shape({
  [RecoverPasswordFields.password]: PASSWORD_FIELD_VALIDATION
})
