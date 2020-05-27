import React, { useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { Box, Flex } from './layout/base';
import { Header, Navigation, Sidebar, PageHeader, PageSubHeader, Content } from './layout';
import { Alert, Button, ListingLoader } from './misc';
import { OneRowListing } from './layout/Listing/Listing';
import { Paragraph } from './typography';
import { GetDashDataQuery, GetDashDataQueryVariables } from '../../types/generated/graphql';
import { GET_DASH_DATA } from '../../api/query/common';
import { ListingItem as CollectionListingItem } from '../collections/listing';
import { ListingItem as ComponentListingItem } from '../components/listing';
import { OpenCreateUpdateModal as OpenCollectionCreateUpdateModal } from '../../actions/collections';
import { OpenCreateUpdateModal as OpenComponentCreateUpdateModal } from '../../actions/components';
import { default as ComponentCreateUpdateModal } from '../components/CreateUpdateModal/CreateUpdateModal';
import { default as CollectionCreateUpdateModal } from '../collections/CreateUpdateModal/CreateUpdateModal';
import { selectUser } from '../../selectors/auth';

/* <Dashboard />
============================================================================= */
const Dashboard: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch<
    Dispatch<OpenCollectionCreateUpdateModal | OpenComponentCreateUpdateModal>
  >();

  const { data, error: dashError, loading: dashLoading, refetch } = useQuery<
    GetDashDataQuery,
    GetDashDataQueryVariables
  >(GET_DASH_DATA, {
    pollInterval: 4000,
  });

  const { push } = useRouter();

  useEffect(() => {
    refetch();
  }, []);

  const renderComponentStatsListing = () => {
    if (dashLoading) {
      return (
        <Flex justifyContent="center">
          <ListingLoader />
        </Flex>
      );
    }

    if (!data?.dashData?.requestedComponents.length) {
      return null;
    }

    return data.dashData.requestedComponents.map((component) => (
      <ComponentListingItem key={component.id} component={component} />
    ));
  };

  const renderComponentsListing = () => {
    if (dashLoading) {
      return (
        <Flex justifyContent="center">
          <ListingLoader />
        </Flex>
      );
    }

    if (!data?.dashData?.createdComponents.length) {
      return null;
    }

    return data.dashData.createdComponents.map((component) => (
      <ComponentListingItem key={component.id} component={component} onDelete={refetch} />
    ));
  };

  const renderCollectionsListing = () => {
    if (dashLoading) {
      return (
        <Flex justifyContent="center">
          <ListingLoader />
        </Flex>
      );
    }

    if (!data?.dashData?.createdCollections.length) {
      return null;
    }

    return data.dashData.createdCollections.map((collection) => (
      <CollectionListingItem key={collection.id} collection={collection} onDelete={refetch} />
    ));
  };

  return (
    <>
      <Header />
      <Navigation />
      <Sidebar user={user} />

      <Content>
        <PageHeader heading="Dashboard" />
        {dashError ? (
          <Alert type="danger">{dashError.message}</Alert>
        ) : (
          <>
            <Box as="section" mb="s8">
              <PageSubHeader heading="Recently requested components"></PageSubHeader>

              {data?.dashData?.requestedComponents.length === 0 ? (
                <Flex justifyContent="center">
                  <span>There are no recently requested components.</span>
                </Flex>
              ) : (
                <OneRowListing>{renderComponentStatsListing()}</OneRowListing>
              )}
            </Box>
            <Box as="section" mb="s8">
              <PageSubHeader heading="Recently created components">
                <Button onClick={() => push('/components')} variant="brand">
                  View all components
                </Button>
              </PageSubHeader>

              {data?.dashData?.createdComponents.length === 0 ? (
                <Flex flexDirection="column" alignItems="center">
                  <Paragraph>There are no recently created components.</Paragraph>
                  <Button
                    icon={<FiPlus />}
                    onClick={() =>
                      dispatch({
                        type: '[COMPONENTS] OPEN_CREATE_UPDATE_MODAL',
                        payload: {
                          state: {
                            mode: 'create',
                          },
                        },
                      })
                    }
                  >
                    Create new component
                  </Button>
                </Flex>
              ) : (
                <OneRowListing>{renderComponentsListing()}</OneRowListing>
              )}
            </Box>
            <Box as="section" mb="s8">
              <PageSubHeader heading="Recently created collections">
                <Button onClick={() => push('/collections')} variant="brand">
                  View all collections
                </Button>
              </PageSubHeader>

              {data?.dashData?.createdCollections.length === 0 ? (
                <Flex flexDirection="column" alignItems="center">
                  <Paragraph>There are no recently created collections.</Paragraph>
                  <Button
                    icon={<FiPlus />}
                    onClick={() =>
                      dispatch({
                        type: '[COLLECTIONS] OPEN_CREATE_UPDATE_MODAL',
                        payload: {
                          state: {
                            mode: 'create',
                          },
                        },
                      })
                    }
                  >
                    Create new collection
                  </Button>
                </Flex>
              ) : (
                <OneRowListing>{renderCollectionsListing()}</OneRowListing>
              )}
            </Box>
          </>
        )}
      </Content>

      <ComponentCreateUpdateModal />
      <CollectionCreateUpdateModal />
    </>
  );
};

export default Dashboard;
