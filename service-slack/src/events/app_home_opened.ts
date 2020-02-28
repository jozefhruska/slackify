import { SlackEventMiddlewareArgs, AppHomeOpenedEvent } from '@slack/bolt';

import { app } from '..';
import { compose_app_home_view } from '../utils/views';

/**
 * Updates app home tab when users visits it.
 */
const app_home_opened = async ({
  event,
  body,
}: SlackEventMiddlewareArgs<AppHomeOpenedEvent['type']>) => {
  try {
    const view = await compose_app_home_view(body.team_id);

    if (view) {
      /* Publish app home view */
      await app.client.views.publish({
        user_id: event?.user,
        view,
      });
    } else {
      throw new Error("Unable to compose 'app home' view.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default app_home_opened;
