import { objectType } from 'nexus';

import { collections } from './collections';
import { components } from './components';
import { ComponentsListingInput, CollectionsListingInput } from '../types';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    /* Auth */
    t.field('getUser', {
      type: 'User',
      nullable: true,
      resolve: (_parent, _args, { user }) => user,
    });

    /* Collections */
    t.field('collections', {
      type: 'Collection',
      list: true,
      args: {
        input: CollectionsListingInput,
      },
      resolve: collections,
    });

    t.crud.collection();

    /* Components */
    t.field('components', {
      type: 'Component',
      list: true,
      args: {
        input: ComponentsListingInput,
      },
      resolve: components,
    });

    t.crud.component();
  },
});
