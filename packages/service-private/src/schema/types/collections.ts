import { objectType, inputObjectType } from 'nexus';

export const CollectionsListingInput = inputObjectType({
  name: 'CollectionsListingInput',
  definition(t) {
    t.field('pagination', {
      type: 'PaginationInput',
    });
  },
});

export const Collection = objectType({
  name: 'Collection',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.type();
    t.model.state();
    t.model.published();
    t.model.description();
    t.model.team();
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
