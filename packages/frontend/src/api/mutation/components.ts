import { gql } from '@apollo/client';
import { ComponentDetail } from '../fragments/components';

export const CREATE_ONE_COMPONENT = gql`
  mutation CreateOneComponent($data: ComponentCreateInput!) {
    createOneComponent(data: $data) {
      ...ComponentDetail
    }
  }

  ${ComponentDetail}
`;

export const UPDATE_ONE_COMPONENT = gql`
  mutation UpdateOneComponent($data: ComponentUpdateInput!, $where: ComponentWhereUniqueInput!) {
    updateOneComponent(data: $data, where: $where) {
      ...ComponentDetail
    }
  }

  ${ComponentDetail}
`;

export const DELETE_ONE_COMPONENT = gql`
  mutation DeleteOneComponent($where: ComponentWhereUniqueInput!) {
    deleteOneComponent(where: $where) {
      id
    }
  }
`;
