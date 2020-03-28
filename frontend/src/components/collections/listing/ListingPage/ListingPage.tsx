import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { useInView } from 'react-intersection-observer';

import Listing from '../../../common/layout/Listing/Listing';
import { GET_COLLECTIONS_LISTING } from '../../../../api/query/collections';
import {
  GetCollectionsListingQueryVariables,
  GetCollectionsListingQuery,
} from '../../../../types/generated/graphql';
import { PageLoader, ListingLoader } from '../../../common/misc';
import ListingItem from '../ListingItem/ListingItem';
import { Flex } from '../../../common/layout/base';
import CreateUpdateModal from '../../CreateUpdateModal/CreateUpdateModal';

/* <ListingPage />
============================================================================= */
const ListingPage: React.FC = () => {
  const { data, error, loading, fetchMore } = useQuery<
    GetCollectionsListingQuery,
    GetCollectionsListingQueryVariables
  >(GET_COLLECTIONS_LISTING);

  const [isOutOfResults, setOutOfResults] = useState<boolean>(false);

  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      try {
        fetchMore({
          variables: {
            input: {
              skip: data?.getCollectionsListing?.length,
              limit: 20,
            },
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return prev;
            }

            if (!fetchMoreResult?.getCollectionsListing.length) {
              setOutOfResults(true);
            }

            return Object.assign({}, prev, {
              getCollectionsListing: [
                ...prev.getCollectionsListing,
                ...fetchMoreResult.getCollectionsListing,
              ],
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
    return <span>{error}</span>;
  }

  if (loading) {
    return <PageLoader message="Loading collections, please wait..." />;
  }

  if (data) {
    return (
      <>
        <Listing>
          {data?.getCollectionsListing?.map(collection => (
            <ListingItem key={collection?.id} collection={collection} />
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
            Loading more collections...
          </Flex>
        ) : (
          <Flex justifyContent="center" mt="s10">
            There are no more collections.
          </Flex>
        )}

        <CreateUpdateModal />
      </>
    );
  }

  return null;
};

export default ListingPage;
