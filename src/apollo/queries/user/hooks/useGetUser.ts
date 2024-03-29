import { useLazyQuery } from '@apollo/client'

import { IUser, USER } from '..'

export const useGetUser = () => {
  const [getUser, { loading, error }] = useLazyQuery<{ user: IUser }>(USER)

  const handleGetUser = (id: IUser['id'], onCompleted?: (data: IUser) => void) => {
    getUser({
      variables: { id },
      onCompleted: data => {
        if (onCompleted && data?.user) onCompleted(data.user)
      }
    })
    getUser({
      variables: { id }
    })
  }

  return {
    handleGetUser,
    loading,
    error
  }
}
