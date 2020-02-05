import { FieldResolver } from 'nexus';
import axios from 'axios';

import { SlackAuthResponse } from '../../types/auth';
import { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET } from '../../config';

const authorizeWithSlack: FieldResolver<'Mutation', 'authorizeWithSlack'> = async (
  _,
  { code },
  { prisma }
) => {
  const slackAuthResponse = await axios
    .get<SlackAuthResponse>('https://slack.com/api/oauth.access', {
      params: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_id: SLACK_CLIENT_ID,
        // eslint-disable-next-line @typescript-eslint/camelcase
        client_secret: SLACK_CLIENT_SECRET,
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
};

export default authorizeWithSlack;
