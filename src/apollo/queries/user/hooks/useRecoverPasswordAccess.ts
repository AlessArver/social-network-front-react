import { useQuery } from '@apollo/client'

import { RECOVER_PASSWORD_ACCESS } from '..'

export const useRecoverPasswordAccess = (token: string) => {
  const { data, loading, error } = useQuery<{ recoverPasswordAccess: boolean }>(RECOVER_PASSWORD_ACCESS, {
    variables: { token }
  })

  return {
    data: data?.recoverPasswordAccess,
    loading,
    error
  }
}
