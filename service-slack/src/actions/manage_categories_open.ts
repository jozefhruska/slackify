import { SlackActionMiddlewareArgs, BlockButtonAction } from '@slack/bolt';

import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';
import { compose_manage_categories_view } from '../utils/views';

/**
 * Opens the categories modal.
 */
const manage_categories_open = async ({
  body,
  ack,
}: SlackActionMiddlewareArgs<BlockButtonAction>) => {
  ack();

  try {
    const view = await compose_manage_categories_view(body?.team.id);

    if (view) {
      /* Open modal in user's slack */
      await app.client.views.open({
        token: SLACK_BOT_TOKEN,
        trigger_id: body.trigger_id,
        view,
      });
    } else {
      throw new Error("Unable to compose 'manage categories' view.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default manage_categories_open;
