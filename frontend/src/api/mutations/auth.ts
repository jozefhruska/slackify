import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
  mutation signIn($code: String!) {
    signIn(code: $code) {
      id
      email
    }
  }
`;
 