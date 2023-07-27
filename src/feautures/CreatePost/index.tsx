import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'

import { CREATE_POST } from 'apollo/mutations/post'

import { REQUIRED_FIELD_VALIDATION } from 'utils/formValidation/validatinoFields'

import { Input } from 'components/ui/Input'

import s from './index.module.sass'

export enum CreatePostValues {
  text = 'text'
}
const initialValues = {
  [CreatePostValues.text]: ''
}
const validationSchema = Yup.object().shape({
  [CreatePostValues.text]: REQUIRED_FIELD_VALIDATION
})

export interface ICreatePost {}
export const CreatePost = ({}: ICreatePost) => {
  const router = useRouter()
  const { id } = router.query
  const [_createPostMutation] = useMutation(CREATE_POST)
  // const isAttachDropdown = useToggle()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ text }: typeof initialValues, { resetForm }) => {
      _createPostMutation({
        variables: { createPostInput: { text, userId: id } }
      })
      resetForm()
    }
  })
  // const CREATE_POST_ATTACHMENT_DROPDOWN = [
  //   {
  //     onClick: () => {
  //       console.log('click to camera')
  //     },
  //     children: <CameraIcon />
  //   },
  //   {
  //     onClick: () => {
  //       console.log('click to video')
  //     },
  //     children: <VideoIcon />
  //   }
  // ]

  return (
    <form onSubmit={formik.handleSubmit} className={s.createPost}>
      <Input
        onChange={formik.handleChange}
        value={formik.values[CreatePostValues.text]}
        name={CreatePostValues.text}
        placeholder='My post . . .'
        fullWidth
        inputClassName={s.createPost__input}
        // rightIcon={
        //   <Dropdown
        //     childrenItems={CREATE_POST_ATTACHMENT_DROPDOWN}
        //     visible={isAttachDropdown.value}
        //     onOpen={isAttachDropdown.set}
        //     onClose={isAttachDropdown.unset}
        //   >
        //     <AttachIcon onClick={isAttachDropdown.toggle} className={s.createPost__inputIcon} />
        //   </Dropdown>
        // }
      />
    </form>
  )
}
