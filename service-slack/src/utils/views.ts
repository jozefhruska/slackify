import { View, Option } from '@slack/web-api';

import { prisma } from '../prisma';
import { BLOCK_DIVIDER, BLOCK_TEXT } from '../constants/views';

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
    let categoryList = [BLOCK_DIVIDER, BLOCK_TEXT("You don't have any categories created.")];

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
          block_id: 'post_title_block',
          label: {
            type: 'plain_text',
            text: 'Title',
            emoji: true,
          },
          element: {
            type: 'plain_text_input',
            action_id: 'post_title_element',
          },
        },
        {
          type: 'input',
          block_id: 'post_short_block',
          label: {
            type: 'plain_text',
            text: 'Lead',
            emoji: true,
          },
          element: {
            type: 'plain_text_input',
            action_id: 'post_short_element',
          },
        },
        {
          type: 'input',
          block_id: 'post_category_block',
          label: {
            type: 'plain_text',
            text: 'Category',
            emoji: true,
          },
          element: {
            type: 'static_select',
            action_id: 'post_category_element',
            placeholder: {
              type: 'plain_text',
              text: 'Select category',
            },
            options: categoryList,
          },
        },
        {
          type: 'input',
          block_id: 'post_content_block',
          label: {
            type: 'plain_text',
            text: 'Content',
            emoji: true,
          },
          element: {
            type: 'plain_text_input',
            action_id: 'post_content_element',
            multiline: true,
          },
        },
      ],
    };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Composes a view of 'app home'.
 * @param teamId Team ID of user's workspace
 * @param initialCategory Category that should be selected as default
 */
export const compose_app_home_view = async (
  teamId: string,
  initialCategory?: Option
): Promise<View | undefined> => {
  try {
    /* Get workspace categories */
    const categories = await prisma.category.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
      select: {
        id: true,
        handle: true,
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

    const activeCategory = initialCategory ?? categoryList[0];

    /* Get workspace posts */
    const posts = await prisma.post.findMany({
      where: {
        category: {
          id: activeCategory.value,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        short: true,
        author: true,
        isPublished: true,
      },
    });

    /* Set message as default */
    let postList = [BLOCK_DIVIDER, BLOCK_TEXT('No posts here 🤷‍♂️')];

    /* Render list of posts if there are some */
    if (posts.length) {
      postList = posts.flatMap(({ id, title, short, isPublished, author }) => {
        const result: View['blocks'] = [
          BLOCK_DIVIDER,
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*${title}* \n ${short}`,
            },
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `Submitted by *${author.name}*`,
              },
            ],
          },
        ];

        if (isPublished) {
          result.push({
            type: 'actions',
            elements: [
              {
                type: 'button',
                action_id: 'post_hide',
                text: {
                  type: 'plain_text',
                  text: '👀 \tHide',
                  emoji: true,
                },
                style: 'danger',
                value: id,
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '\tEdit',
                  emoji: true,
                },
                value: 'details',
              },
            ],
          });
        } else {
          result.push({
            type: 'actions',
            elements: [
              {
                type: 'button',
                action_id: 'post_publish',
                text: {
                  type: 'plain_text',
                  text: '👀 \tPublish',
                  emoji: true,
                },
                style: 'primary',
                value: id,
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '\tEdit',
                  emoji: true,
                },
                value: 'details',
              },
            ],
          });
        }

        return result;
      });
    }

    return {
      type: 'home',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: "*Here's what you can do with Slackify:*",
          },
        },
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              action_id: 'create_new_post_open',
              text: {
                type: 'plain_text',
                text: '✏️ \tCreate new post',
                emoji: true,
              },
              style: 'primary',
              value: 'create_post',
            },
            {
              type: 'button',
              action_id: 'manage_categories_open',
              text: {
                type: 'plain_text',
                text: '📂 \tManage categories',
                emoji: true,
              },
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: '❓\tHelp',
                emoji: true,
              },
              value: 'help',
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
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Posts in your workspace*',
          },
          accessory: {
            type: 'static_select',
            action_id: 'app_home_category_select',
            placeholder: {
              type: 'plain_text',
              text: 'Select a category',
              emoji: true,
            },
            options: categoryList,
            initial_option: activeCategory,
          },
        },
        ...postList,
      ],
    };
  } catch (error) {
    console.error(error);
  }
};
