import { gql } from '@apollo/client';

export const ComponentsListingInput = gql`
  input ComponentsListingInput {
    collectionId: String
    pagination: PaginationInput
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
