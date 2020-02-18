import { SlackActionMiddlewareArgs, BlockAction } from '@slack/bolt';

import { BLOCK_DIVIDER, BLOCK_TEXT } from '../constants/views';
import { prisma } from '../prisma';
import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';

/**
 * Opens the categories modal.
 */
const manage_categories_open = async ({ body, ack }: SlackActionMiddlewareArgs<BlockAction>) => {
  try {
    ack();

    const categories = await prisma.category.findMany();

    /* Set message as default */
    let categoryList = [BLOCK_DIVIDER, BLOCK_TEXT("You don' have any categories created.")];

    /* Render list of categories if there are some */
    if (categories.length) {
      categoryList = categories.flatMap(({ id, handle }) => [
        BLOCK_DIVIDER,
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${handle}*`,
          },
          accessory: {
            type: 'button',
            style: 'danger',
            text: {
              type: 'plain_text',
              text: 'Delete',
              emoji: false,
            },
            value: id,
          },
        },
      ]);
    }

    /* Open modal in user's slack */
    await app.client.views.open({
      token: SLACK_BOT_TOKEN,
      trigger_id: body.trigger_id,
      view: {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'Manage categories',
          emoji: false,
        },
        blocks: [
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                action_id: 'create_new_category_open',
                text: {
                  type: 'plain_text',
                  text: '📂 \tCreate new category',
                  emoji: true,
                },
                style: 'primary',
              },
            ],
          },
          {
            type: 'context',
            elements: [
              {
                type: 'image',
                image_url: 'https://api.slack.com/img/blocks/bkb_template_images/placeholder.png',
                alt_text: 'placeholder',
              },
            ],
          },
          BLOCK_TEXT('*Categories:*'),
          ...categoryList,
        ],
      },
    });
  } catch (error) {
    console.error(error.data.response_metadata.messages);
  }
};

export default manage_categories_open;
