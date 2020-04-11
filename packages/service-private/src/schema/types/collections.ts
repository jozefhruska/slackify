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
    t.model.published();
    t.model.description();
    t.model.team();
    t.model.components();
    t.model.updatedAt();
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
