/* eslint-disable @typescript-eslint/camelcase */
import { objectType, stringArg, idArg } from 'nexus';
import axios from 'axios';

import { SlackAuthResponse } from '../types/auth';
import { CLIENT_SECRET, CLIENT_ID } from '../config';

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
      resolve: async (_, { code }, { prisma }) => {
        const slackAuthResponse = await axios
          .get<SlackAuthResponse>('https://slack.com/api/oauth.access', {
            params: {
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              code,
            },
          })
          .then(res => res.data)
          .catch(() => {
            throw new Error('Slack authorization failed (unable to fetch auth token).');
          });

        if (slackAuthResponse?.ok && slackAuthResponse.access_token && slackAuthResponse.user) {
          const existingUser = await prisma.users.findOne({
            where: {
              id: slackAuthResponse.user.id,
            },
          });

          if (existingUser) {
            return prisma.users.update({
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
            return prisma.users.create({
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
      resolve: (_, { id }, { prisma }) => {
        return prisma.posts.update({
          where: { id },
          data: { published: true },
        });
      },
    });
  },
});
