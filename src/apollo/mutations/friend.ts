import { gql } from '@apollo/client'

export const CREATE_FRIEND = gql`
  mutation createFriend($createFriendInput: CreateFriendInput!) {
    createFriend(createFriendInput: $createFriendInput) {
      id
      from_id
      to_id
      status
    }
  }
`

export const UPDATE_FRIEND = gql`
  mutation updateFriend($updateFriendInput: UpdateFriendInput!) {
    updateFriend(updateFriendInput: $updateFriendInput) {
      id
      from_id
      to_id
      status
    }
  }
`

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: String!) {
    removeFriend(id: $id)
  }
`
