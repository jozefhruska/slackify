import { gql } from '@apollo/client';

export const GET_COLLECTIONS_LISTING = gql`
  query GetCollectionsListing($input: PaginationInput) {
    getCollections(input: $input) {
      id
      name
      type
      description
    }
  }
`;
