/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Option, View, Button } from '@slack/web-api';

import { prisma } from '../prisma';
import { AppHomeComponentPreview } from '../types';
import { BLOCK_DIVIDER, BLOCK_TEXT } from '../constants/views';

/**
 * Composes header of app home view.
 * @param collectionId ID of collection to create new component
 */
const compose_app_home_header = (collectionId?: string): View => {
  const elements: Button[] = [
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
  ];

  if (collectionId !== undefined) {
    elements.unshift({
      type: 'button',
      action_id: 'create_new_component_open',
      text: {
        type: 'plain_text',
        text: '✏️ \tCreate new component',
        emoji: true,
      },
      style: 'primary',
      value: collectionId,
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
        elements,
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
};

/**
 * Composes a view of 'app home'.
 * @param teamId Team ID of user's workspace
 * @param initialCollectionId Collection that should be selected as default
 */
export const compose_app_home_view = async (
  teamId: string,
  initialCollectionId?: string
): Promise<View | undefined> => {
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
        name: true,
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

    if (!collections.length) {
      const header = compose_app_home_header();

      return {
        ...header,
        blocks: [
          ...header.blocks,
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

    /* Find initial option */
    const initialCollection = collectionList.find(
      collection => collection.value === initialCollectionId
    );

    const activeCollection = initialCollection ?? collectionList[0];

    /* Get workspace components */
    const components = await prisma.component.findMany({
      where: {
        collection: {
          id: activeCollection.value,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        plainTextData: true,
        articleData: {
          select: {
            title: true,
            lead: true,
          },
        },
        linkData: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    const componentPreviews: AppHomeComponentPreview[] = components.map(component => {
      switch (component.type) {
        case 'PLAIN_TEXT': {
          const data = component.plainTextData;

          return {
            id: component.id,
            //@ts-ignore
            text: data.text,
            author: component.author.name,
            published: component.published,
          };
        }

        case 'ARTICLE': {
          const data = component.articleData;

          return {
            id: component.id,
            //@ts-ignore
            title: data?.title,
            //@ts-ignore
            text: data.lead,
            author: component.author.name,
            published: component.published,
          };
        }

        case 'LINK': {
          const data = component.linkData;

          return {
            id: component.id,
            //@ts-ignore
            text: data.url,
            author: component.author.name,
            published: component.published,
          };
        }
      }
    });

    /* Set message as default */
    let componentList = [BLOCK_DIVIDER, BLOCK_TEXT('No components here 🤷‍♂️')];

    /* Render list of components if there are some */
    if (componentPreviews.length) {
      componentList = componentPreviews.flatMap(({ id, title, text, published, author }) => {
        const result: View['blocks'] = [
          BLOCK_DIVIDER,
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `${title ? `*${title}* \n ` : ''}${text ? text : ''}`,
            },
          },
          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: `Submitted by *${author}*`,
              },
            ],
          },
        ];

        if (published) {
          result.push({
            type: 'actions',
            elements: [
              {
                type: 'button',
                action_id: 'component_hide',
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
                action_id: 'component_publish',
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

    /* Compose view header */
    const header = compose_app_home_header(activeCollection.value);

    return {
      ...header,
      blocks: [
        ...header.blocks,
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*Components in your workspace*',
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
        ...componentList,
      ],
    };
  } catch (error) {
    console.error(error);
  }
};
