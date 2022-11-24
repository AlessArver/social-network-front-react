import { gql } from "@apollo/client";

export enum FriendStatus {
  pending = "pending",
  added = "added",
  blocked = "blocked",
  add_to_response = "add_to_response",
}

export interface IFriend {
  id: string;
  from_id: string;
  to_id: string;
  avatar?: string;
  status: FriendStatus;
  first_name: string;
  last_name: string;
}

export const FRIENDS = gql`
  query friends($friendsInput: FriendsInput!) {
    friends(friendsInput: $friendsInput) {
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
