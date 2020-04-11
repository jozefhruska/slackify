import { gql } from '@apollo/client';

import { ComponentDetail } from '../fragments/components';
import { UserDetail } from '../fragments/auth';

export const COMPONENTS_LISTING_INPUT = gql`
  input ComponentsListingInput {
    collectionId: String
    pagination: PaginationInput
  }
`;

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
  query GetRecentComponents($input: ComponentsListingInput) {
    components(input: $input) {
      id
      type
      updatedAt
      collection {
        name
      }
    }
  }
`;

export const GET_COMPONENTS_LISTING = gql`
  query GetComponentsListing($input: ComponentsListingInput) {
    components(input: $input) {
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
        content
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
