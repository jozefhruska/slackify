/* eslint-disable @typescript-eslint/camelcase */
import { objectType, stringArg, idArg } from 'nexus';

import { authorizeWithSlack } from '../mutations/auth';

export const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' });
    t.crud.deleteOnePost();

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg({ nullable: false }),
        content: stringArg(),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, { prisma }) => {
        return prisma.posts.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        });
      },
    });

    t.field('authorizeWithSlack', {
      type: 'User',
      nullable: true,
      args: {
        code: stringArg(),
      },
      resolve: authorizeWithSlack,
    });

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: (_, { id }, { prisma }) => {
        return prisma.posts.update({
          where: { id },
          data: { published: true },
        });
      },
    });
  },
});
