import React, { Dispatch, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch } from 'react-redux';

import { Header, Navigation, Sidebar, PageHeader, Content } from '../src/components/common/layout';
import {
  UserDetailFragment,
  GetUserQuery,
  GetUserQueryVariables,
} from '../src/types/generated/graphql';
import { getAuthToken, removeAuthToken } from '../src/cookies';
import { checkAuthentication } from '../src/utils';
import withApollo, { createApolloClient } from '../src/api';
import { GET_USER } from '../src/api/query/users';
import { StoreUser } from '../src/actions/auth';
import { OpenCreateUpdateModal } from '../src/actions/collections';
import { ListingPage } from '../src/components/users/listing';

/* Props - <UsersPage />
============================================================================= */
type Props = {
  user: UserDetailFragment;
};

/* <UsersPage />
============================================================================= */
const UsersPage: React.FC<Props> = ({ user }) => {
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
          heading="Users"
          breadcrumbs={[
            {
              text: 'Users',
            },
          ]}
        />

        <ListingPage user={user} />
      </Content>
    </>
  );
};

/* getServerSideProps - <UsersPage />
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

    /* Redirect */
    ctx?.res.writeHead(302, { Location: '/?sessionExpired=true' });
    ctx?.res.end();
    return;
  }

  return { props: { user: data?.getUser } };
};

export default withApollo(UsersPage);
