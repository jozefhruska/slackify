import { gql } from '@apollo/client';

import { UserDetail } from '../fragments/users';
import { CollectionDetail, CollectionListing } from '../fragments/collections';

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
  query GetCollectionsListing(
    $where: QueryCollectionsWhereInput
    $skip: Int
    $after: CollectionWhereUniqueInput
    $before: CollectionWhereUniqueInput
    $first: Int
    $last: Int
  ) {
    collections(
      where: $where
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      ...CollectionListing
    }
  }

  ${CollectionListing}
`;

export const GET_COLLECTIONS_OPTIONS = gql`
  query GetCollectionsOptions($where: QueryCollectionsWhereInput) {
    collections(where: $where) {
      id
      name
      type
    }
  }
`;
