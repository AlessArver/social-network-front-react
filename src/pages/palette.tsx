import { useFormik } from 'formik'

import { MainLayout } from 'layouts/MainLayout'

export enum PaletteValues {
  navbar_color = 'navbar_color'
}
const initialValues = {
  [PaletteValues.navbar_color]: ''
}
export default function Palette() {
  const formik = useFormik({
    initialValues,
    onSubmit: values => {
      console.log(values)
    }
  })

  return (
    <MainLayout>
      <form onSubmit={formik.handleSubmit}></form>
    </MainLayout>
  )
}
