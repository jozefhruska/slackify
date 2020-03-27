import { objectType, stringArg } from 'nexus';

import { signIn } from './auth';
import { deleteCollection } from './collections';

export * from './auth';

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    /* Auth */
    t.field('signIn', {
      type: 'SignInOutput',
      nullable: true,
      args: {
        code: stringArg({
          required: true,
        }),
      },
      resolve: signIn,
    });

    /* Collections */
    t.field('deleteCollection', {
      type: 'Collection',
      args: {
        collectionId: stringArg({
          required: true,
        }),
      },
      resolve: deleteCollection,
    });

    t.crud.updateOneCollection();
  },
});
