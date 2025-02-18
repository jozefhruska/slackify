import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useInView } from 'react-intersection-observer';

import CommonListing from '../../../common/layout/Listing/Listing';
import {
  GetComponentsListingQuery,
  GetComponentsListingQueryVariables,
  UserDetailFragment,
} from '../../../../types/generated/graphql';
import { PageLoader, ListingLoader } from '../../../common/misc';
import { Flex } from '../../../common/layout/base';
import { GET_COMPONENTS_LISTING } from '../../../../api/query/components';
import CreateUpdateModal from '../../CreateUpdateModal/CreateUpdateModal';
import ListingItem from '../ListingItem/ListingItem';

/* Props - <ListingPage />
============================================================================= */
type Props = {
  user: UserDetailFragment;
  collectionId?: string;
};

/* <ListingPage />
============================================================================= */
const ListingPage: React.FC<Props> = ({ user, collectionId }) => {
  const { data, error, loading, fetchMore, refetch } = useQuery<
    GetComponentsListingQuery,
    GetComponentsListingQueryVariables
  >(GET_COMPONENTS_LISTING, {
    variables: {
      where: {
        team: {
          id: {
            equals: user?.team.id,
          },
        },
        collection: {
          id: {
            equals: collectionId,
          },
        },
      },
      first: 40,
    },
    pollInterval: 4000,
  });

  const [isOutOfResults, setOutOfResults] = useState<boolean>(false);

  const [ref, inView] = useInView();

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (inView) {
      try {
        fetchMore({
          variables: {
            where: {
              team: {
                id: {
                  equals: user?.team.id,
                },
              },
              collection: {
                id: {
                  equals: collectionId,
                },
              },
            },
            skip: data.components.length,
            first: 40,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return prev;
            }

            if (!fetchMoreResult?.components?.length) {
              setOutOfResults(true);
            }

            return Object.assign({}, prev, {
              components: [...prev.components, ...fetchMoreResult.components],
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
    return <span>{error.message}</span>;
  }

  if (loading) {
    return <PageLoader message="Loading components, please wait..." />;
  }

  if (data) {
    return (
      <>
        <CommonListing>
          {data.components?.map((component) => (
            <ListingItem key={component?.id} component={component} onDelete={refetch} />
          ))}
        </CommonListing>

        {!isOutOfResults ? (
          <Flex
            ref={ref}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mt="s10"
          >
            <ListingLoader />
            Loading more components...
          </Flex>
        ) : (
          <Flex justifyContent="center" mt="s10">
            There are no more components.
          </Flex>
        )}

        <CreateUpdateModal collectionId={collectionId} />
      </>
    );
  }

  return null;
};

export default ListingPage;
