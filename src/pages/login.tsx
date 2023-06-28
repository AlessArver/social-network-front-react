import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'
import Router from 'next/router'
import Cookie from 'js-cookie'

import { isAuthVar } from 'apollo/variables/user'
import { LOGIN } from 'apollo/mutations/user/user'

import { cookieFields } from 'constants/index'
import { PROFILE_PAGE } from 'constants/routes'

import { useLogin } from 'apollo/mutations/user/hooks/useLogin'

import { AuthLayout, AuthLayoutType } from 'layouts/AuthLayout'

import { Input } from 'components/ui/Input'

import s from 'layouts/AuthLayout/index.module.sass'

import { loginForm } from 'schemas/login/form'
import { loginInitialValues } from 'schemas/login/initialValues'
import { loginValidationSchema } from 'schemas/login/validationSchema'

export default function Login() {
  const { handleLogin, loading } = useLogin()
  const { email, password } = loginForm

  const formik = useFormik({
    initialValues: loginInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values, { resetForm }) => {
      handleLogin({ ...values }, res => {
        if (res) {
          Cookie.set(cookieFields.authToken, res)
          isAuthVar(true)
          Router.push(PROFILE_PAGE)
        }
        resetForm()
      })
    }
  })

  return (
    <div>
      <AuthLayout loading={loading} onSubmit={formik.handleSubmit} type={AuthLayoutType.login}>
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
        <Input
          onChange={formik.handleChange}
          name={password.name}
          value={formik.values[password.name]}
          placeholder={password.placeholder}
          type={password.type}
          fullWidth
          className={s.authLayout__input}
          touched={formik.touched[password.name]}
          danger={!!formik.errors[password.name]}
          smallText={formik.errors[password.name]}
        />
      </AuthLayout>
    </div>
  )
}
