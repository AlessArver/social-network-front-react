import { useFormik } from 'formik'

import { AuthLayout } from 'layouts/AuthLayout'

import { Input } from 'components/ui/Input'

import s from 'layouts/AuthLayout/index.module.sass'

import { resetPasswordInitialValues } from 'schemas/resetPassword/initialValues'
import { resetPasswordValidationSchema } from 'schemas/resetPassword/validationSchema'
import { resetPasswordForm } from 'schemas/resetPassword/form'

export default function ResetPassword() {
  const { email } = resetPasswordForm

  const formik = useFormik({
    initialValues: resetPasswordInitialValues,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: (values, { resetForm }) => {}
  })

  return (
    <div>
      <AuthLayout title='Reset Password' loading={false} onSubmit={formik.handleSubmit}>
        <Input
          onChange={formik.handleChange}
          name={email.name}
          value={formik.values[email.name]}
          placeholder={email.placeholder}
          fullWidth
          className={s.authLayout__input}
          touched={formik.touched[email.name]}
          danger={!!formik.errors[email.name]}
          smallText={formik.errors[email.name]}
        />
      </AuthLayout>
    </div>
  )
}
