import { shield } from 'graphql-shield';

import { Context } from '..';
import { isAuthenticated } from './rules';

export const permissions = shield<unknown, Context>({
  Query: {
    getCollections: isAuthenticated,
  },
  Mutation: {
    deleteCollection: isAuthenticated,
  },
});
