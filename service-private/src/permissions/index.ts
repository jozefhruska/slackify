import { shield, not } from 'graphql-shield';

import { Context } from '..';
import { isAuthenticated } from './rules';
import { NODE_ENV } from '../config';

export const permissions = shield<unknown, Context>(
  {
    Query: {
      getCollectionsListing: isAuthenticated,
    },
    Mutation: {
      signIn: not(isAuthenticated, 'Request is available to non-authenticated users.'),
      deleteCollection: isAuthenticated,
      updateOneCollection: isAuthenticated,
    },
  },
  {
    debug: NODE_ENV !== 'production',
  }
);
