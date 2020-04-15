import { objectType } from 'nexus';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    /* Auth */
    t.field('getUser', {
      type: 'User',
      nullable: true,
      resolve: (_parent, _args, { user }) => user,
    });

    t.crud.collections({
      filtering: {
        id: true,
        team: true,
      },
    });

    t.crud.collection();

    /* Components */
    t.crud.components({
      filtering: {
        id: true,
        author: true,
        team: true,
        collection: true,
      },
    });

    t.crud.component();
  },
});
