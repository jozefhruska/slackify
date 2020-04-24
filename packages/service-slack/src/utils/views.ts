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
    });

    /* Set message as default */
    let collectionList = [BLOCK_DIVIDER, BLOCK_TEXT("You don't have any collections created.")];

    /* Render list of collections if there are some */
    if (collections.length) {
      collectionList = collections.flatMap(({ id, name }) => [
        BLOCK_DIVIDER,
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${name}*`,
          },
          ...(canManageCollections(user.role) && {
            accessories: {
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
          }),
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
