import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';

import { SlackActionRequestBody } from '../types/actions';
import { openModal } from '../utils/views';

export const receive = asyncHandler(async (request: Request, response: Response) => {
  if (request?.body?.payload) {
    const requestBody = JSON.parse(request.body.payload) as SlackActionRequestBody;

    if (!requestBody?.actions?.length) {
      throw createHttpError(400, '[Error] Actions: Action not specified.');
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

        await openModal(modal, requestBody.trigger_id);
        return;
      }

      default: {
        console.log('[Error] Actions: Unknown action type.');
        return;
      }
    }
  }

  throw createHttpError(400, '[Error] Actions: Missing payload data.');
});
