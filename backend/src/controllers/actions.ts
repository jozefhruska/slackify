import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';

import { SlackActionRequestBody } from '../types/actions';
import { openModal } from '../utils/views';

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
        case 'create_new_category': {
          response.sendStatus(200);

          const modal = {
            type: 'modal',
            title: {
              type: 'plain_text',
              text: 'Categories',
              emoji: false,
            },
            blocks: [
              {
                type: 'section',
                text: {
                  type: 'mrkdwn',
                  text: 'Demo category name',
                },
                accessory: {
                  type: 'button',
                  text: {
                    type: 'plain_text',
                    text: 'Delete',
                    emoji: false,
                  },
                  style: 'danger',
                  value: 'click_me_123',
                },
              },
            ],
          };

          await openModal(modal, requestBody.trigger_id).catch(() => {
            console.error(
              new Error('Unable to open "create new category" modal. (Request failed)')
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
