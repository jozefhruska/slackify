/* eslint-disable @typescript-eslint/camelcase */
import { objectType, stringArg, idArg } from 'nexus';
import axios from 'axios';

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
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.photon.posts.create({
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
      resolve: async (_, { code }) => {
        const userData = await axios
          .get('https://slack.com/api/oauth.access', {
            params: {
              client_id: '791343423090.804137961685',
              client_secret: '86a91fd3c50384313047d79be1afb7bc',
              code,
            },
          })
          .then(res => res.data);

        console.log(userData);

        return userData;
      },
    });

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.photon.posts.update({
          where: { id },
          data: { published: true },
        });
      },
    });
  },
});
