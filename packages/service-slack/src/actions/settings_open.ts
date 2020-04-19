import { SlackActionMiddlewareArgs, BlockButtonAction, Middleware } from '@slack/bolt';

import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';
import { compose_settings_view } from '../utils/views';

/**
 * Opens the settings modal on "settings_open" action.
 */
const settings_open: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  body,
  ack,
}) => {
  try {
    /* Acknowledge Slack action */
    await ack();

    /* Compose modal view */
    const view = await compose_settings_view(body?.team.id);

    /* Check if view was successfully composed */
    if (!view) {
      throw new Error('[actions/settings_open]: Unable to compose view.');
    }

    /* Open modal */
    await app.client.views.open({
      token: SLACK_BOT_TOKEN,
      trigger_id: body.trigger_id,
      view,
    });
  } catch (error) {
    console.error(error);
  }
};

export default settings_open;
