import { objectType, stringArg, arg } from 'nexus';

import { signIn } from './auth';
import { deleteOneCollection } from './collections';

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    /* Users */
    t.crud.updateOneUser();
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
        where: arg({
          type: 'CollectionWhereUniqueInput',
          required: true,
        }),
      },
      resolve: deleteOneCollection,
    });

    /* Components - Main */
    t.crud.createOneComponent();
    t.crud.updateOneComponent();
    t.crud.deleteOneComponent();
  },
});
