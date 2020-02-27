import { prisma } from '../prisma';
import { BLOCK_DIVIDER, BLOCK_TEXT } from '../constants/views';
import { View, Option } from '@slack/web-api';

/**
 * Composes a view of 'manage categories' modal.
 * @param teamId Team ID of workspace for which to get categories
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

/**
 * Composes a view of 'create new post' modal.
 * @param teamId Team ID of workspace for which to get categories
 */
export const compose_create_new_post_view = async (teamId: string): Promise<View | undefined> => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
    });

    /* Render a list of category options */
    let categoryList: Option[] = [];
    if (categories.length) {
      categoryList = categories.map(({ id, handle }) => ({
        text: {
          type: 'plain_text',
          text: handle,
        },
        value: id,
      }));
    }

    return {
      type: 'modal',
      callback_id: 'create_new_post_modal',
      title: {
        type: 'plain_text',
        text: 'Create new post',
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
            text: 'Title',
            emoji: true,
          },
          element: {
            type: 'plain_text_input',
          },
        },
        {
          type: 'input',
          label: {
            type: 'plain_text',
            text: 'Category',
            emoji: true,
          },
          element: {
            type: 'static_select',
            placeholder: {
              type: 'plain_text',
              text: 'Select category',
            },
            options: categoryList,
          },
        },
        {
          type: 'input',
          label: {
            type: 'plain_text',
            text: 'Content',
            emoji: true,
          },
          element: {
            type: 'plain_text_input',
            multiline: true,
          },
        },
      ],
    };
  } catch (error) {
    console.error(error);
  }
};
