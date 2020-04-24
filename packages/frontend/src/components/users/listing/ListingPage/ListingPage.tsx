import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useInView } from 'react-intersection-observer';

import {
  User,
  GetUsersListingQuery,
  GetUsersListingQueryVariables,
} from '../../../../types/generated/graphql';
import { GET_USERS_LISTING } from '../../../../api/query/users';
import { ListingItem } from '../';
import { Alert, PageLoader, ListingLoader } from '../../../common/misc';
import { Flex } from '../../../common/layout/base';

import * as S from './ListingPage.styles';

/* Props - <ListingPage />
============================================================================= */
type Props = {
  user: User;
};

/* <ListingPage />
============================================================================= */
const ListingPage: React.FC<Props> = ({ user }) => {
  const { data, error, loading, fetchMore } = useQuery<
    GetUsersListingQuery,
    GetUsersListingQueryVariables
  >(GET_USERS_LISTING, {
    variables: {
      where: {
        team: {
          id: {
            equals: user?.team?.id,
          },
        },
      },
      first: 40,
    },
  });

  const [isOutOfResults, setOutOfResults] = useState<boolean>(false);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      try {
        fetchMore({
          variables: {
            skip: data?.users?.length,
            first: 20,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return prev;
            }

            if (!fetchMoreResult?.users?.length) {
              setOutOfResults(true);
            }

            return Object.assign({}, prev, {
              collections: [...prev.users, ...fetchMoreResult.users],
            });
          },
        });
      } catch (error) {
        setOutOfResults(true);
        console.error(error);
      }
    }
  }, [inView]);

  if (error) {
    return <Alert type="danger">{error.message}</Alert>;
  }

  if (loading) {
    return <PageLoader message="Loading users, please wait..." />;
  }

  if (data) {
    return (
      <>
        <S.Listing>
          {data.users?.map((userItem) => (
            <ListingItem key={userItem?.id} user={userItem} />
          ))}
        </S.Listing>

        {!isOutOfResults ? (
          <Flex
            ref={ref}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt="s10"
          >
            <ListingLoader />
            Loading more users...
          </Flex>
        ) : (
          <Flex justifyContent="center" mt="s10">
            There are no more users.
          </Flex>
        )}
      </>
    );
  }

  return null;
};

export default ListingPage;
