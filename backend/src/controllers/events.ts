import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';

import { SlackEventRequestBody, SlackURLVerificationEventRequestBody } from '../types/events';
import { handleSlackEventType } from '../utils/events';

export const receive = asyncHandler(async (request: Request, response: Response) => {
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
