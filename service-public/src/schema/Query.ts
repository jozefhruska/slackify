import { objectType, stringArg } from 'nexus';

export default objectType({
  name: 'Query',
  definition(t) {
    t.field('getCategories', {
      type: 'Category',
      list: true,
      resolve: (_parent, _args, { prisma, team }) => {
        return prisma.category.findMany({
          where: {
            team: {
              id: team.id,
            },
          },
        });
      },
    });

    t.field('getCategory', {
      type: 'Category',
      nullable: true,
      args: {
        categoryId: stringArg(),
      },
      resolve: (_, { categoryId }, { prisma }) => {
        return prisma.category.findOne({
          where: {
            id: categoryId,
          },
        });
      },
    });

    t.field('getPosts', {
      type: 'Post',
      list: true,
      args: {
        categoryId: stringArg(),
      },
      resolve: (_, { categoryId }, { prisma }) => {
        return prisma.post.findMany({
          where: {
            category: {
              id: categoryId,
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
