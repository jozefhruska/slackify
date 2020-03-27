import { FieldResolver } from 'nexus';

/**
 * Handles query for collections listing with pagination.
 */
export const getCollectionsListing: FieldResolver<'Query', 'getCollectionsListing'> = async (
  _parent,
  { input },
  { team, prisma }
) => {
  /* Start at the beginning if no arguments passes */
  const skip = input?.skip ?? 0;
  const first = input?.limit ?? 40;

  return prisma.collection.findMany({
    where: {
      team: {
        id: team?.id,
      },
    },
    skip,
    first,
  });
};
