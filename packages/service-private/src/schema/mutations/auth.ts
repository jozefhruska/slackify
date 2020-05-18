import { FieldResolver } from 'nexus';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { createHash, randomBytes } from 'crypto';

import { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, SIGNING_SECRET } from '../../config';
import {
  SlackAuthResponse,
  SlackUserIdentityResponse,
  SlackAuthTestResponse,
} from '../../types/auth';

/**
 * Signs in user using Slack API.
 */
export const signIn: FieldResolver<'Mutation', 'signIn'> = async (
  _,
  { code, redirect_host },
  { prisma }
) => {
  const authResponse = await axios
    .get<SlackAuthResponse>('https://slack.com/api/oauth.v2.access', {
      params: {
        client_id: SLACK_CLIENT_ID,
        client_secret: SLACK_CLIENT_SECRET,
        code,
        redirect_uri: redirect_host
          ? `${redirect_host}/auth/redirect`
          : 'https://slackify.now.sh/auth/redirect',
      },
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
      throw new Error('Something went wrong. Please try again later.');
    });

  /* Check if response is OK */
  if (!authResponse?.ok) {
    throw new Error(`Invalid response from Slack (code: "${authResponse?.error}").`);
  }

  /* Check if token type is correct */
  if (authResponse?.authed_user?.token_type !== 'user') {
    throw new Error(
      `Wrong access token type "${authResponse?.authed_user?.token_type}" (expected "user").`
    );
  }

  /* Extract user token */
  const userToken = authResponse.authed_user.access_token;

  if (!userToken) {
    throw new Error('Unable to extract user access token from Slack response.');
  }

  /* Extract team ID */
  const teamId = authResponse.team?.id;

  if (!teamId) {
    throw new Error('Unable to extract team ID from Slack response.');
  }

  /* Get user data */
  const slackUser = await axios
    .get<SlackUserIdentityResponse>('https://slack.com/api/users.identity', {
      params: {
        token: userToken,
      },
    })
    .then(({ data }) => data.user)
    .catch((error) => {
      console.error(error);
      throw new Error('Something went wrong. Please try again later.');
    });

  /* Create/update user */
  try {
    const user = await prisma.user.upsert({
      where: {
        id: slackUser.id,
      },
      create: {
        id: slackUser.id,
        name: slackUser.name,
        email: slackUser.email,
        accessToken: userToken,
        avatar: slackUser.image_72,
        team: {
          connect: {
            id: teamId,
          },
        },
      },
      update: {
        name: slackUser.name,
        email: slackUser.email,
        accessToken: userToken,
        avatar: slackUser.image_72,
      },
    });

    const authToken = jwt.sign(
      {
        data: {
          id: slackUser.id,
          name: slackUser.name,
          email: slackUser.email,
          userToken,
        },
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },
      SIGNING_SECRET
    );

    return {
      authToken,
      user,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Something went wrong. Please try again later.');
  }
};

/**
 * Adds a new team (workspace) to Slackify.
 */
export const addToSlack: FieldResolver<'Mutation', 'addToSlack'> = async (
  _,
  { code, redirect_host },
  { prisma }
) => {
  const authResponse = await axios
    .get<SlackAuthResponse>('https://slack.com/api/oauth.v2.access', {
      params: {
        client_id: SLACK_CLIENT_ID,
        client_secret: SLACK_CLIENT_SECRET,
        code,
        redirect_uri: redirect_host
          ? `${redirect_host}/auth/add`
          : 'https://slackify.now.sh/auth/add',
      },
    })
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      throw new Error('Something went wrong. Please try again later.');
    });

  /* Check if response is OK */
  if (!authResponse?.ok) {
    throw new Error(`Invalid response from Slack (code: "${authResponse?.error}").`);
  }

  /* Check if token type is correct */
  if (authResponse.token_type !== 'bot') {
    throw new Error(`Wrong access token type "${authResponse.token_type}" (expected "bot").`);
  }

  /* Extract bot access token */
  const botToken = authResponse.access_token;

  if (!botToken) {
    throw new Error('Unable to extract bot access token from Slack response.');
  }

  /* Extract user access token */
  const userToken = authResponse.authed_user?.access_token;

  if (!userToken) {
    throw new Error('Unable to extract user access token from Slack response.');
  }

  /* Extract team data */
  const teamId = authResponse.team?.id;
  const teamName = authResponse.team?.name;

  if (!teamId || !teamName) {
    throw new Error('Unable to extract team data from Slack response.');
  }

  /* Get user info and bot ID */
  const authTestRequest = axios.get<SlackAuthTestResponse>('https://slack.com/api/auth.test', {
    params: {
      token: botToken,
    },
  });

  const userInfoRequest = axios.get<SlackUserIdentityResponse>(
    'https://slack.com/api/users.identity',
    {
      params: {
        token: userToken,
      },
    }
  );

  await Promise.all([authTestRequest, userInfoRequest])
    .then(async ([{ data: authTestData }, { data: userInfoData }]) => {
      /* Check if requests were successful */
      if (!authTestData?.ok || !userInfoData?.ok) {
        throw new Error('Unable to get auth test and user data.');
      }

      /* Extract user and bot ID */
      const user = userInfoData.user;
      const botId = authTestData.bot_id;

      /* Generate access token */
      const accessToken =
        createHash('sha256').update(teamId).digest('hex') + '-' + randomBytes(64).toString('hex');

      /* Create team */
      await prisma.team.create({
        data: {
          id: teamId,
          name: teamName,
          botId,
          botToken,
          accessToken,
        },
      });

      /* Create user */
      await prisma.user.create({
        data: {
          id: user.id,
          role: 'OWNER',
          name: user.name,
          email: user.email,
          accessToken: userToken,
          avatar: user.image_72,
          team: {
            connect: {
              id: teamId,
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error(error);
      throw new Error('Something went wrong. Please try again later.');
    });

  return true;

  return false;
};
