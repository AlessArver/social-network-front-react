import { gql } from '@apollo/client'

export const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`
