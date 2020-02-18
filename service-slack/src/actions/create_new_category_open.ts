import { SlackActionMiddlewareArgs, BlockAction } from '@slack/bolt';

import { BLOCK_TEXT } from '../constants/views';
import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';

/**
 * Opens the cateory create modal.
 */
const create_new_category_open = async ({ body, ack }: SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    ack();

    /* Open modal */
    await app.client.views.update({
      token: SLACK_BOT_TOKEN,
      view_id: body?.view?.id,
      view: {
        type: 'modal',
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
            label: {
              type: 'plain_text',
              text: 'Category handle:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
            },
          },
          BLOCK_TEXT(
            "Category handle will serve as an *endpoint for posts in this category*. Category handle must be URL compatible, that means it must contain only *alphanumeric characters* and/or *'-' (dash)*."
          ),
        ],
      },
    });
  } catch (error) {
    console.error(error.data.response_metadata.messages);
  }
};

export default create_new_category_open;
