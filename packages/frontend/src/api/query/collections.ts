import { gql } from '@apollo/client';

import { UserDetail } from '../fragments/auth';
import { CollectionDetail, CollectionListing } from '../fragments/collections';

export const CollectionsListingInput = gql`
  input CollectionsListingInput {
    pagination: PaginationInput
  }
`;

export const GET_COLLECTION_DETAIL = gql`
  query GetCollectionDetail($where: CollectionWhereUniqueInput!) {
    getUser {
      ...UserDetail
    }

    collection(where: $where) {
      ...CollectionDetail
    }
  }

  ${UserDetail}
  ${CollectionDetail}
`;

export const GET_COLLECTIONS_LISTING = gql`
  query GetCollectionsListing($input: CollectionsListingInput) {
    collections(input: $input) {
      ...CollectionListing
    }
  }

  ${CollectionListing}
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
