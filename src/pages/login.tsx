import { HTMLInputTypeAttribute, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useMutation, useReactiveVar } from '@apollo/client'
import Router from 'next/router'
import Cookie from 'js-cookie'

import { isAuthVar } from 'apollo/variables/user'
import { LOGIN } from 'apollo/mutations/user'

import { EMAIL_FIELD_VALIDATION, REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validatinoFields'

import { AuthLayout, AuthLayoutType } from 'layouts/AuthLayout'

import { Input } from 'components/Input'

import s from 'layouts/AuthLayout/index.module.sass'

export enum LoginValues {
  email = 'email',
  password = 'password'
}
const initialValues = {
  [LoginValues.email]: '',
  [LoginValues.password]: ''
}
const validationSchema = Yup.object().shape({
  [LoginValues.email]: EMAIL_FIELD_VALIDATION,
  [LoginValues.password]: REQUIRED_FIELD_VALIDATION
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
      Cookie.set('userToken', loginData.login)
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
    name: LoginValues
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
          name: LoginValues.email,
          placeholder: 'Email'
        })}
        {renderInput({
          name: LoginValues.password,
          placeholder: 'Password',
          type: 'password'
        })}
      </AuthLayout>
    </div>
  )
}
