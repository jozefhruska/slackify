import { gql } from '@apollo/client';

export const UserDetail = gql`
  fragment UserDetail on User {
    id
    role
    name
    email
    accessToken
    avatar
    team {
      id
      name
      accessToken
    }
  }
`;

export const UserPreview = gql`
  fragment UserPreview on User {
    id
    name
    role
    avatar
  }
`;
