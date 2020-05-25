import { Option, View, Button, ActionsBlock } from '@slack/web-api';

import { prisma } from '../prisma';
import { AppHomeComponentPreview } from '../types';
import { BLOCK_DIVIDER, BLOCK_TEXT } from '../constants/views';
import { canCreateCollections, canManageComponents, canCreateComponents } from '../utils/users';

/**
 * Composes app home view for user without account on Slackify.
 */
export const compose_app_home_sign_up_view = (): View => ({
  type: 'home',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text:
          "*It seems like your account isn't connected with Slackify.*\n You can sign in with your Slack account by clicking on the button below.",
      },
    },
    {
      type: 'actions',
      elements: [
        {
          type: 'button',
          text: {
            type: 'plain_text',
            text: '🌍 \tConnect with Slackify',
            emoji: true,
          },
          style: 'primary',
          url: 'https://slackify.now.sh/',
        },
      ],
    },
  ],
});

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
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*Useful links:*',
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '🌍 \t Open Slackify on web',
              emoji: true,
            },
            url: 'https://slackify.now.sh/',
          },
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: '🌍 \t Open public API',
              emoji: true,
            },
            url: 'https://slackify-service-public.herokuapp.com/',
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
};

/**
 * Composes a view of 'app home'.
 * @param teamId Team ID of user's workspace
 * @param initialCollectionId Collection that should be selected as default
 */
export const compose_app_home_view = async (
  teamId: string,
  userId: string,
  initialCollectionId?: string
): Promise<View | undefined> => {
  try {
    /* Check if user ID is defined */
    if (!userId) {
      throw new Error('[views/app_home]: User ID is not defined.');
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

    if (!user) {
      return compose_app_home_sign_up_view();
    }

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
      (collection) => collection.value === initialCollectionId
    );

    const activeCollection = initialCollection ?? collectionList[0];

    /* Get workspace components */
    const components = await prisma.component.findMany({
      where: {
        collection: {
          id: activeCollection.value,
        },
      },
      first: 22, // Limit count due to Slack's max layout blocks rule
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        plainTextData: true,
        articleData: true,
        linkData: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    const componentPreviews = components.map(
      (component): AppHomeComponentPreview => {
        switch (component.type) {
          case 'PLAIN_TEXT': {
            const data = component.plainTextData;

            return {
              id: component.id,
              text: `*Text:* ${data?.text}`,
              author: component.author.name,
              published: component.published,
            };
          }

          case 'ARTICLE': {
            const data = component.articleData;

            return {
              id: component.id,
              title: data?.title ?? '',
              text: `${data?.lead ? `*Lead:* ${data?.lead}` : ''}\n${
                data?.content ? `*Content:* ${data?.content}` : ''
              }`,
              author: component.author.name,
              published: component.published,
            };
          }

          case 'LINK': {
            const data = component.linkData;

            return {
              id: component.id,
              text: `${data?.url ? `*URL:* ${data?.url}` : ''}\n${
                data?.text ? `*Text:* ${data?.text}` : ''
              }`,
              author: component.author.name,
              published: component.published,
            };
          }
        }
      }
    );

    /* Set message as default */
    let componentList: View['blocks'] = [BLOCK_DIVIDER, BLOCK_TEXT('No components here 🤷‍♂️')];

    /* Render list of components if there are some */
    if (componentPreviews.length) {
      componentList = componentPreviews.flatMap(({ id, title, text, published, author }) => {
        const result: View['blocks'] = [
          BLOCK_DIVIDER,
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `${title ? `*${title}*\n ` : ''}ID: \`${id}\`\n\n${text}`,
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

        /* Compose component actions */
        const actions: ActionsBlock = {
          type: 'actions',
          elements: [],
        };

        if (canManageComponents(user.role)) {
          actions.elements.push({
            type: 'button',
            action_id: published ? 'component_hide' : 'component_publish',
            text: {
              type: 'plain_text',
              text: published ? '👀 \tHide' : '👀 \tPublish',
              emoji: true,
            },
            style: published ? 'danger' : 'primary',
            value: id,
          });
        }

        if (canCreateComponents(user.role)) {
          actions.elements.push({
            type: 'button',
            action_id: 'update_component_open',
            text: {
              type: 'plain_text',
              text: '📝\tEdit',
              emoji: true,
            },
            value: id,
          });
        }

        if (canManageComponents(user.role)) {
          actions.elements.push({
            type: 'button',
            action_id: 'delete_component',
            text: {
              type: 'plain_text',
              text: '🗑\tDelete',
              emoji: true,
            },
            style: 'danger',
            value: id,
          });
        }

        /* Push actions into result view if it contains at least one child element */
        if (actions.elements.length) {
          result.push(actions);
        }

        return result;
      });
    }

    /* Add alert if max component count reached */
    if (components.length === 22) {
      componentList.push({
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            "*Sorry we're unable to show more components here.* Go to https://slackify.now.sh/ to view all of your components.",
        },
      });
    }

    /* Compose view header */
    const header = canCreateCollections(user?.role)
      ? compose_app_home_header(activeCollection.value)
      : ({ type: 'home', blocks: [] } as View);

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
