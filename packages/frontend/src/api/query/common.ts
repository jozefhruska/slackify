import { gql } from '@apollo/client';
import { ComponentListing } from '../fragments/components';
import { CollectionListing } from '../fragments/collections';

export const GET_DASH_DATA = gql`
  query GetDashData {
    dashData {
      requestedComponents {
        ...ComponentListing
      }
      createdComponents {
        ...ComponentListing
      }
      createdCollections {
        ...CollectionListing
      }
    }
  }

  ${ComponentListing}
  ${CollectionListing}
`;
