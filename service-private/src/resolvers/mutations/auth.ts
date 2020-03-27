import { FieldResolver, objectType } from 'nexus';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import { SLACK_CLIENT_ID, SLACK_CLIENT_SECRET, SIGNING_SECRET } from '../../config';
import { SlackAuthResponse } from '../../types/auth';

/**
 * Sign in mutation output.
 */
export const SignInOutput = objectType({
  name: 'SignInOutput',
  definition(t) {
    t.string('authToken');
    t.field('user', { type: 'User' });
  },
});

/**
 * Resolves sign in with Slack mutation.
 */
export const signIn: FieldResolver<'Mutation', 'signIn'> = async (_, { code }, { prisma }) => {
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

  if (!slackAuthResponse.ok) {
    throw new Error('Slack authorization failed (response not ok).');
  }

  try {
    /* Check if user with this ID already exists */
    const existingUser = await prisma.user.findOne({
      where: {
        id: user.id,
      },
    });

    let resultUser;
    if (existingUser) {
      resultUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          image_24: user.image_24,
          image_32: user.image_32,
          image_48: user.image_48,
          image_72: user.image_72,
          image_192: user.image_192,
          image_512: user.image_512,
          accessToken,
        },
      });
    } else {
      resultUser = await prisma.user.create({
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          image_24: user.image_24,
          image_32: user.image_32,
          image_48: user.image_48,
          image_72: user.image_72,
          image_192: user.image_192,
          image_512: user.image_512,
          accessToken,
          team: {
            connect: {
              id: teamId,
            },
          },
        },
      });
    }

    const authToken = jwt.sign(
      {
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken,
        },
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
      },
      SIGNING_SECRET
    );

    return {
      authToken,
      user: resultUser,
    };
  } catch (error) {
    console.error(error);
  }

  return null;
};
