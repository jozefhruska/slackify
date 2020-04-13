import { gql } from '@apollo/client';

import { ComponentPreview } from './components';

export const CollectionDetail = gql`
  fragment CollectionDetail on Collection {
    id
    name
    type
    published
    description
    components(first: 40) {
      ...ComponentPreview
    }
    componentsCount
    updatedAt
    createdAt
  }

  ${ComponentPreview}
`;

export const CollectionListing = gql`
  fragment CollectionListing on Collection {
    id
    name
    type
    published
    description
    componentsCount
    updatedAt
  }
`;
