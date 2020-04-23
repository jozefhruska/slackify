import { objectType, stringArg } from 'nexus';

import { signIn } from './auth';
import { deleteOneCollection } from './collections';

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
    t.crud.createOneCollection();
    t.crud.updateOneCollection();
    t.field('deleteOneCollection', {
      type: 'Collection',
      args: {
        where: 'CollectionWhereUniqueInput',
      },
      resolve: deleteOneCollection,
    });

    /* Components - Main */
    t.crud.createOneComponent();
    t.crud.updateOneComponent();
    t.crud.deleteOneComponent();
  },
});
