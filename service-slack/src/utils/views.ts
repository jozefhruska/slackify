import { View, Option } from '@slack/web-api';

import { prisma } from '../prisma';
import { BLOCK_DIVIDER, BLOCK_TEXT } from '../constants/views';

/**
 * Composes a view of 'manage collections' modal.
 * @param teamId Team ID of workspace for which to get collections
 */
export const compose_manage_collections_view = async (
  teamId: string
): Promise<View | undefined> => {
  try {
    const collections = await prisma.collection.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
    });

    /* Set message as default */
    let collectionList = [BLOCK_DIVIDER, BLOCK_TEXT("You don't have any collections created.")];

    /* Render list of collections if there are some */
    if (collections.length) {
      collectionList = collections.flatMap(({ id, handle }) => [
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
            action_id: 'delete_collection',
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
        text: 'Manage collections',
        emoji: false,
      },
      blocks: [
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              action_id: 'create_new_collection_open',
              text: {
                type: 'plain_text',
                text: '📂 \tCreate new collection',
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
        BLOCK_TEXT('*Collections:*'),
        ...collectionList,
      ],
    };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Composes a view of 'settings' modal.
 * @param teamId Team ID of workspace for which to get collections
 */
export const compose_settings_view = async (teamId: string): Promise<View | undefined> => {
  try {
    const team = await prisma.team.findOne({
      where: {
        id: teamId,
      },
      select: {
        accessToken: true,
      },
    });

    return {
      type: 'modal',
      title: {
        type: 'plain_text',
        text: 'Settings',
        emoji: false,
      },
      blocks: [BLOCK_TEXT('*Authorization token:*'), BLOCK_TEXT('```' + team?.accessToken + '```')],
    };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Composes a view of 'create new post' modal.
 * @param teamId Team ID of workspace for which to get collections
 */
export const compose_create_new_post_view = async (teamId: string): Promise<View | undefined> => {
  try {
    const collections = await prisma.collection.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
    });

    /* Render a list of collection options */
    let collectionList: Option[] = [];
    if (collections.length) {
      collectionList = collections.map(({ id, handle }) => ({
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
          block_id: 'post_collection_block',
          label: {
            type: 'plain_text',
            text: 'Collection',
            emoji: true,
          },
          element: {
            type: 'static_select',
            action_id: 'post_collection_element',
            placeholder: {
              type: 'plain_text',
              text: 'Select collection',
            },
            options: collectionList,
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
 * @param initialCollection Collection that should be selected as default
 */
export const compose_app_home_view = async (
  teamId: string,
  initialCollection?: Option
): Promise<View | undefined> => {
  const result: View = {
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
            action_id: 'manage_collections_open',
            text: {
              type: 'plain_text',
              text: '📂 \tManage collections',
              emoji: true,
            },
          },
          {
            type: 'button',
            action_id: 'settings_open',
            text: {
              type: 'plain_text',
              text: '🛠 \tSettings',
              emoji: true,
            },
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
    ],
  };

  try {
    /* Get workspace collections */
    const collections = await prisma.collection.findMany({
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

    /* Render a list of collection options */
    let collectionList: Option[] = [];
    if (collections.length) {
      collectionList = collections.map(({ id, handle }) => ({
        text: {
          type: 'plain_text',
          text: handle,
        },
        value: id,
      }));
    }

    if (!collections.length) {
      return {
        ...result,
        blocks: [
          ...result.blocks,
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                'You need to create a collection first. You can do that in "*Manage collections*" section above.',
            },
          },
        ],
      };
    }

    const activeCollection = initialCollection ?? collectionList[0];

    /* Get workspace posts */
    const posts = await prisma.post.findMany({
      where: {
        collection: {
          id: activeCollection.value,
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
      ...result,
      blocks: [
        ...result.blocks,
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Posts in your workspace*',
          },
          accessory: {
            type: 'static_select',
            action_id: 'app_home_collection_select',
            placeholder: {
              type: 'plain_text',
              text: 'Select a collection',
              emoji: true,
            },
            options: collectionList,
            initial_option: activeCollection,
          },
        },
        ...postList,
      ],
    };
  } catch (error) {
    console.error(error);
  }
};
