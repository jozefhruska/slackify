import { shield, and } from 'graphql-shield';

import { Context } from '..';
import { isTeamFound, isComponentOwner, isCollectionOwner } from './rules';

export const permissions = shield<unknown, Context>(
  {
    Query: {
      collections: isTeamFound,
      collection: and(isTeamFound, isCollectionOwner),
      components: isTeamFound,
      component: and(isTeamFound, isComponentOwner),
    },
  },
  {
    debug: true,
  }
);
