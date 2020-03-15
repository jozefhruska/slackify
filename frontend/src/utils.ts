import { NextPageContext } from 'next';

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
export const loadUserData = async ({ apolloClient }: NextPageContext) => {
  try {
    /* Fetch user data */
    const { data } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
      query: GET_USER,
    });

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
