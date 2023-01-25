import { gql } from "@apollo/client";

export const FRIEND_ADDED = gql`
  subscription friendAdded {
    friendAdded {
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

export const FRIEND_UPDATED = gql`
  subscription friendUpdated {
    friendUpdated {
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

export const FRIEND_REMOVED = gql`
  subscription friendRemoved {
    friendRemoved {
      id
    }
  }
`;
