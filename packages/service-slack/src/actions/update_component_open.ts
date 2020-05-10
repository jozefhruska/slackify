import { Middleware, SlackActionMiddlewareArgs, BlockButtonAction } from '@slack/bolt';

import { app } from '..';
import { compose_update_component_modal } from '../views/components';

/**
 * Opens a modal on "update_component_open" action.
 */
const update_component_open: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  action,
  body,
  ack,
  context,
}) => {
  try {
    /* Acknowledge action */
    await ack();

    /* Extract required data */
    const componentId = action?.value;
    const triggerId = body?.trigger_id;

    /* Check if extraction of required data was successful */
    if (!componentId || !triggerId) {
      throw new Error('[actions/update_component_open]: Unable to extract required data.');
    }

    /* Compose modal view */
    const view = await compose_update_component_modal(componentId);

    /* Check if view was successfully composed */
    if (!view) {
      throw new Error('[actions/update_component_open]: Unable to compose view.');
    }

    /* Open modal */
    await app.client.views.open({
      token: context?.botToken,
      trigger_id: triggerId,
      view,
    });
  } catch (error) {
    console.error(error);
  }
};

export default update_component_open;
