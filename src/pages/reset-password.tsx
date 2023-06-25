import { HTMLInputTypeAttribute, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, useReactiveVar } from '@apollo/client'
import Router from 'next/router'
import Cookie from 'js-cookie'

import { isAuthVar } from 'apollo/variables/user'
import { LOGIN } from 'apollo/mutations/user/user'

import { EMAIL_FIELD_VALIDATION, REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validatinoFields'

import { cookieFields } from 'constants/index'

import { AuthLayout, AuthLayoutType } from 'layouts/AuthLayout'

import s from 'layouts/AuthLayout/index.module.sass'

import { Input } from 'components/ui/Input'

export enum ResetPasswordValues {
  email = 'email'
}
const initialValues = {
  [ResetPasswordValues.email]: ''
}
const validationSchema = Yup.object().shape({
  [ResetPasswordValues.email]: EMAIL_FIELD_VALIDATION
})

export default function Login() {
  const [_loginUserMutation, { loading, data: loginData }] = useMutation(LOGIN)
  const isAuth = useReactiveVar(isAuthVar)

  useEffect(() => {
    if (isAuth) {
      Router.push('/profile')
    }
  }, [isAuth])

  useEffect(() => {
    if (loginData?.login) {
      Cookie.set(cookieFields.authToken, loginData.login)
      isAuthVar(true)
    }
  }, [loginData])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      _loginUserMutation({
        variables: {
          loginUserInput: values
        }
      }).then(() => resetForm())
    }
  })

  const renderInput = ({
    name,
    placeholder,
    type
  }: {
    placeholder: string
    name: ResetPasswordValues
    type?: HTMLInputTypeAttribute
  }) => (
    <Input
      onChange={formik.handleChange}
      name={name}
      value={formik.values[name]}
      placeholder={placeholder}
      fullWidth
      className={s.authLayout__input}
      type={type}
      touched={formik.touched[name]}
      danger={!!formik.errors[name]}
      smallText={formik.errors[name]}
    />
  )

  return (
    <div>
      <AuthLayout loading={loading} onSubmit={formik.handleSubmit} type={AuthLayoutType.login}>
        {renderInput({
          name: ResetPasswordValues.email,
          placeholder: 'Email'
        })}
        {renderInput({
          name: ResetPasswordValues.password,
          placeholder: 'Password',
          type: 'password'
        })}
      </AuthLayout>
    </div>
  )
}
