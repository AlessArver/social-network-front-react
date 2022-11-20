import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      id
      first_name
      last_name
      avatar
      email
    }
  }
`;

export const LOGIN = gql`
  mutation login($loginUserInput: LoginUserInput!) {
    login(loginUserInput: $loginUserInput)
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
      posts {
        id
        text
      }
    }
  }
`;

export const USER = gql`
  query user {
    user {
      id
      first_name
      last_name
      avatar
      email
      posts {
        id
        text
      }
    }
  }
`;
