import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';

import { SlackEvent, SlackURLVerificationEvent, SlackEventCallbackEvent } from '../types/events';
import { SLACK_VERIFICATION_TOKEN } from '../config';
import { handleSlackEventType } from '../util/events';

export const receive = asyncHandler(async (request: Request, response: Response): void => {
  if (request?.body) {
    const eventBody: SlackEvent = request.body;

    /* Verify if event is coming from Slack
     * TODO: Use signing secret instead */
    if (eventBody?.token !== SLACK_VERIFICATION_TOKEN) {
      throw createHttpError(500, 'Incorrect verification token.');
    }

    switch (eventBody?.type) {
      case 'url_verification': {
        const { challenge } = eventBody as SlackURLVerificationEvent;

        /* Send the challenge string back */
        response.json({
          challenge,
        });
      }

      case 'event_callback': {
        await handleSlackEventType((eventBody as SlackEventCallbackEvent).event);
      }

      default: {
        throw createHttpError(500, 'Unknown event.');
      }
    }
  }

  response.status(500);
});
