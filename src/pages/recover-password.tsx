import { useFormik } from 'formik'

import { AuthLayout } from 'layouts/AuthLayout'

import { Input } from 'components/ui/Input'

import s from 'layouts/AuthLayout/index.module.sass'

import { recoverPasswordForm } from 'schemas/recoverPassowrd/form'
import { recoverPasswordInitialValues } from 'schemas/recoverPassowrd/initialValues'
import { recoverPasswordValidationSchema } from 'schemas/recoverPassowrd/validationSchema'

export default function ResetPassword() {
  const formFields = recoverPasswordForm

  const formik = useFormik({
    initialValues: recoverPasswordInitialValues,
    validationSchema: recoverPasswordValidationSchema,
    onSubmit: (values, { resetForm }) => {}
  })

  return (
    <div>
      <AuthLayout title='Reset Password' loading={false} onSubmit={formik.handleSubmit}>
        {Object.values(formFields).map(({ name, placeholder, type }) => (
          <Input
            key={name}
            onChange={formik.handleChange}
            name={name}
            value={formik.values[name]}
            placeholder={placeholder}
            fullWidth
            type={type}
            className={s.authLayout__input}
            touched={formik.touched[name]}
            danger={!!formik.errors[name]}
            smallText={formik.errors[name]}
          />
        ))}
      </AuthLayout>
    </div>
  )
}
