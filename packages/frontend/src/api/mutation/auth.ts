import { gql } from '@apollo/client';

export const ADD_TO_SLACK = gql`
  mutation AddToSlack($code: String!, $redirect_host: String) {
    addToSlack(code: $code, redirect_host: $redirect_host)
  }
`;
