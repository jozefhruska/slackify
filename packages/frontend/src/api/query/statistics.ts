import { gql } from '@apollo/client';

export const GET_COMPONENT_STATS = gql`
  query GetComponentStats(
    $where: StatRecordWhereInput!
    $skip: Int
    $after: StatRecordWhereUniqueInput
    $before: StatRecordWhereUniqueInput
    $first: Int
    $last: Int
  ) {
    statRecords(
      where: $where
      skip: $skip
      after: $after
      before: $before
      first: $first
      last: $last
    ) {
      createdAt
    }
  }
`;
