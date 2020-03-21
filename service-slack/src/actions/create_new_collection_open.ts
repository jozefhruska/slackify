/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { SlackActionMiddlewareArgs, Middleware, BlockButtonAction } from '@slack/bolt';

import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';
import { compose_create_new_collection_modal } from '../views/collections';

/**
 * Opens the collection create modal.
 */
const create_new_collection_open: Middleware<SlackActionMiddlewareArgs<
  BlockButtonAction
>> = async ({ body, ack }) => {
  ack();

  try {
    const view = await compose_create_new_collection_modal();

    if (view) {
      /* Open modal */
      await app.client.views.update({
        token: SLACK_BOT_TOKEN,
        //@ts-ignore
        view_id: body?.view?.id,
        view,
      });
    } else {
      throw new Error("Unable to compose 'create new component' view.");
    }
  } catch (error) {
    console.error(error);
  }
};

export default create_new_collection_open;
