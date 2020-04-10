import { gql } from '@apollo/client';

export const PaginationInput = gql`
  input PostAndMediaInput {
    skip: Int
    limit: Int
  }
`;
