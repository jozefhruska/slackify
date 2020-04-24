import { gql } from '@apollo/client';

import { UserDetail, UserPreview } from '../fragments/users';

export const GET_USER = gql`
  query GetUser {
    getUser {
      ...UserDetail
    }
  }

  ${UserDetail}
`;

export const GET_USERS_LISTING = gql`
  query GetUsersListing(
    $where: QueryUsersWhereInput
    $skip: Int
    $after: UserWhereUniqueInput
    $before: UserWhereUniqueInput
    $first: Int
    $last: Int
  ) {
    users(where: $where, skip: $skip, after: $after, before: $before, first: $first, last: $last) {
      ...UserPreview
    }
  }

  ${UserPreview}
`;
