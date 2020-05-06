import { View } from '@slack/web-api';
import { prisma } from '../prisma';
import { BLOCK_TEXT } from '../constants/views';

/**
 * Composes a view of 'create new collection' modal.
 */
export const compose_create_new_collection_modal = (): View => ({
  type: 'modal',
  callback_id: 'create_new_collection',
  title: {
    type: 'plain_text',
    text: 'Create new collection',
    emoji: false,
  },
  submit: {
    type: 'plain_text',
    text: 'Create',
  },
  blocks: [
    {
      type: 'input',
      block_id: 'name',
      label: {
        type: 'plain_text',
        text: 'Name:',
        emoji: true,
      },
      element: {
        type: 'plain_text_input',
        action_id: 'name',
      },
    },
    {
      type: 'input',
      block_id: 'type',
      label: {
        type: 'plain_text',
        text: 'Type',
        emoji: true,
      },
      element: {
        type: 'static_select',
        action_id: 'type',
        options: [
          {
            text: {
              type: 'plain_text',
              text: '🖋 Plain text',
            },
            value: 'PLAIN_TEXT',
          },
          {
            text: {
              type: 'plain_text',
              text: '📝 Article',
            },
            value: 'ARTICLE',
          },
          {
            text: {
              type: 'plain_text',
              text: '🌍 Link',
            },
            value: 'LINK',
          },
        ],
      },
    },
    {
      type: 'input',
      block_id: 'description',
      optional: true,
      label: {
        type: 'plain_text',
        text: 'Description:',
        emoji: true,
      },
      element: {
        type: 'plain_text_input',
        action_id: 'description',
        multiline: true,
      },
    },
  ],
});

/**
 * Composes a view of 'update collection' modal.
 */
export const compose_update_collection_modal = async (
  collectionId: string,
  manageCollectionsViewId: string
): Promise<View | undefined> => {
  /* Get collection data */
  const collection = await prisma.collection.findOne({
    where: {
      id: collectionId,
    },
  });

  /* Check if collection data are defined */
  if (!collection) {
    throw new Error('[views/collections]: Unable to get collection data.');
  }

  /* Resolve collection type */
  let collectionType = '';
  switch (collection.type) {
    case 'PLAIN_TEXT': {
      collectionType = '🖋 Plain text';
      break;
    }
    case 'ARTICLE': {
      collectionType = '📝 Article';
      break;
    }
    case 'LINK': {
      collectionType = '🌍 Link';
      break;
    }
  }

  return {
    type: 'modal',
    callback_id: 'update_collection',
    private_metadata: JSON.stringify({
      collectionId: collection.id,
      manageCollectionsViewId,
    }),
    title: {
      type: 'plain_text',
      text: 'Update collection',
      emoji: false,
    },
    submit: {
      type: 'plain_text',
      text: 'Update',
    },
    close: {
      type: 'plain_text',
      text: 'Back',
    },
    blocks: [
      {
        type: 'input',
        block_id: 'name',
        label: {
          type: 'plain_text',
          text: 'Name:',
          emoji: true,
        },
        element: {
          type: 'plain_text_input',
          action_id: 'name',
          initial_value: collection.name,
        },
      },
      BLOCK_TEXT(`*Type*:\n\n${collectionType}`),
      {
        type: 'input',
        block_id: 'description',
        optional: true,
        label: {
          type: 'plain_text',
          text: 'Description:',
          emoji: true,
        },
        element: {
          type: 'plain_text_input',
          action_id: 'description',
          initial_value: collection.description ?? '',
          multiline: true,
        },
      },
    ],
  };
};
