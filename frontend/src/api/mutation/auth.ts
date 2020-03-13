import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation SignIn($code: String!) {
    signIn(code: $code)
  }
`;
