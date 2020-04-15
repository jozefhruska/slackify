import React from 'react';
import { useQuery } from '@apollo/client';
import moment from 'moment';
import Link from 'next/link';

import {
  User,
  GetRecentComponentsQuery,
  GetRecentComponentsQueryVariables,
} from '../../../../../types/generated/graphql';
import { GET_RECENT_COMPONENTS } from '../../../../../api/query/components';
import { Alert, ListingLoader } from '../../../misc';
import { Flex, Box } from '../../base';
import { Paragraph } from '../../../typography';

import * as S from './RecentComponents.styles';

/* Props - <RecentComponents />
============================================================================= */
type Props = {
  user: User;
};

/* <RecentComponents />
============================================================================= */
const RecentComponents: React.FC<Props> = ({ user }) => {
  const { data, loading, error } = useQuery<
    GetRecentComponentsQuery,
    GetRecentComponentsQueryVariables
  >(GET_RECENT_COMPONENTS, {
    variables: {
      where: {
        author: {
          id: {
            equals: user?.id,
          },
        },
      },
      first: 4,
    },
  });

  if (error) {
    return <Alert type="danger">{error.message}</Alert>;
  }

  if (loading) {
    return (
      <Flex justifyContent="center" mt="s8">
        <ListingLoader />
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column">
      {data.components.map((component) => (
        <Link key={component.id} href="/components/[id]" as={`/components/${component.id}`}>
          <S.RCPreview>
            <Box>
              <Paragraph mb="s2" fontWeight="bold">
                {component.type}
              </Paragraph>
              <S.RCPreviewInfo>{component.collection.name}</S.RCPreviewInfo>
            </Box>

            <S.RCPreviewInfo>{moment(component.updatedAt).fromNow()}</S.RCPreviewInfo>
          </S.RCPreview>
        </Link>
      ))}
    </Flex>
  );
};

export default RecentComponents;
