import { Typography } from 'components/ui/Typography'

import s from './index.module.sass'

export interface IResetPasswordSuccess {
  email: string
}
export const ResetPasswordSuccess = ({ email }: IResetPasswordSuccess) => {
  return (
    <div className={s.resetPasswordSuccess}>
      <Typography>Link for reset password sended to {email}</Typography>
    </div>
  )
}
