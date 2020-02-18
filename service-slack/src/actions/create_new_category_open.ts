import { SlackActionMiddlewareArgs, BlockAction } from '@slack/bolt';

import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';

/**
 * Opens the category create modal.
 */
const create_new_category_open = async ({ body, ack }: SlackActionMiddlewareArgs<BlockAction>) => {
  ack();

  try {
    /* Open modal */
    await app.client.views.update({
      token: SLACK_BOT_TOKEN,
      view_id: body?.view?.id,
      view: {
        type: 'modal',
        callback_id: 'create_new_category_modal',
        title: {
          type: 'plain_text',
          text: 'Create new category',
          emoji: false,
        },
        submit: {
          type: 'plain_text',
          text: 'Create',
        },
        blocks: [
          {
            type: 'input',
            block_id: 'category_handle_block',
            label: {
              type: 'plain_text',
              text: 'Category handle:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'category_handle_input',
            },
            hint: {
              type: 'plain_text',
              text: 'Category handle will serve as an endpoint for posts in this category.',
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default create_new_category_open;
