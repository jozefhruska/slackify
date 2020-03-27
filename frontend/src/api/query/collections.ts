import { gql } from '@apollo/client';

export const GET_COLLECTIONS_LISTING = gql`
  query GetCollectionsListing($input: PaginationInput) {
    getCollectionsListing(input: $input) {
      id
      name
      type
      published
      description
      componentsCount
      updatedAt
    }
  }
`;
