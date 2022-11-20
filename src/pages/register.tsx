import { HTMLInputTypeAttribute } from "react";
import Router from "next/router";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";

import { CREATE_USER } from "apollo/mutations/user";

import {
  EMAIL_FIELD_VALIDATION,
  PASSWORD_FIELD_VALIDATION,
  REQUIRED_FIELD_VALIDATION,
} from "utils/formValidation/validatinoFields";

import { AuthLayout, AuthLayoutType } from "layouts/AuthLayout";

import { Input } from "components/Input";

import s from "layouts/AuthLayout/index.module.sass";

export enum RegisterValues {
  first_name = "first_name",
  last_name = "last_name",
  email = "email",
  password = "password",
}
const initialValues = {
  [RegisterValues.first_name]: "",
  [RegisterValues.last_name]: "",
  [RegisterValues.email]: "",
  [RegisterValues.password]: "",
};
const validationSchema = Yup.object().shape({
  [RegisterValues.first_name]: REQUIRED_FIELD_VALIDATION,
  [RegisterValues.last_name]: REQUIRED_FIELD_VALIDATION,
  [RegisterValues.email]: EMAIL_FIELD_VALIDATION,
  [RegisterValues.password]: PASSWORD_FIELD_VALIDATION,
});

export default function Register() {
  const [_createUserMutation, { loading }] = useMutation(CREATE_USER);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }: any) => {
      _createUserMutation({
        variables: {
          createUserInput: values,
        },
      }).then(() => {
        resetForm();
        Router.push("/login");
      });
    },
  });

  const renderInput = ({
    name,
    placeholder,
    type,
  }: {
    placeholder: string;
    name: RegisterValues;
    type?: HTMLInputTypeAttribute;
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
  );

  return (
    <div>
      <AuthLayout
        loading={loading}
        onSubmit={formik.handleSubmit}
        type={AuthLayoutType.register}
      >
        {renderInput({
          name: RegisterValues.first_name,
          placeholder: "First name",
        })}
        {renderInput({
          name: RegisterValues.last_name,
          placeholder: "Last name",
        })}
        {renderInput({
          name: RegisterValues.email,
          placeholder: "Email",
        })}
        {renderInput({
          name: RegisterValues.password,
          placeholder: "Password",
          type: "password",
        })}
      </AuthLayout>
    </div>
  );
}
