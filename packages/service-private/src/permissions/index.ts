import { shield, not, and } from 'graphql-shield';

import { Context } from '..';
import { isAuthenticated, canManageCollection } from './rules';
import { NODE_ENV } from '../config';

export const permissions = shield<unknown, Context>(
  {
    Query: {
      /* Users */
      users: isAuthenticated,
      getUser: isAuthenticated,

      /* Collections */
      collections: isAuthenticated,
      collection: isAuthenticated,

      /* Components */
      components: isAuthenticated,
      component: isAuthenticated,
    },
    Mutation: {
      /* Users */
      updateOneUser: isAuthenticated,
      signIn: not(isAuthenticated, 'Request is only available to non-authenticated users.'),

      /* Collections */
      createOneCollection: isAuthenticated,
      updateOneCollection: and(isAuthenticated, canManageCollection),
      deleteOneCollection: and(isAuthenticated, canManageCollection),

      /* Components */
      createOneComponent: isAuthenticated,
      updateOneComponent: isAuthenticated,
      deleteOneComponent: isAuthenticated,
    },
  },
  {
    debug: NODE_ENV !== 'production',
  }
);
