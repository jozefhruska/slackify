import { shield, not } from 'graphql-shield';

import { Context } from '..';
import { isAuthenticated } from './rules';

export const permissions = shield<unknown, Context>({
  Mutation: {
    signIn: not(isAuthenticated),
  },
});
