import { queryType } from 'nexus';
import { resolveDashData } from './common';

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

    /* Statistics */
    t.crud.statRecords({
      filtering: true,
    });

    /* Common */
    t.field('dashData', {
      type: 'DashData',
      nullable: false,
      resolve: resolveDashData,
    });
  },
});
