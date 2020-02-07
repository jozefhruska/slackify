import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';

import { SlackEvent, SlackURLVerificationEvent } from '../types/events';
import { handleSlackEventType } from '../util/events';

export const receive = asyncHandler(async (request: Request, response: Response) => {
  if (request?.body) {
    const eventBody: SlackEvent = request.body;

    switch (eventBody?.type) {
      case 'url_verification': {
        const { challenge } = eventBody as SlackURLVerificationEvent;

        /* Send the challenge string back */
        return response.json({
          challenge,
        });
      }

      case 'event_callback': {
        await handleSlackEventType(request, response);
        return;
      }

      default: {
        throw createHttpError(500, 'Unknown event.');
      }
    }
  }

  throw createHttpError(500, 'Internal error.');
});
