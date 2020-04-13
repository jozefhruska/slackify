import { gql } from '@apollo/client';

export const ComponentDetail = gql`
  fragment ComponentDetail on Component {
    id
    type
    published
    author {
      id
      name
    }
    collection {
      id
      name
      components(first: 5) {
        id
        type
        updatedAt
      }
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
`;

export const ComponentPreview = gql`
  fragment ComponentPreview on Component {
    id
    type
    updatedAt
    collection {
      id
      name
    }
  }
`;

export const ComponentListing = gql`
  fragment ComponentListing on Component {
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
`;
