import { objectType, stringArg } from 'nexus';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.field('getCollections', {
      type: 'Collection',
      list: true,
      resolve: (_parent, _args, { prisma, team }) => {
        return prisma.collection.findMany({
          where: {
            team: {
              id: team.id,
            },
          },
        });
      },
    });

    t.field('getCollection', {
      type: 'Collection',
      nullable: true,
      args: {
        collectionId: stringArg(),
      },
      resolve: (_, { collectionId }, { prisma }) => {
        return prisma.collection.findOne({
          where: {
            id: collectionId,
          },
        });
      },
    });

    t.field('getComponents', {
      type: 'Component',
      list: true,
      args: {
        collectionId: stringArg(),
      },
      resolve: (_, { collectionId }, { prisma }) => {
        return prisma.component.findMany({
          where: {
            collection: {
              id: collectionId,
            },
          },
        });
      },
    });

    t.field('getComponent', {
      type: 'Component',
      nullable: true,
      args: {
        componentId: stringArg(),
      },
      resolve: (_, { componentId }, { prisma }) => {
        return prisma.component.findOne({
          where: {
            id: componentId,
          },
        });
      },
    });
  },
});
