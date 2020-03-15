import { SlackActionMiddlewareArgs, Middleware, BlockButtonAction } from '@slack/bolt';

import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';

/**
 * Opens the collection create modal.
 */
const create_new_collection_open: Middleware<SlackActionMiddlewareArgs<
  BlockButtonAction
>> = async ({ body, ack }) => {
  ack();

  try {
    /* Open modal */
    await app.client.views.update({
      token: SLACK_BOT_TOKEN,
      view_id: body?.view?.id,
      view: {
        type: 'modal',
        callback_id: 'create_new_collection_modal',
        title: {
          type: 'plain_text',
          text: 'Create new collection',
          emoji: false,
        },
        submit: {
          type: 'plain_text',
          text: 'Create',
        },
        blocks: [
          {
            type: 'input',
            block_id: 'collection_handle_block',
            label: {
              type: 'plain_text',
              text: 'Collection handle:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'collection_handle_element',
            },
            hint: {
              type: 'plain_text',
              text:
                'Collection handle will serve as an endpoint for components in this collection.',
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default create_new_collection_open;
