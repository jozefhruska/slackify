import { SlackActionMiddlewareArgs, BlockButtonAction, Middleware } from '@slack/bolt';

import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';
import { compose_settings_view } from '../utils/views';

/**
 * Opens the settings modal.
 */
const settings_open: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  body,
  ack,
}) => {
  ack();

  try {
    const view = await compose_settings_view(body?.team.id);

    if (view) {
      /* Open modal in user's slack */
      await app.client.views.open({
        token: SLACK_BOT_TOKEN,
        trigger_id: body.trigger_id,
        view,
      });
    } else {
      throw new Error("Unable to compose 'settings' view.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default settings_open;
