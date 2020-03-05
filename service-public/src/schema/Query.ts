import { objectType, stringArg } from 'nexus';

export default objectType({
  name: 'Query',
  definition(t) {
    t.field('getCategories', {
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

    t.field('getPosts', {
      type: 'Post',
      list: true,
      args: {
        collectionId: stringArg(),
      },
      resolve: (_, { collectionId }, { prisma }) => {
        return prisma.post.findMany({
          where: {
            collection: {
              id: collectionId,
            },
          },
        });
      },
    });

    t.field('getPost', {
      type: 'Post',
      nullable: true,
      args: {
        postId: stringArg(),
      },
      resolve: (_, { postId }, { prisma }) => {
        return prisma.post.findOne({
          where: {
            id: postId,
          },
        });
      },
    });
  },
});
