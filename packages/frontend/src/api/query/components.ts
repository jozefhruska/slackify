import { gql } from '@apollo/client';

import { ComponentDetail, ComponentPreview, ComponentListing } from '../fragments/components';
import { UserDetail } from '../fragments/users';

export const GET_COMPONENT_DETAIL = gql`
  query GetComponentDetail($where: ComponentWhereUniqueInput!) {
    getUser {
      ...UserDetail
    }

    component(where: $where) {
      ...ComponentDetail
    }
  }

  ${UserDetail}
  ${ComponentDetail}
`;

export const GET_RECENT_COMPONENTS = gql`
  query GetRecentComponents(
    $where: QueryComponentsWhereInput
    $skip: Int
    $after: ComponentWhereUniqueInput
    $before: ComponentWhereUniqueInput
    $first: Int
    $last: Int
  ) {
    components(
      where: $where
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      ...ComponentPreview
    }
  }

  ${ComponentPreview}
`;

export const GET_COMPONENTS_LISTING = gql`
  query GetComponentsListing(
    $where: QueryComponentsWhereInput
    $skip: Int
    $after: ComponentWhereUniqueInput
    $before: ComponentWhereUniqueInput
    $first: Int
    $last: Int
  ) {
    components(
      where: $where
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      ...ComponentListing
    }
  }

  ${ComponentListing}
`;
