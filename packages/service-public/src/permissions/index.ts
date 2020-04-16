import { shield } from 'graphql-shield';

import { Context } from '..';
import { isTeamFound } from './rules';

export const permissions = shield<unknown, Context>({
  Query: {
    component: isTeamFound,
  },
});
