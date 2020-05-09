import React, { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import { Navigation, Content, Header, PageHeader, Sidebar } from '../src/components/common/layout';
import { User, GetUserQuery, GetUserQueryVariables } from '../src/types/generated/graphql';
import { StoreUser } from '../src/actions/auth';
import withApollo, { createApolloClient } from '../src/api';
import { getAuthToken } from '../src/cookies';
import { GET_USER } from '../src/api/query/users';
import WelcomePage from '../src/components/public/WelcomePage/WelcomePage';

/* Props - <HomePage />
============================================================================= */
type Props = {
  user: User;
};

/* <HomePage />
============================================================================= */
const HomePage: NextPage<Props> = ({ user }) => {
  const dispatch = useDispatch<Dispatch<StoreUser>>();

  useEffect(() => {
    dispatch({ type: '[AUTH] STORE_USER', payload: { user } });
  }, []);

  if (user) {
    return (
      <>
        <Header />
        <Navigation />
        <Sidebar user={user} />

        <Content>
          <PageHeader heading="Dashboard" />
        </Content>
      </>
    );
  }

  return <WelcomePage />;
};

/* getServerSideProps - <HomePage />
============================================================================= */
export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const authToken = getAuthToken(ctx);

  /* Create new instance of Apollo Client */
  const apolloClient = createApolloClient(authToken);

  /* Fetch user data */
  const { data } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
    query: GET_USER,
  });

  return { props: { user: data?.getUser } };
};

export default withApollo(HomePage);
