import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';

import { SlackActionRequestBody } from '../types/actions';
import { openModal } from '../utils/views';
import { prisma } from '../context';

/**
 * Receive actions from Slack.
 */
export const receive = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    if (request?.body?.payload) {
      const requestBody = JSON.parse(request.body.payload) as SlackActionRequestBody;

      if (!requestBody?.actions?.length) {
        return next(createHttpError(400, 'Action not specified.'));
      }

      switch (requestBody.actions[0].action_id) {
        case 'app_home_manage_categories_open': {
          response.sendStatus(200);

          const categories = await prisma.category.findMany();

          /* Set message as default */
          let categoryList = [
            {
              type: 'divider',
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: "You don' have any categories created.",
              },
            },
          ];

          /* Render list of categories if there are some */
          if (categories.length) {
            categoryList = categories.flatMap(({ id, handle }) => [
              {
                type: 'divider',
              },
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
                    image_url:
                      'https://api.slack.com/img/blocks/bkb_template_images/placeholder.png',
                    alt_text: 'placeholder',
                  },
                ],
              },
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: '*Categories:*',
                },
              },
              ...categoryList,
            ],
          };

          await openModal(modal, requestBody.trigger_id).catch(() => {
            console.error(
              new Error('Unable to open "app_home_manage_categories_open" modal. (Request failed)')
            );
          });
          return;
        }

        default: {
          return next(createHttpError(400, 'Unknown action type.'));
        }
      }
    }

    return next(createHttpError(400, 'Missing payload data.'));
  }
);
