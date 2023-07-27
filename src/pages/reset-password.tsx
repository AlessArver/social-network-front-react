import { useFormik } from 'formik'

import { useResetPassword } from 'apollo/mutations/mail/hooks/useResetPassword'

import { useToggle } from 'hooks/useToggle'

import { AuthLayout } from 'layouts/AuthLayout'

import { Input } from 'components/ui/Input'
import { ResetPasswordSuccess } from 'components/ResetPasswordSuccess'

import s from 'layouts/AuthLayout/index.module.sass'

import { resetPasswordInitialValues } from 'schemas/resetPassword/initialValues'
import { resetPasswordValidationSchema } from 'schemas/resetPassword/validationSchema'
import { resetPasswordForm } from 'schemas/resetPassword/form'

export default function ResetPassword() {
  const { email } = resetPasswordForm
  const { handleResetPassword, loading } = useResetPassword()
  const submitted = useToggle()

  const formik = useFormik({
    initialValues: resetPasswordInitialValues,
    validationSchema: resetPasswordValidationSchema,
    onSubmit: values => {
      handleResetPassword(values.email, () => {
        submitted.set()
      })
    }
  })

  return (
    <div>
      {submitted.value ? (
        <ResetPasswordSuccess email={formik.values[email.name]} />
      ) : (
        <AuthLayout title='Reset Password' loading={loading} onSubmit={formik.handleSubmit}>
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
      )}
    </div>
  )
}
