import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { NextPage, GetServerSideProps } from 'next';
import { FiPlus } from 'react-icons/fi';
import Router from 'next/router';

import {
  Content,
  Navigation,
  PageHeader,
  Header,
  Sidebar,
} from '../../src/components/common/layout';
import withApollo, { createApolloClient } from '../../src/api';
import { checkAuthentication } from '../../src/utils';
import { User, GetUserQuery, GetUserQueryVariables } from '../../src/types/generated/graphql';
import { StoreUser } from '../../src/actions/auth';
import ListingPage from '../../src/components/components/listing/ListingPage/ListingPage';
import { OpenCreateUpdateModal } from '../../src/actions/components';
import { getAuthToken, removeAuthToken } from '../../src/cookies';
import { GET_USER } from '../../src/api/query/auth';
import { Button } from '../../src/components/common/misc';

/* Props - <ComponentsPage />
============================================================================= */
type Props = {
  user: User;
};

/* <ComponentsPage />
============================================================================= */
const ComponentsPage: NextPage<Props> = ({ user }) => {
  const dispatch = useDispatch<Dispatch<StoreUser | OpenCreateUpdateModal>>();

  useEffect(() => {
    dispatch({ type: '[AUTH] STORE_USER', payload: { user } });
  }, []);

  return (
    <>
      <Header />
      <Navigation />
      <Sidebar user={user} />

      <Content>
        <PageHeader
          heading="Components"
          breadcrumbs={[
            {
              text: 'Components',
            },
          ]}
        >
          <Button
            icon={<FiPlus />}
            variant="brand"
            width="100%"
            onClick={() => {
              dispatch({
                type: '[COMPONENTS] OPEN_CREATE_UPDATE_MODAL',
                payload: {
                  state: {
                    mode: 'create',
                  },
                },
              });
            }}
          >
            Create new component
          </Button>
        </PageHeader>

        <ListingPage user={user} />
      </Content>
    </>
  );
};

/* getServerSideProps - <ComponentsPage />
============================================================================= */
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const authToken = getAuthToken(ctx);

  /* Check if user is authenticated */
  checkAuthentication(ctx);

  /* Create new instance of Apollo Client */
  const apolloClient = createApolloClient(authToken);

  /* Fetch user data */
  const { data } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
    query: GET_USER,
  });

  /* Check if user data were returned */
  if (!data?.getUser) {
    removeAuthToken(ctx);

    /* Redirect on server */
    if (ctx?.req && ctx?.res) {
      ctx?.res.writeHead(302, { Location: '/' });
      ctx?.res.end();
      return;
    }

    /* Redirect on client */
    Router.push('/');
    return;
  }

  return { props: { user: data?.getUser } };
};

export default withApollo(ComponentsPage);
