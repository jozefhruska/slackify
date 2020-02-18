import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';
import { SlackAction } from '@slack/bolt';

import { handleBlockActions } from '../utils/actions';

/**
 * Receive actions from Slack.
 */
export const receive = asyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    if (request?.body?.payload) {
      const requestBody = JSON.parse(request.body.payload) as SlackAction;

      switch (requestBody.type) {
        case 'block_actions': {
          handleBlockActions(requestBody, request, response, next);
          return;
        }
      }
    }

    return next(createHttpError(400, 'Missing payload data.'));
  }
);
