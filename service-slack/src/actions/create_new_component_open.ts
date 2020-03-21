import { SlackActionMiddlewareArgs, Middleware, BlockButtonAction } from '@slack/bolt';

import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';
import { compose_create_new_component_modal } from '../views/components';

/**
 * Opens the component create modal.
 */
const create_new_component_open: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  body,
  action,
  ack,
}) => {
  ack();

  try {
    const view = await compose_create_new_component_modal(body?.team.id, action.value);

    if (view) {
      /* Open modal in user's slack */
      await app.client.views.open({
        token: SLACK_BOT_TOKEN,
        trigger_id: body.trigger_id,
        view,
      });
    } else {
      throw new Error("Unable to compose 'create new component' view.");
    }
  } catch (error) {
    console.error(error.data);
  }
};

export default create_new_component_open;
