import { NextPageContext } from 'next';
import Router from 'next/router';

import { ComponentType } from './types/generated/graphql';
import { getAuthToken } from './cookies';

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

/**
 * Checks if user is authenticated to view private pages.
 * @param ctx Next.js page context
 * @param isPrivatePage
 */
export const checkAuthentication = (ctx: Partial<NextPageContext>, isPrivatePage = true) => {
  const authToken = getAuthToken(ctx);

  /* Check authentication on private pages */
  if (isPrivatePage && !authToken) {
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

  /* Check authentication on public pages */
  if (!isPrivatePage && authToken) {
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
};

/**
 * Shortens a text if longer than threshold.
 * @param desc Input text
 * @param threshold Maximum length
 */
export const getShortenedText = (desc: string, threshold = 200): string => {
  if (desc.length >= threshold) {
    return desc.substr(0, threshold) + '...';
  }

  return desc;
};
