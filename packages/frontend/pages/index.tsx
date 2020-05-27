import React, { useEffect } from 'react';
import { NextPage, GetServerSideProps } from 'next';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';

import {
  GetUserQuery,
  GetUserQueryVariables,
  UserDetailFragment,
} from '../src/types/generated/graphql';
import { StoreUser } from '../src/actions/auth';
import withApollo, { createApolloClient } from '../src/api';
import { getAuthToken, removeAuthToken } from '../src/cookies';
import { GET_USER } from '../src/api/query/users';
import WelcomePage from '../src/components/public/WelcomePage/WelcomePage';
import Dashboard from '../src/components/common/Dashboard';

/* Props - <HomePage />
============================================================================= */
type Props = {
  user: UserDetailFragment;
};

/* <HomePage />
============================================================================= */
const HomePage: NextPage<Props> = ({ user }) => {
  const dispatch = useDispatch<Dispatch<StoreUser>>();

  useEffect(() => {
    dispatch({ type: '[AUTH] STORE_USER', payload: { user } });
  }, []);

  if (!user) {
    return <WelcomePage />;
  }

  return <Dashboard />;
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

  /* Remove auth token if user was not found */
  if (!data?.getUser) {
    removeAuthToken(ctx);
  }

  return { props: { user: data?.getUser } };
};

export default withApollo(HomePage);
