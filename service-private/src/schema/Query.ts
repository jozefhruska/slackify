import { objectType } from 'nexus';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('teams', {
      type: 'Team',
      resolve: (parent, args, { prisma }) => {
        return prisma.team.findMany();
      },
    });
  },
});
