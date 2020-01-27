import { objectType, stringArg } from 'nexus';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.users();

    t.crud.post({
      alias: 'post',
    });

    t.crud.posts({
      alias: 'posts',
    });

    t.list.field('feed', {
      type: 'Post',
      resolve: (_, args, { prisma }) => {
        return prisma.posts.findMany({
          where: { published: true },
        });
      },
    });

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, { prisma }) => {
        return prisma.posts.findMany({
          where: {
            OR: [{ title: { contains: searchString } }, { content: { contains: searchString } }],
          },
        });
      },
    });
  },
});
