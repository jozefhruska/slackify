import { gql } from '@apollo/client';

export const CREATE_ONE_COMPONENT = gql`
  mutation CreateOneComponent($data: ComponentCreateInput!) {
    createOneComponent(data: $data) {
      id
      type
      published
      author {
        id
        name
      }
      plainTextData {
        id
        text
      }
      articleData {
        id
        title
        lead
      }
      linkData {
        id
        url
        text
      }
      updatedAt
      createdAt
    }
  }
`;

export const UPDATE_ONE_COMPONENT = gql`
  mutation UpdateOneComponent($data: ComponentUpdateInput!, $where: ComponentWhereUniqueInput!) {
    updateOneComponent(data: $data, where: $where) {
      id
      type
      published
      author {
        id
        name
      }
      plainTextData {
        id
        text
      }
      articleData {
        id
        title
        lead
      }
      linkData {
        id
        url
        text
      }
      updatedAt
      createdAt
    }
  }
`;

export const DELETE_ONE_COMPONENT = gql`
  mutation DeleteOneComponent($where: ComponentWhereUniqueInput!) {
    deleteOneComponent(where: $where) {
      id
    }
  }
`;
