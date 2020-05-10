import { gql } from '@apollo/client';

export const ADD_TO_SLACK = gql`
  mutation AddToSlack($code: String!) {
    addToSlack(code: $code)
  }
`;
