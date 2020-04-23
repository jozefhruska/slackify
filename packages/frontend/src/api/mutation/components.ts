import { gql } from '@apollo/client';
import { ComponentListing } from '../fragments/components';

export const CREATE_ONE_COMPONENT = gql`
  mutation CreateOneComponent($data: ComponentCreateInput!) {
    createOneComponent(data: $data) {
      ...ComponentListing
    }
  }

  ${ComponentListing}
`;

export const UPDATE_ONE_COMPONENT = gql`
  mutation UpdateOneComponent($data: ComponentUpdateInput!, $where: ComponentWhereUniqueInput!) {
    updateOneComponent(data: $data, where: $where) {
      ...ComponentListing
    }
  }

  ${ComponentListing}
`;

export const DELETE_ONE_COMPONENT = gql`
  mutation DeleteOneComponent($where: ComponentWhereUniqueInput!) {
    deleteOneComponent(where: $where) {
      id
    }
  }
`;
