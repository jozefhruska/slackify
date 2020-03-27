import { objectType, inputObjectType } from 'nexus';

import { getCollectionsListing } from './collections';

export const PaginationInput = inputObjectType({
  name: 'PaginationInput',
  definition(t) {
    t.int('skip', { required: false });
    t.int('limit', { required: false });
  },
});

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('getUser', {
      type: 'User',
      nullable: true,
      resolve: (_parent, _args, { user }) => user,
    });

    t.field('getCollectionsListing', {
      type: 'Collection',
      list: true,
      args: {
        input: PaginationInput,
      },
      resolve: getCollectionsListing,
    });
  },
});
