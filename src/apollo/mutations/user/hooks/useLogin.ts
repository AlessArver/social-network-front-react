import { useMutation } from '@apollo/client'

import { LOGIN } from '..'
import { IUser } from 'apollo/queries/user'

export const useLogin = () => {
  const [_handleLogin, { loading, error }] = useMutation<{ login: string }>(LOGIN)

  const handleLogin = async (
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
    }).catch(error => console.error({ error }))
  }

  return {
    handleLogin,
    loading,
    error
  }
}
