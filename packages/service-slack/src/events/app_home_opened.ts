import { SlackEventMiddlewareArgs, Middleware } from '@slack/bolt';

import { app } from '..';
import { compose_app_home_view } from '../views/app_home';

/**
 * Updates the app home layout on "app_home_opened" event.
 */
const app_home_opened: Middleware<SlackEventMiddlewareArgs<'app_home_opened'>> = async ({
  event,
  body,
  context,
}) => {
  try {
    /* Extract user ID */
    const userId = event?.user;

    /* Check if user ID is defined */
    if (!userId) {
      throw new Error('[events/app_home_opened]: User ID is not defined.');
    }

    /* Compose view */
    const view = await compose_app_home_view(body.team_id, userId);

    /* Check if view was successfully composed */
    if (!view) {
      throw new Error('[events/app_home_opened]: Unable to compose view.');
    }

    /* Publish app home view */
    await app.client.views.publish({
      token: context?.botToken,
      user_id: userId,
      view,
    });
  } catch (error) {
    console.error(error);
  }
};

export default app_home_opened;
