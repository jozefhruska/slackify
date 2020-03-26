import { gql } from '@apollo/client';

export const DELETE_COLLECTION = gql`
  mutation DeleteCollection($collectionId: String!) {
    deleteCollection(collectionId: $collectionId) {
      id
      name
    }
  }
`;
