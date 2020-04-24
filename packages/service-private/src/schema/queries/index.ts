import { queryType } from 'nexus';

export const Query = queryType({
  definition(t) {
    /* Users */
    t.crud.users({
      filtering: {
        team: true,
      },
    });

    t.field('getUser', {
      type: 'User',
      nullable: true,
      resolve: (_parent, _args, { user }) => user,
    });

    /* Collections */
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
