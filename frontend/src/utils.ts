import { NextPageContext } from 'next';
import Router from 'next/router';

import {
  GetUserQuery,
  GetUserQueryVariables,
  UserQuery,
  UserQueryVariables,
} from './types/generated/graphql';
import { GET_USER } from './api/query/auth';
import { USER } from './schema/auth';

/**
 * Fetches and stores user data.
 * @param param0 Next JS page context
 */
export const loadUserData = async (
  { apolloClient, req, res }: NextPageContext,
  isPrivate = true
) => {
  try {
    /* Fetch user data */
    const { data } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
      query: GET_USER,
    });

    /* Check if used is authorized to view the page */
    if (isPrivate && !data?.getUser) {
      /* Redirect on server */
      if (req && res) {
        res.writeHead(302, { Location: '/' });
        res.end();
        return;
      }

      /* Redirect on client */
      Router.push('/');
    }

    /* Store user data to local state */
    apolloClient.writeQuery<UserQuery, UserQueryVariables>({
      query: USER,
      data: {
        user: data.getUser,
      },
    });
  } catch (error) {
    console.error(error);
  }
};
