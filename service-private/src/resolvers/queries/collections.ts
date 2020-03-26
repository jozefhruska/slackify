import { FieldResolver } from 'nexus';

export const getCollections: FieldResolver<'Query', 'getCollections'> = async (
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
