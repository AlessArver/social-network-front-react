import * as Yup from 'yup'

import { PASSWORD_FIELD_VALIDATION } from 'utils/formValidation/validatinoFields'
import { RecoverPasswordFields } from './types'

export const recoverPasswordValidationSchema = Yup.object().shape({
  [RecoverPasswordFields.password_old]: PASSWORD_FIELD_VALIDATION,
  [RecoverPasswordFields.password_new]: PASSWORD_FIELD_VALIDATION.oneOf(
    [Yup.ref(RecoverPasswordFields.password_old), null],
    'Passwords must match'
  )
})
