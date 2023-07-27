import { useMutation } from '@apollo/client'
import { IUpdateUserRequest } from 'apollo/mutations/user/types'

import { UPDATE_USER } from 'apollo/mutations/user'

export const useUpdateUser = () => {
  const [updateUserMutation, { data, loading, error }] = useMutation(UPDATE_USER)

  const handleUpdateUser = (id: string, data: Omit<Partial<IUpdateUserRequest>, 'id'>) => {
    updateUserMutation({
      variables: {
        updateUserInput: { id, ...data }
      }
    })
  }

  return {
    handleUpdateUser,
    loading,
    error
  }
}
