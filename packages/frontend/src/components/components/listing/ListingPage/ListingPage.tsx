import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useInView } from 'react-intersection-observer';

import Listing from '../../../common/layout/Listing/Listing';
import {
  GetComponentsListingQuery,
  GetComponentsListingQueryVariables,
} from '../../../../types/generated/graphql';
import { PageLoader, ListingLoader } from '../../../common/misc';
import { Flex } from '../../../common/layout/base';
import { GET_COMPONENTS_LISTING } from '../../../../api/query/components';
import CreateUpdateModal from '../../CreateUpdateModal/CreateUpdateModal';
import ListingItem from '../ListingItem/ListingItem';

/* <ListingPage />
============================================================================= */
const ListingPage: React.FC = () => {
  const { data, error, loading, fetchMore } = useQuery<
    GetComponentsListingQuery,
    GetComponentsListingQueryVariables
  >(GET_COMPONENTS_LISTING, {
    variables: {
      input: {
        pagination: {
          first: 40,
        },
      },
    },
  });

  const [isOutOfResults, setOutOfResults] = useState<boolean>(false);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      try {
        fetchMore({
          variables: {
            input: {
              pagination: {
                skip: data?.components?.length,
                first: 20,
              },
            },
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
        <Listing>
          {data.components?.map((component) => (
            <ListingItem key={component?.id} component={component} />
          ))}
        </Listing>

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

        <CreateUpdateModal />
      </>
    );
  }

  return null;
};

export default ListingPage;
