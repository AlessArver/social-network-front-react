import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput)
  }
`

export const LOGIN = gql`
  mutation login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput)
  }
`

export const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      first_name
      last_name
      avatar
      email
      password
      is_online
    }
  }
`

export const GET_NEW_TOKENS = gql`
  mutation getNewTokens($id: String!) {
    getNewTokens(id: $id) {
      accessToken
    }
  }
`

export const RECOVER_PASSWORD = gql`
  mutation recoverPassword($recoverPasswordInput: RecoverPasswordInput!) {
    recoverPassword(recoverPasswordInput: $recoverPasswordInput)
  }
`
