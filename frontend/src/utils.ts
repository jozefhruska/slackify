import { NextPageContext } from 'next';
import Router from 'next/router';

import {
  GetUserQuery,
  GetUserQueryVariables,
  ComponentType,
  User,
} from './types/generated/graphql';
import { GET_USER } from './api/query/auth';
import { getAuthToken, removeAuthToken } from './cookies';

/**
 * Fetches and stores user data.
 * @param param0 Next JS page context
 */
export const loadUserData = async (
  ctx: NextPageContext,
  isPrivate = true
): Promise<{ user: User }> => {
  const { apolloClient, req, res } = ctx;
  const authToken = getAuthToken(ctx);

  try {
    /* Check if used is authenticated to view the page */
    if (isPrivate && !authToken) {
      /* Redirect on server */
      if (req && res) {
        res.writeHead(302, { Location: '/' });
        res.end();
        return;
      }

      /* Redirect on client */
      Router.push('/');
    }

    /* Fetch user data */
    const { data } = await apolloClient.query<GetUserQuery, GetUserQueryVariables>({
      query: GET_USER,
    });

    /* Check if user data were received */
    if (isPrivate && !data?.getUser) {
      removeAuthToken(ctx);

      /* Redirect on server */
      if (req && res) {
        res.writeHead(302, { Location: '/' });
        res.end();
        return;
      }

      /* Redirect on client */
      Router.push('/');
    }

    return { user: data?.getUser };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Converts component type enum to human readable string.
 * @param componentType Component type
 */
export const humanizeComponentType = (componentType: ComponentType) => {
  switch (componentType) {
    case ComponentType['PlainText']: {
      return 'Plain text';
    }

    case ComponentType['Article']: {
      return 'Article';
    }

    case ComponentType['Link']: {
      return 'Link';
    }
  }
};
