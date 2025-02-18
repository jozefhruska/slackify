import { gql } from '@apollo/client';

import { UserDetail, UserPreview } from '../fragments/users';

export const SIGN_IN = gql`
  mutation SignIn($code: String!, $redirect_host: String) {
    signIn(code: $code, redirect_host: $redirect_host) {
      authToken
      user {
        ...UserDetail
      }
    }
  }

  ${UserDetail}
`;

export const UPDATE_ONE_USER = gql`
  mutation UpdateOneUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
    updateOneUser(data: $data, where: $where) {
      ...UserPreview
    }
  }

  ${UserPreview}
`;
