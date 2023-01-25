import { gql } from "@apollo/client";

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  email: string;
  password: string;
  is_online?: boolean;
}

export const USERS = gql`
  query users {
    users {
      id
      first_name
      last_name
      avatar
      email
    }
  }
`;

export const USERS_BY_IDS = gql`
  query usersByIds($ids: [String!]!) {
    usersByIds(ids: $ids) {
      id
      first_name
      last_name
      avatar
      email
    }
  }
`;

export const USER = gql`
  query user($id: String!) {
    user(id: $id) {
      id
      first_name
      last_name
      avatar
      email
    }
  }
`;

export const ME = gql`
  query me {
    me {
      id
      first_name
      last_name
      avatar
      email
    }
  }
`;
