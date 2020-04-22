import { gql } from '@apollo/client';

export const UserDetail = gql`
  fragment UserDetail on User {
    id
    name
    email
    accessToken
    image_72
    team {
      id
      name
      domain
      accessToken
    }
  }
`;

export const UserPreview = gql`
  fragment UserPreview on User {
    id
    name
    image_72
  }
`;
