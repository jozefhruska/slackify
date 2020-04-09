import { FieldResolver } from 'nexus';

/**
 * Handles query for components listing with pagination.
 */
export const components: FieldResolver<'Query', 'components'> = async (
  _,
  { input },
  { team, prisma }
) => {
  return prisma.component.findMany({
    where: {
      team: {
        id: team?.id,
      },
      collection: {
        id: input?.collectionId,
      },
      author: {
        id: input?.authorId,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      plainTextData: true,
      articleData: true,
      linkData: true,
    },
    ...input?.pagination,
  });
};
