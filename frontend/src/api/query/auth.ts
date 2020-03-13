import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      id
      name
      email
      image_24
      image_32
      image_48
      image_72
      image_192
      image_512
    }
  }
`;

export const GET_TEAM = gql`
  query GetTeam {
    getTeam {
      id
      name
      domain
      accessToken
    }
  }
`;
