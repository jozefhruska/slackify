import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    getUser {
      id
      name
      email
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
