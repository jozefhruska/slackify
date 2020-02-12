import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';
import { SlackEvent } from '@slack/bolt';

import { SlackEventRequestBody, SlackURLVerificationEventRequestBody } from '../types/events';
import { updateHomeTab } from '../utils/events';

/**
 * Receive events from Slack.
 */
export const receive = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    if (request?.body) {
      const requestBody: SlackEventRequestBody = request.body;

      switch (requestBody?.type) {
        case 'url_verification': {
          const { challenge } = requestBody as SlackURLVerificationEventRequestBody;

          /* Send the challenge string back */
          return response.json({
            challenge,
          });
        }

        case 'event_callback': {
          const event = request?.body.event as SlackEvent;

          switch (event?.type) {
            case 'app_home_opened': {
              const { user: userId } = event;

              /* Confirm Slack event */
              response.sendStatus(200);

              /* Update user's home tab */
              await updateHomeTab(userId).catch(() => {
                console.error(new Error('Unable to update home tab. (Request failed)'));
              });

              return;
            }

            default: {
              return next(createHttpError(400, 'Unknown event.'));
            }
          }
        }

        default: {
          return next(createHttpError(400, 'Unknown event type.'));
        }
      }
    }

    return next(createHttpError(400, 'Missing request body.'));
  }
);
