import { gql } from '@apollo/client'

export const CREATE_POST = gql`
  mutation createPost($createPostInput: CreatePostInput!) {
    createPost(createPostInput: $createPostInput) {
      id
      text
      userId
      created_at
    }
  }
`

export const REMOVE_POST = gql`
  mutation removePost($id: String!) {
    removePost(id: $id) {
      id
    }
  }
`
