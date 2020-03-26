import { FieldResolver } from 'nexus';

/**
 * Resolves delete collection mutation.
 */
export const deleteCollection: FieldResolver<'Mutation', 'deleteCollection'> = async (
  _,
  { collectionId },
  { prisma }
) => {
  return prisma.collection.delete({
    where: {
      id: collectionId,
    },
  });
};
