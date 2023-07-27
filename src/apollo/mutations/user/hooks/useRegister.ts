import { useMutation } from '@apollo/client'

import { CREATE_USER } from '..'
import { IUser } from 'apollo/queries/user'

export const useRegister = () => {
  const [_handleRegister, { loading, error }] = useMutation(CREATE_USER)

  const handleRegister = (
    data: {
      first_name: IUser['first_name']
      last_name: IUser['last_name']
      avatar?: IUser['avatar']
      email: IUser['email']
      password: IUser['password']
    },
    onCompleted?: () => void
  ) => {
    _handleRegister({
      variables: {
        createUserInput: data
      },
      onCompleted: () => {
        if (onCompleted) onCompleted()
      }
    })
  }

  return {
    handleRegister,
    loading,
    error
  }
}
