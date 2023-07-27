import Router, { useRouter } from 'next/router'
import { useFormik } from 'formik'

import { useRecoverPasswordAccess } from 'apollo/queries/user/hooks/useRecoverPasswordAccess'
import { useRecoverPassword } from 'apollo/mutations/user/hooks/useRecoverPassword'

import { LOGIN_PAGE } from 'constants/routes'

import { AuthLayout } from 'layouts/AuthLayout'

import { Input } from 'components/ui/Input'

import { recoverPasswordForm } from 'schemas/recoverPassword/form'
import { recoverPasswordInitialValues } from 'schemas/recoverPassword/initialValues'
import { recoverPasswordValidationSchema } from 'schemas/recoverPassword/validationSchema'

export default function RecoverPassword() {
  const router = useRouter()
  const { token } = router.query
  const { data: isRecoverPasswordAccess } = useRecoverPasswordAccess(`${token}`)
  const { recoverPassword, loading } = useRecoverPassword()
  const { password } = recoverPasswordForm

  const formik = useFormik({
    initialValues: recoverPasswordInitialValues,
    validationSchema: recoverPasswordValidationSchema,
    onSubmit: (values, { resetForm }) => {
      recoverPassword({ token: `${token}`, password: values.password }, () => {
        resetForm()
        Router.push(LOGIN_PAGE)
      })
    }
  })

  return (
    <AuthLayout title='Recover password' loading={loading} onSubmit={formik.handleSubmit}>
      <Input
        onChange={formik.handleChange}
        name={password.name}
        value={formik.values[password.name]}
        placeholder={password.placeholder}
        fullWidth
        // className={s.authLayout__input}
        touched={formik.touched[password.name]}
        danger={!!formik.errors[password.name]}
        smallText={formik.errors[password.name]}
      />
    </AuthLayout>
  )
}
