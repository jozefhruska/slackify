import { SlackActionMiddlewareArgs, BlockButtonAction, Middleware } from '@slack/bolt';

import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';
import { compose_manage_collections_view } from '../utils/views';

/**
 * Opens the manage collections modal on "manage_collections_open" action.
 */
const manage_collections_open: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  body,
  ack,
}) => {
  try {
    /* Acknowledge Slack action */
    await ack();

    /* Extract user ID */
    const userId = body?.user?.id;

    /* Check if user ID is defined */
    if (!userId) {
      throw new Error('[actions/manage_collections_open]: User ID is not defined.');
    }

    /* Compose modal view */
    const view = await compose_manage_collections_view(body?.team.id, userId);

    /* Check if view was successfully composed */
    if (!view) {
      throw new Error('[actions/manage_collections_open]: Unable to compose view.');
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

export default manage_collections_open;
