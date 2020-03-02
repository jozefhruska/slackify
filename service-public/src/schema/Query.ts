import { objectType, stringArg } from 'nexus';

export default objectType({
  name: 'Query',
  definition(t) {
    t.field('getCategories', {
      type: 'Category',
      list: true,
      args: {
        teamId: stringArg(),
      },
      resolve: (_, { teamId }, { prisma }) => {
        return prisma.category.findMany({
          where: {
            team: {
              id: teamId,
            },
          },
        });
      },
    });
  },
});
