import { objectType } from 'nexus';

export default objectType({
  name: 'Query',
  definition(t) {
    t.field('getUser', {
      type: 'User',
      nullable: true,
      resolve: (_parent, _args, { user }) => user,
    });

    t.field('getTeam', {
      type: 'Team',
      nullable: true,
      resolve: (_parent, _args, { team }) => team,
    });
  },
});
