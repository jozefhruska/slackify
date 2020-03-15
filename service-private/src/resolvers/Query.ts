import { objectType } from 'nexus';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('getUser', {
      type: 'User',
      nullable: true,
      resolve: (_parent, _args, { user }) => user,
    });
  },
});
