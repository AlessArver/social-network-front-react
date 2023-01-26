import { FC } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import { REQUIRED_FIELD_VALIDATION } from "utils/formValidation/validatinoFields";

import { Input } from "components/Input";
import { Button } from "components/Button";

import s from "./index.module.sass";

export enum CreatePostValues {
  text = "text",
}
const initialValues = {
  [CreatePostValues.text]: "",
};
const validationSchema = Yup.object().shape({
  [CreatePostValues.text]: REQUIRED_FIELD_VALIDATION,
});

export interface ICreatePost {
  handleAddPost: (text: string) => void;
}
export const CreatePost: FC<ICreatePost> = ({ handleAddPost }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ text }: typeof initialValues, { resetForm }: any) => {
      handleAddPost(text);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={s.createPost}>
      <Input
        onChange={formik.handleChange}
        value={formik.values[CreatePostValues.text]}
        name={CreatePostValues.text}
        placeholder="Input text..."
        fullWidth
        inputClassName={s.createPost__input}
      />
      <Button htmlType="submit" className={s.createPost__button}>
        Enter
      </Button>
    </form>
  );
};
