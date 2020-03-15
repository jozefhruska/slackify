import { gql } from '@apollo/client';

export const USER = gql`
  query User {
    user @client {
      id
      name
      email
      image_24
      image_32
      image_48
      image_72
      image_192
      image_512
      team {
        id
        name
        domain
        accessToken
      }
    }
  }
`;
