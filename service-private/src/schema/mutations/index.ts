import { objectType, stringArg } from 'nexus';

import { signIn } from './auth';

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
    t.crud.deleteOneCollection();
  },
});
