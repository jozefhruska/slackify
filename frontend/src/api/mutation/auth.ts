import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignIn($code: String!) {
    signIn(code: $code) {
      authToken
      user {
        id
        name
        email
        accessToken
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
  }
`;
