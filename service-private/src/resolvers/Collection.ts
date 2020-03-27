import { objectType } from 'nexus';

export const Collection = objectType({
  name: 'Collection',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.type();
    t.model.description();
    t.model.team();
    t.model.components();
    t.int('componentsCount', {
      resolve: async ({ id }, _args, { prisma }) => {
        const components = await prisma.component.findMany({
          where: {
            collection: {
              id,
            },
          },
        });

        return components.length;
      },
    });
  },
});
