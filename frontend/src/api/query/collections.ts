import { gql } from '@apollo/client';

export const CollectionsListingInput = gql`
  input CollectionsListingInput {
    pagination: PaginationInput
  }
`;

export const GET_COLLECTIONS_LISTING = gql`
  query GetCollectionsListing($input: CollectionsListingInput) {
    collections(input: $input) {
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

export const GET_COLLECTIONS_OPTIONS = gql`
  query GetCollectionsOptions {
    collections {
      id
      name
      type
    }
  }
`;
