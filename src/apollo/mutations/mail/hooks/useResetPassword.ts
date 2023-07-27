import { useMutation } from '@apollo/client'

import { RESET_PASSWORD } from '..'

export const useResetPassword = () => {
  const [_handleResetPassword, { loading, error }] = useMutation(RESET_PASSWORD)

  const handleResetPassword = (email: string, onCompleted?: (data: string) => void) => {
    _handleResetPassword({
      variables: { email },
      onCompleted: res => {
        if (onCompleted) onCompleted(res.login)
      }
    })
  }

  return {
    handleResetPassword,
    loading,
    error
  }
}
