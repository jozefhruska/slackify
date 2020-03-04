import { objectType, stringArg } from 'nexus';
import axios from 'axios';

import { SlackAuthResponse } from '../types/auth';
import { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } from '../config';

export default objectType({
  name: 'Mutation',
  definition(t) {
    t.field('signIn', {
      type: 'User',
      args: {
        code: stringArg(),
      },
      resolve: async (_, { code }, { prisma }) => {
        try {
          const slackAuthResponse = await axios
            .get<SlackAuthResponse>('https://slack.com/api/oauth.access', {
              params: {
                client_id: SLACK_CLIENT_ID,
                client_secret: SLACK_CLIENT_SECRET,
                code,
              },
            })
            .then(res => res.data)
            .catch(() => {
              throw new Error('Slack authorization failed (unable to fetch auth token).');
            });

          const user = slackAuthResponse.user;
          const accessToken = slackAuthResponse.access_token;
          const teamId = slackAuthResponse.team_id;

          if (user === undefined || accessToken === undefined) {
            throw new Error('Slack authorization failed (invalid auth response data).');
          }

          if (slackAuthResponse.ok) {
            const existingUser = await prisma.user.findOne({
              where: {
                id: user.id,
              },
            });

            if (existingUser) {
              return prisma.user.update({
                where: {
                  id: user.id,
                },
                data: {
                  name: user.name,
                  email: user.email,
                  accessToken,
                },
              });
            } else {
              return prisma.user.create({
                data: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  accessToken,
                  team: {
                    connect: {
                      id: teamId,
                    },
                  },
                },
              });
            }
          } else {
            throw new Error('Slack authorization failed (response not ok).');
          }
        } catch (error) {
          console.error(error);
        }
      },
    });
  },
});
