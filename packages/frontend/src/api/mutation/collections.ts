import { gql } from '@apollo/client';

import { CollectionListing } from '../fragments/collections';

export const CREATE_ONE_COLLECTION = gql`
  mutation CreateOneCollection($data: CollectionCreateInput!) {
    createOneCollection(data: $data) {
      ...CollectionListing
    }
  }

  ${CollectionListing}
`;

export const UPDATE_ONE_COLLECTION = gql`
  mutation UpdateOneCollection($data: CollectionUpdateInput!, $where: CollectionWhereUniqueInput!) {
    updateOneCollection(data: $data, where: $where) {
      ...CollectionListing
    }
  }

  ${CollectionListing}
`;

export const DELETE_ONE_COLLECTION = gql`
  mutation DeleteOneCollection($where: CollectionWhereUniqueInput!) {
    deleteOneCollection(where: $where) {
      ...CollectionListing
    }
  }

  ${CollectionListing}
`;
