import { gql } from "@apollo/client";

export const POST_ADDED = gql`
  subscription postAdded {
    postAdded {
      id
      text
      userId
      created_at
    }
  }
`;

export const POST_REMOVED = gql`
  subscription postRemoved {
    postRemoved {
      id
    }
  }
`;
