import { gql } from '@apollo/client';

import { UserDetail } from '../fragments/auth';

export const GET_USER = gql`
  query GetUser {
    getUser {
      ...UserDetail
    }
  }

  ${UserDetail}
`;
