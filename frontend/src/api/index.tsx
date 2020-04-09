import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import withApollo from 'next-with-apollo';

import { API_URL } from '../config';
import { getAuthToken } from '../cookies';

export type AppCache = {};

export const createApolloClient = (
  authToken: string,
  initialState: AppCache = {},
  ssrMode = true
) => {
  const cache = new InMemoryCache().restore(initialState ?? {});

  /* Create new Apollo Client instance */
  const client = new ApolloClient({
    ssrMode,
    link: new HttpLink({
      uri: API_URL ?? 'http://localhost:5000',
      credentials: 'same-origin',
      headers: {
        ...(Boolean(authToken) && { Authorization: 'Bearer ' + authToken }),
      },
      fetch,
    }),
    cache,
  });

  return client;
};

export default withApollo(
  ({ initialState, ctx }) => {
    const authToken = getAuthToken(ctx);
    return createApolloClient(authToken, initialState, Boolean(ctx));
  },
  {
    // eslint-disable-next-line react/display-name
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
