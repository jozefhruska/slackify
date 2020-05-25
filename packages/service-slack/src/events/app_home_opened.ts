import { SlackEventMiddlewareArgs, Middleware } from '@slack/bolt';
import { User } from '@prisma/client';

import { app } from '..';
import { compose_app_home_view } from '../views/app_home';

/**
 * Updates the app home layout on "app_home_opened" event.
 */
const app_home_opened: Middleware<SlackEventMiddlewareArgs<'app_home_opened'>> = async ({
  body,
  context,
}) => {
  try {
    /* Extract user */
    const user = context?.user as User;

    /* Check if user was extracted successfully */
    if (!user) {
      throw new Error('[events/app_home_opened]: Unable to extract user data.');
    }

    /* Compose view */
    const view = await compose_app_home_view(body.team_id, user?.id);

    /* Check if view was successfully composed */
    if (!view) {
      throw new Error('[events/app_home_opened]: Unable to compose view.');
    }

    /* Publish app home view */
    await app.client.views.publish({
      token: context?.botToken,
      user_id: user?.slackId,
      view,
    });
  } catch (error) {
    console.error(error);
  }
};

export default app_home_opened;
