/* eslint-disable @typescript-eslint/camelcase */
import { objectType, stringArg, idArg } from 'nexus';
import axios from 'axios';

import { SlackAuthResponse } from '../types/auth';

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
      resolve: async (_, { code }, { photon }) => {
        const slackAuthResponse = await axios
          .get<SlackAuthResponse>('https://slack.com/api/oauth.access', {
            params: {
              client_id: '791343423090.804137961685',
              client_secret: '86a91fd3c50384313047d79be1afb7bc',
              code,
            },
          })
          .then(res => res.data)
          .catch(() => {
            throw new Error('Slack authorization failed (unable to fetch auth token).');
          });

        if (slackAuthResponse?.ok && slackAuthResponse.access_token && slackAuthResponse.user) {
          const existingUser = await photon.users.findOne({
            where: {
              id: slackAuthResponse.user.id,
            },
          });

          if (existingUser) {
            return photon.users.update({
              where: {
                id: slackAuthResponse.user.id,
              },
              data: {
                name: slackAuthResponse.user.name,
                email: slackAuthResponse.user.email,
                accessToken: slackAuthResponse.access_token,
              },
            });
          } else {
            return photon.users.create({
              data: {
                id: slackAuthResponse.user.id,
                name: slackAuthResponse.user.name,
                email: slackAuthResponse.user.email,
                accessToken: slackAuthResponse.access_token,
              },
            });
          }
        } else {
          throw new Error('Slack authorization failed (invalid auth response data).');
        }
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
