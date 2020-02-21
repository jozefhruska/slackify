import { prisma } from '../prisma';
import { BLOCK_DIVIDER, BLOCK_TEXT } from '../constants/views';
import { View } from '@slack/web-api';

/**
 * Composes view of 'manage categories' modal.
 * @param teamId Team ID for which to generate view
 */
export const compose_manage_categories_view = async (teamId: string): Promise<View | undefined> => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
    });

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
            action_id: 'delete_category',
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

    return {
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
    };
  } catch (error) {
    console.error(error);
  }
};
