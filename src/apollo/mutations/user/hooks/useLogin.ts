import { useMutation } from '@apollo/client'

import { LOGIN } from '../user'
import { IUser } from 'apollo/queries/user/user'

export const useLogin = () => {
  const [_handleLogin, { loading, error }] = useMutation<{ updateUser: IUser }>(LOGIN)

  const handleLogin = (
    data: { email: IUser['email']; password: IUser['password'] },
    onCompleted?: (data: IUser) => void
  ) => {
    _handleLogin({
      variables: {
        loginUserInput: data
      },
      onCompleted: res => {
        if (onCompleted) onCompleted(res.updateUser)
      }
    })
  }

  return {
    handleLogin,
    loading,
    error
  }
}
