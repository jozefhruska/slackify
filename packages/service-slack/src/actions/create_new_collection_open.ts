import { SlackActionMiddlewareArgs, Middleware, BlockButtonAction } from '@slack/bolt';

import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';
import { compose_create_new_collection_modal } from '../views/collections';

/**
 * Opens the collection create modal on "create_new_collection_open" action.
 */
const create_new_collection_open: Middleware<SlackActionMiddlewareArgs<
  BlockButtonAction
>> = async ({ body, ack }) => {
  try {
    /* Acknowledge Slack action */
    await ack();

    /* Extract view ID */
    const viewId = body.view?.id;

    /* Check if user and team IDs are defined */
    if (!viewId) {
      throw new Error('[actions/create_new_collection_open]: View ID is not defined.');
    }

    /* Compose modal view */
    const view = await compose_create_new_collection_modal();

    /* Check if view was successfully composed */
    if (!view) {
      throw new Error('[actions/create_new_collection_open]: Unable to compose view.');
    }

    /* Open modal */
    await app.client.views.update({
      token: SLACK_BOT_TOKEN,
      view_id: viewId,
      view,
    });
  } catch (error) {
    console.error(error);
  }
};

export default create_new_collection_open;
