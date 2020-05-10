import { SlackActionMiddlewareArgs, Middleware, BlockButtonAction } from '@slack/bolt';

import { app } from '..';
import { compose_create_new_component_modal } from '../views/components';

/**
 * Opens the component create modal on "create_new_component_open" action.
 */
const create_new_component_open: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  body,
  action,
  ack,
  context,
}) => {
  try {
    /* Acknowledge Slack action */
    await ack();

    /* Compose modal view */
    const view = await compose_create_new_component_modal(body?.team.id, action.value);

    /* Check if view was successfully composed */
    if (!view) {
      throw new Error('[actions/create_new_component_open]: Unable to compose view.');
    }

    /* Open modal */
    await app.client.views.open({
      token: context?.botToken,
      trigger_id: body.trigger_id,
      view,
    });
  } catch (error) {
    console.error(error);
  }
};

export default create_new_component_open;
