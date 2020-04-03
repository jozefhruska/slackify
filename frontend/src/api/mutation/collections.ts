import { gql } from '@apollo/client';

export const CREATE_ONE_COLLECTION = gql`
  mutation CreateOneCollection($data: CollectionCreateInput!) {
    createOneCollection(data: $data) {
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

export const UPDATE_ONE_COLLECTION = gql`
  mutation UpdateOneCollection($data: CollectionUpdateInput!, $where: CollectionWhereUniqueInput!) {
    updateOneCollection(data: $data, where: $where) {
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

export const DELETE_ONE_COLLECTION = gql`
  mutation DeleteOneCollection($where: CollectionWhereUniqueInput!) {
    deleteOneCollection(where: $where) {
      id
      name
    }
  }
`;
