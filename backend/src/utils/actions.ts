import { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';
import { BlockAction } from '@slack/bolt';
import { updateView, openView } from './views';
import { BLOCK_TEXT, BLOCK_DIVIDER } from '../constants/views';
import { prisma } from '../context';

export const handleBlockActions = async (
  action: BlockAction,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!action?.actions?.length) {
    return next(createHttpError(400, 'Action not specified.'));
  }

  const actionId = action.actions[0].action_id;
  switch (actionId) {
    case 'create_new_category_open': {
      response.sendStatus(200);

      const modal = {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'Create new category',
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
              text: 'Category handle:',
              emoji: true,
            },
            element: {
              type: 'plain_text_input',
            },
          },
          BLOCK_TEXT(
            "Category handle will serve as an *endpoint for posts in this category*. Category handle must be URL compatible, that means it must contain only *alphanumeric characters* and/or *'-' (dash)*."
          ),
        ],
      };

      /* Get view ID off Slack action */
      const viewId = action?.view?.id;
      if (!viewId) {
        console.error(new Error(`Unable to update "${actionId}" modal. (View ID is not defined)`));
      }

      /* Update modal layout */
      await updateView(modal, viewId).catch(() => {
        console.error(new Error(`Unable to open "${actionId}" modal. (Request failed)`));
      });
      return;
    }

    case 'app_home_manage_categories_open': {
      response.sendStatus(200);

      const categories = await prisma.category.findMany();

      /* Set message as default */
      let categoryList = [BLOCK_DIVIDER, BLOCK_TEXT("You don' have any categories created.")];

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

      const modal = {
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

      await openView(modal, action.trigger_id).catch(() => {
        console.error(new Error(`Unable to open "${actionId}" modal. (Request failed)`));
      });

      return;
    }

    default: {
      return next(createHttpError(400, 'Unknown action type.'));
    }
  }
};
