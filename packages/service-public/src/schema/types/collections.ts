import { objectType } from 'nexus';

export const Collection = objectType({
  name: 'Collection',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.type();
    t.model.published();
    t.model.description();
    t.model.components();
    t.model.updatedAt();
    t.model.createdAt();
    t.int('componentsCount', {
      resolve: async ({ id }, _args, { prisma }) => {
        return prisma.component.count({
          where: {
            collection: {
              id,
            },
          },
        });
      },
    });
  },
});
