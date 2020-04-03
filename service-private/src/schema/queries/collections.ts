import { FieldResolver } from 'nexus';

/**
 * Handles query for collections listing with pagination.
 */
export const collections: FieldResolver<'Query', 'collections'> = async (
  _,
  { input } = {},
  { team, prisma }
) => {
  return prisma.collection.findMany({
    where: {
      team: {
        id: team?.id,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    ...input?.pagination,
  });
};
