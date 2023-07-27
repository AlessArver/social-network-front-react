import { useMutation } from '@apollo/client'

import { GET_NEW_TOKENS } from '..'

export const useGetNewTokens = () => {
  const [_handlegetNewTokens, { loading, error }] = useMutation<{
    getNewTokens: { accessToken: string; refreshToken: string }
  }>(GET_NEW_TOKENS)

  const handleGetNewTokens = async (
    id: string,
    onCompleted?: (data: { accessToken: string; refreshToken: string }) => void
  ) => {
    _handlegetNewTokens({
      variables: { id },
      onCompleted: res => {
        if (onCompleted) onCompleted(res.getNewTokens)
      }
    }).catch(console.error)
  }

  return {
    handleGetNewTokens,
    loading,
    error
  }
}
