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

export const UPDATE_USER = gql`
  mutation updateUser($updateUser: UpdateUserInput!) {
    updateUser(updateUser: $updateUser)
  }
`;
