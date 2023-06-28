import { useMutation } from '@apollo/client'

import { LOGIN } from '../user'
import { IUser } from 'apollo/queries/user/user'

export const useLogin = () => {
  const [_handleLogin, { loading, error }] = useMutation<{ login: string }>(LOGIN)

  const handleLogin = (
    data: { email: IUser['email']; password: IUser['password'] },
    onCompleted?: (data: string) => void
  ) => {
    _handleLogin({
      variables: {
        loginUserInput: data
      },
      onCompleted: res => {
        if (onCompleted) onCompleted(res.login)
      }
    })
  }

  return {
    handleLogin,
    loading,
    error
  }
}
