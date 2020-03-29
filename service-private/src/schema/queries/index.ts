import { objectType, inputObjectType } from 'nexus';

import { collections } from './collections';

export const PaginationInput = inputObjectType({
  name: 'PaginationInput',
  definition(t) {
    t.int('skip', { required: false });
    t.field('after', {
      type: 'CollectionWhereUniqueInput',
      required: false,
    });
    t.field('before', {
      type: 'CollectionWhereUniqueInput',
      required: false,
    });
    t.int('first', { required: false });
    t.int('last', { required: false });
  },
});

export const Query = objectType({
  name: 'Query',
  definition(t) {
    /* Auth */
    t.field('getUser', {
      type: 'User',
      nullable: true,
      resolve: (_parent, _args, { user }) => user,
    });

    t.field('collections', {
      type: 'Collection',
      list: true,
      args: {
        input: PaginationInput,
      },
      resolve: collections,
    });
  },
});
