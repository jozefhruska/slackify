import { gql } from 'apollo-boost';

export const SIGN_IN = gql`
  mutation SignIn($code: String!) {
    signIn(code: $code)
  }
`;
