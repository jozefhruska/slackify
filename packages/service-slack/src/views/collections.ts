import { View } from '@slack/web-api';

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
