import { shield, not, and } from 'graphql-shield';

import { Context } from '..';
import { isAuthenticated, canManageCollection } from './rules';
import { NODE_ENV } from '../config';

export const permissions = shield<unknown, Context>(
  {
    Query: {
      collections: isAuthenticated,
    },
    Mutation: {
      /* Auth */
      signIn: not(isAuthenticated, 'Request is available to non-authenticated users.'),

      /* Collections */
      createOneCollection: isAuthenticated,
      updateOneCollection: and(isAuthenticated, canManageCollection),
      deleteOneCollection: and(isAuthenticated, canManageCollection),
    },
  },
  {
    debug: NODE_ENV !== 'production',
  }
);
