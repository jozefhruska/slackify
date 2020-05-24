import { View } from '@slack/web-api';

import { prisma } from '../prisma';
import { BLOCK_DIVIDER, BLOCK_TEXT } from '../constants/views';
import { canManageCollections } from './users';

/**
 * Composes a view of 'manage collections' modal.
 * @param teamId Team ID of workspace for which to get collections
 */
export const compose_manage_collections_view = async (
  teamId: string,
  userId: string
): Promise<View | undefined> => {
  try {
    /* Check if user ID is defined */
    if (!userId) {
      throw new Error('[views/compose_manage_collections_view]: User ID is not defined.');
    }

    /* Check if user's Slack account is connected with Slackify */
    const user = await prisma.user.findOne({
      where: {
        id: userId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    /* Check if user was found */
    if (!user) {
      throw new Error(
        `[views/compose_manage_collections_view]: User with id "${userId}" was not found.`
      );
    }

    /* Get list of collections */
    const collections = await prisma.collection.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
      first: 20, // Limit count due to Slack's max layout blocks rule
      orderBy: {
        createdAt: 'desc',
      },
    });

    /* Set message as default */
    let collectionList: View['blocks'] = [
      BLOCK_DIVIDER,
      BLOCK_TEXT("You don't have any collections created."),
    ];

    /* Render list of collections if there are some */
    if (collections.length) {
      collectionList = collections.flatMap(({ id, name, published, description }) => [
        BLOCK_DIVIDER,
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${name}*\nID: \`${id}\`\n\n${description}`,
          },
          ...(canManageCollections(user.role) && {
            accessory: {
              type: 'overflow',
              action_id: 'collection_overflow',
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: published ? '👀\tHide' : '👀 \tPublish',
                    emoji: true,
                  },
                  value: JSON.stringify({
                    id,
                    option: published ? 'hide' : 'publish',
                  }),
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '📝\tEdit',
                    emoji: true,
                  },
                  value: JSON.stringify({
                    id,
                    option: 'edit',
                  }),
                },
                {
                  text: {
                    type: 'plain_text',
                    text: '🗑\tDelete',
                    emoji: true,
                  },
                  value: JSON.stringify({
                    id,
                    option: 'delete',
                  }),
                },
              ],
            },
          }),
        },
      ]);
    }

    /* Add alert if max collections count reached */
    if (collections.length === 20) {
      collectionList.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            "*Sorry we're unable to show more collections here.* Go to https://slackify.now.sh/ to view all of your collections.",
        },
      });
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
      blocks: [
        BLOCK_TEXT('*Access token:*'),
        BLOCK_TEXT('``` Bearer' + team?.accessToken + '```'),
        BLOCK_TEXT(
          '_You must send this token in *Authorization* header when making requests to public API (https://slackify-service-public.herokuapp.com/)._'
        ),
      ],
    };
  } catch (error) {
    console.error(error);
  }
};
