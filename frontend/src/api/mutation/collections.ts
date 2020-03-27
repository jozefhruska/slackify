import { gql } from '@apollo/client';

export const DELETE_COLLECTION = gql`
  mutation DeleteCollection($collectionId: String!) {
    deleteCollection(collectionId: $collectionId) {
      id
      name
    }
  }
`;

export const UPDATE_ONE_COLLECTION = gql`
  mutation UpdateOneCollection($data: CollectionUpdateInput!, $where: CollectionWhereUniqueInput!) {
    updateOneCollection(data: $data, where: $where) {
      id
      name
      published
    }
  }
`;
