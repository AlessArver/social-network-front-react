import { useLazyQuery } from '@apollo/client'

import { IUser, ME } from '..'

export const useGetMe = () => {
  const [_handleGetMe, { loading, error }] = useLazyQuery<{ me: IUser }>(ME)

  const handleGetMe = (onCompleted?: (data: IUser) => void) => {
    _handleGetMe({
      onCompleted: data => {
        if (onCompleted) onCompleted(data.me)
      }
    })
  }

  return {
    handleGetMe,
    loading,
    error
  }
}
