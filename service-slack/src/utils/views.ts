/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { View, Option } from '@slack/web-api';

import { prisma } from '../prisma';
import { BLOCK_DIVIDER, BLOCK_TEXT } from '../constants/views';
import { AppHomeComponentPreview } from '../types';
import { Component } from '@prisma/client';

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
      collectionList = collections.flatMap(({ id, name }) => [
        BLOCK_DIVIDER,
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${name}*`,
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
 * Composes a view of 'create new component' modal (collection & type).
 * @param teamId Team ID of workspace for which to get collections
 */
export const compose_create_new_component_meta_view = async (
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

    /* Render a list of collection options */
    let collectionList: Option[] = [];
    if (collections.length) {
      collectionList = collections.map(({ id, name }) => ({
        text: {
          type: 'plain_text',
          text: name,
        },
        value: id,
      }));
    }

    return {
      type: 'modal',
      callback_id: 'create_new_component_meta_submission',
      title: {
        type: 'plain_text',
        text: 'Create new component',
        emoji: false,
      },
      submit: {
        type: 'plain_text',
        text: 'Create',
      },
      blocks: [
        {
          type: 'input',
          block_id: 'component_create_collection',
          label: {
            type: 'plain_text',
            text: 'Collection',
            emoji: true,
          },
          element: {
            type: 'static_select',
            action_id: 'component_create_collection',
            placeholder: {
              type: 'plain_text',
              text: 'Select collection',
            },
            options: collectionList,
          },
        },
        {
          type: 'input',
          block_id: 'component_create_type',
          label: {
            type: 'plain_text',
            text: 'Type',
            emoji: true,
          },
          element: {
            type: 'static_select',
            action_id: 'component_create_type',
            placeholder: {
              type: 'plain_text',
              text: 'Select component type',
            },
            options: [
              {
                text: {
                  type: 'plain_text',
                  text: 'Plain text',
                },
                value: 'PLAIN_TEXT',
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'Article',
                },
                value: 'ARTICLE',
              },
              {
                text: {
                  type: 'plain_text',
                  text: 'Link',
                },
                value: 'LINK',
              },
            ],
          },
        },
      ],
    };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Composes a view of 'create new component' modal (component data).
 */
export const compose_create_new_component_data_view = (type: Component['type']): View => ({
  type: 'modal',
  callback_id: 'create_new_component_data_submission',
  title: {
    type: 'plain_text',
    text: 'Create new component',
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
        text: 'What can we do to improve your experience working here?',
        emoji: true,
      },
      element: {
        type: 'plain_text_input',
        multiline: true,
      },
    },
  ],
});
