import { useMutation } from '@apollo/client'

import { RECOVER_PASSWORD } from '..'
import { IUser } from 'apollo/queries/user'

export const useRecoverPassword = () => {
  const [_recoverPassword, { loading, error }] = useMutation<{ recoverPassword: boolean }>(RECOVER_PASSWORD)

  const recoverPassword = async (
    data: { token: IUser['reset_password_token']; password: IUser['password'] },
    onCompleted?: (data: boolean) => void
  ) => {
    _recoverPassword({
      variables: {
        recoverPasswordInput: data
      },
      onCompleted: res => {
        if (onCompleted) onCompleted(res.recoverPassword)
      }
    }).catch(console.error)
  }

  return {
    recoverPassword,
    loading,
    error
  }
}
