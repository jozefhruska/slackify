import React, { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import {
  Navigation,
  Content,
  Header,
  PageHeader,
  Sidebar,
  PageSubHeader,
} from '../src/components/common/layout';
import {
  GetUserQuery,
  GetUserQueryVariables,
  UserDetailFragment,
  GetDashDataQuery,
  GetDashDataQueryVariables,
} from '../src/types/generated/graphql';
import { StoreUser } from '../src/actions/auth';
import withApollo, { createApolloClient } from '../src/api';
import { getAuthToken } from '../src/cookies';
import { GET_USER } from '../src/api/query/users';
import WelcomePage from '../src/components/public/WelcomePage/WelcomePage';
import { Button, Alert, ListingLoader } from '../src/components/common/misc';
import { Box, Flex } from '../src/components/common/layout/base';
import { useRouter } from 'next/router';
import { OneRowListing } from '../src/components/common/layout/Listing/Listing';
import { useQuery } from '@apollo/client';
import { ListingItem as CollectionListingItem } from '../src/components/collections/listing';
import { ListingItem } from '../src/components/components/listing';
import { GET_DASH_DATA } from '../src/api/query/common';
import { default as CollectionCreateUpdateModal } from '../src/components/collections/CreateUpdateModal/CreateUpdateModal';
import { default as ComponentCreateUpdateModal } from '../src/components/components/CreateUpdateModal/CreateUpdateModal';
import { Paragraph } from '../src/components/common/typography';
import { FiPlus } from 'react-icons/fi';
import { OpenCreateUpdateModal as OpenCollectionCreateUpdateModal } from '../src/actions/collections';
import { OpenCreateUpdateModal as OpenComponentCreateUpdateModal } from '../src/actions/components';

/* Props - <HomePage />
============================================================================= */
type Props = {
  user: UserDetailFragment;
};

/* <HomePage />
============================================================================= */
const HomePage: NextPage<Props> = ({ user }) => {
  const dispatch = useDispatch<
    Dispatch<StoreUser | OpenCollectionCreateUpdateModal | OpenComponentCreateUpdateModal>
  >();

  const { data, error: dashError, loading: dashLoading, refetch } = useQuery<
    GetDashDataQuery,
    GetDashDataQueryVariables
  >(GET_DASH_DATA, {
    pollInterval: 4000,
  });

  const { push } = useRouter();

  useEffect(() => {
    dispatch({ type: '[AUTH] STORE_USER', payload: { user } });

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
      <ListingItem key={component.id} component={component} />
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
      <ListingItem key={component.id} component={component} onDelete={refetch} />
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

  if (!user) {
    return <WelcomePage />;
  }

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

/* getServerSideProps - <HomePage />
============================================================================= */
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const authToken = getAuthToken(ctx);

  /* Return user as null if there's no auth token in cookies */
  if (!authToken) {
    return {
      props: {
        user: null,
      },
    };
  }

  /* Create new instance of Apollo Client */
  const apolloClient = createApolloClient(authToken);

  /* Fetch user data */
  const { data } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
    query: GET_USER,
  });

  return { props: { user: data?.getUser } };
};

export default withApollo(HomePage);
