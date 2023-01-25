import { gql } from "@apollo/client";

export const CREATE_FRIEND = gql`
  mutation createFriend($createFriendInput: CreateFriendInput!) {
    createFriend(createFriendInput: $createFriendInput) {
      id
      from_id
      to_id
      avatar
      status
      first_name
      last_name
    }
  }
`;

export const UPDATE_FRIEND = gql`
  mutation updateFriend($updateFriendInput: UpdateFriendInput!) {
    updateFriend(updateFriendInput: $updateFriendInput) {
      id
      from_id
      to_id
      avatar
      status
      first_name
      last_name
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($id: String!) {
    removeFriend(id: $id) {
      id
    }
  }
`;
