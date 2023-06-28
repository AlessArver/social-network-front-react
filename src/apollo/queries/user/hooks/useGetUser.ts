import { useLazyQuery } from '@apollo/client'

import { IUser, USER } from '../user'

export const useGetUser = () => {
  const [getUser, { loading, error }] = useLazyQuery<{ user: IUser }>(USER)

  const handleGetUser = (id: IUser['id'], onCompleted: (data: IUser) => void) => {
    getUser({
      variables: { id },
      onCompleted: data => onCompleted(data.user)
    })
  }

  return {
    handleGetUser,
    loading,
    error
  }
}
