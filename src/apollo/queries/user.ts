import { gql } from "@apollo/client";

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  email: string;
  password: string;
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
