import * as Yup from 'yup'
import { FIELD_REQUIRED_ERROR, FIELD_MIN_LENGTH_ERROR, FIELD_EMAIL_ERROR } from './validationErrors'

export const REQUIRED_FIELD_VALIDATION = Yup.string().required(FIELD_REQUIRED_ERROR).trim(FIELD_REQUIRED_ERROR)

export const PASSWORD_FIELD_VALIDATION = Yup.string()
  .required(FIELD_REQUIRED_ERROR)
  .trim(FIELD_REQUIRED_ERROR)
  .test('Password length', FIELD_MIN_LENGTH_ERROR.replace('[NUMBER]', '8'), val => !!val && val.length >= 6)

export const EMAIL_FIELD_VALIDATION = REQUIRED_FIELD_VALIDATION.email(FIELD_EMAIL_ERROR)
