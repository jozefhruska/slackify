import { FieldResolver } from 'nexus';

/**
 * Deletes collection and all of it's child components.
 */
export const deleteOneCollection: FieldResolver<'Mutation', 'deleteOneCollection'> = async (
  _parent,
  { where },
  { prisma }
) => {
  /* Delete all child components */
  await prisma.component.deleteMany({
    where: {
      collection: {
        id: {
          equals: where?.id,
        },
      },
    },
  });

  /* Delete collection */
  return prisma.collection.delete({
    where,
  });
};
