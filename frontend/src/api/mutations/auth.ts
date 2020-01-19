import { gql } from 'apollo-boost';

export const AUTHORIZE_WITH_SLACK = gql`
  mutation AuthorizeWithSlack($code: String!) {
    authorizeWithSlack(code: $code) {
      id
      email
    }
  }
`;
