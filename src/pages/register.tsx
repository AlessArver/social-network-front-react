import Router from 'next/router'
import { useFormik } from 'formik'
import { useMutation, useReactiveVar } from '@apollo/client'

import { CREATE_USER } from 'apollo/mutations/user/user'
import { isAuthVar } from 'apollo/variables/user'
import { useRegister } from 'apollo/mutations/user/hooks/useRegister'

import { LOGIN_PAGE } from 'constants/routes'

import { AuthLayout, AuthLayoutType } from 'layouts/AuthLayout'

import { Input } from 'components/ui/Input'

import { registerForm } from 'schemas/register/form'
import { registerInitialValues } from 'schemas/register/initialValues'
import { registerValidationSchema } from 'schemas/register/validationSchema'

import s from 'layouts/AuthLayout/index.module.sass'

export default function Register() {
  const { handleRegister } = useRegister()
  const [_createUserMutation, { loading }] = useMutation(CREATE_USER)
  const formFields = registerForm

  const formik = useFormik({
    initialValues: registerInitialValues,
    validationSchema: registerValidationSchema,
    onSubmit: (values, { resetForm }) => {
      handleRegister(values, () => {
        resetForm()
        Router.push(LOGIN_PAGE)
      })
    }
  })

  return (
    <div>
      <AuthLayout loading={loading} onSubmit={formik.handleSubmit} type={AuthLayoutType.register}>
        {Object.entries(formFields).map(([_, { name, placeholder, type }]) => (
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
