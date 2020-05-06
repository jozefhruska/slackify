import { View, Option } from '@slack/web-api';

import { prisma } from '../prisma';
import { BLOCK_DIVIDER, BLOCK_TEXT } from '../constants/views';

/**
 * Composes a view of 'create new component' modal.
 * @param teamId Team ID of workspace for which to get collections
 * @param initialCollectionId ID of initially selected collection
 */
export const compose_create_new_component_modal = async (
  teamId: string,
  initialCollectionId: string
): Promise<View | undefined> => {
  try {
    const collections = await prisma.collection.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
    });

    /* Render content based on collection type */
    const activeCollection = collections.find(
      (collection) => collection.id === initialCollectionId
    );

    let content: View['blocks'] = [];
    switch (activeCollection?.type) {
      case 'PLAIN_TEXT': {
        content = [
          BLOCK_TEXT(`Collection: *${activeCollection.name}*\nComponent type: *🖋 Plain text*`),
          BLOCK_DIVIDER,
          {
            type: 'input',
            block_id: 'text',
            label: {
              type: 'plain_text',
              text: 'Text:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'text',
              multiline: true,
            },
          },
        ];

        break;
      }

      case 'ARTICLE': {
        content = [
          BLOCK_TEXT(`Collection: *${activeCollection.name}*\nComponent type: *📝 Article*`),
          BLOCK_DIVIDER,
          {
            type: 'input',
            block_id: 'title',
            label: {
              type: 'plain_text',
              text: 'Title:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'title',
            },
          },
          {
            type: 'input',
            block_id: 'lead',
            optional: true,
            label: {
              type: 'plain_text',
              text: 'Lead:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'lead',
              multiline: true,
            },
          },
          {
            type: 'input',
            block_id: 'content',
            label: {
              type: 'plain_text',
              text: 'Content:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'content',
              multiline: true,
            },
          },
        ];

        break;
      }

      case 'LINK': {
        content = [
          BLOCK_TEXT(`Collection: *${activeCollection.name}*\nComponent type: *🌍 Link*`),
          BLOCK_DIVIDER,
          {
            type: 'input',
            block_id: 'url',
            label: {
              type: 'plain_text',
              text: 'URL:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'url',
            },
          },
          {
            type: 'input',
            block_id: 'text',
            optional: true,
            label: {
              type: 'plain_text',
              text: 'Text:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'text',
              multiline: true,
            },
          },
        ];

        break;
      }
    }

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

    /* Find active collection in list of options */
    const activeCollectionOption = collectionList.find(
      (collection) => collection.value === initialCollectionId
    );

    return {
      type: 'modal',
      callback_id: 'create_new_component_submission',
      private_metadata: activeCollection?.id,
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
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Create new component in collection:*',
          },
          accessory: {
            type: 'static_select',
            action_id: 'create_new_component_collection_select',
            options: collectionList,
            initial_option: activeCollectionOption,
          },
        },
        BLOCK_DIVIDER,
        ...content,
      ],
    };
  } catch (error) {
    console.error(error);
  }
};

/**
 * Composes a view of 'update component' modal.
 * @param componentId ID of component to update
 */
export const compose_update_component_modal = async (
  componentId: string
): Promise<View | undefined> => {
  try {
    /* Get component data */
    const component = await prisma.component.findOne({
      where: {
        id: componentId,
      },
      select: {
        id: true,
        type: true,
        collection: {
          select: {
            name: true,
          },
        },
        plainTextData: true,
        articleData: true,
        linkData: true,
      },
    });

    /* Check if component was found */
    if (!component) {
      throw new Error(`[views/components]: Component with id ${componentId} was not found.`);
    }

    let content: View['blocks'] = [];
    switch (component?.type) {
      case 'PLAIN_TEXT': {
        content = [
          BLOCK_TEXT(`Collection: *${component.collection.name}*\nComponent type: *🖋 Plain text*`),
          BLOCK_DIVIDER,
          {
            type: 'input',
            block_id: 'text',
            label: {
              type: 'plain_text',
              text: 'Text:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'text',
              initial_value: component.plainTextData?.text,
              multiline: true,
            },
          },
        ];

        break;
      }

      case 'ARTICLE': {
        content = [
          BLOCK_TEXT(`Collection: *${component.collection.name}*\nComponent type: *📝 Article*`),
          BLOCK_DIVIDER,
          {
            type: 'input',
            block_id: 'title',
            label: {
              type: 'plain_text',
              text: 'Title:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'title',
              initial_value: component.articleData?.title,
            },
          },
          {
            type: 'input',
            block_id: 'lead',
            optional: true,
            label: {
              type: 'plain_text',
              text: 'Lead:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'lead',
              initial_value: component.articleData?.lead ?? '',
              multiline: true,
            },
          },
          {
            type: 'input',
            block_id: 'content',
            label: {
              type: 'plain_text',
              text: 'Content:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'content',
              initial_value: component.articleData?.content,
              multiline: true,
            },
          },
        ];

        break;
      }

      case 'LINK': {
        content = [
          BLOCK_TEXT(`Collection: *${component.collection.name}*\nComponent type: *🌍 Link*`),
          BLOCK_DIVIDER,
          {
            type: 'input',
            block_id: 'url',
            label: {
              type: 'plain_text',
              text: 'URL:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'url',
              initial_value: component.linkData?.url,
            },
          },
          {
            type: 'input',
            block_id: 'text',
            optional: true,
            label: {
              type: 'plain_text',
              text: 'Text:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
              action_id: 'text',
              initial_value: component.linkData?.text ?? '',
              multiline: true,
            },
          },
        ];

        break;
      }
    }

    return {
      type: 'modal',
      callback_id: 'update_component',
      private_metadata: component.id,
      title: {
        type: 'plain_text',
        text: 'Update component',
        emoji: false,
      },
      submit: {
        type: 'plain_text',
        text: 'Update',
      },
      blocks: content,
    };
  } catch (error) {
    console.error(error);
  }
};
