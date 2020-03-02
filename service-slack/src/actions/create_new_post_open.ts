import { SlackActionMiddlewareArgs, BlockAction, Middleware } from '@slack/bolt';

import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';
import { compose_create_new_post_view } from '../utils/views';

/**
 * Opens the post create modal.
 */
const create_new_post_open: Middleware<SlackActionMiddlewareArgs<BlockAction>> = async ({
  body,
  ack,
}) => {
  ack();

  try {
    const view = await compose_create_new_post_view(body?.team.id);

    if (view) {
      /* Open modal in user's slack */
      await app.client.views.open({
        token: SLACK_BOT_TOKEN,
        trigger_id: body.trigger_id,
        view,
      });
    } else {
      throw new Error("Unable to compose 'create new post' view.");
    }
  } catch (error) {
    console.error(error.data);
  }
};

export default create_new_post_open;
