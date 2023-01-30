import { gql } from '@apollo/client'

export interface IPost {
  id: string
  text: string
  userId: string
  created_at: Date
}

export const POSTS = gql`
  query posts($userId: String!) {
    posts(userId: $userId) {
      id
      text
      userId
      created_at
    }
  }
`
