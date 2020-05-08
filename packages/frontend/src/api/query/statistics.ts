import { gql } from '@apollo/client';

export const GET_COMPONENT_STATS = gql`
  query GetComponentStats($where: StatRecordWhereInput!) {
    statRecords(where: $where) {
      createdAt
    }
  }
`;
