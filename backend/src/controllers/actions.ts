import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import asyncHandler from 'express-async-handler';

import { SlackActionRequestBody } from '../types/actions';
import { openCategoriesModal } from '../utils/actions';

export const receive = asyncHandler(async (request: Request, response: Response) => {
  if (request?.body?.payload) {
    const requestBody = JSON.parse(request.body.payload) as SlackActionRequestBody;

    if (!requestBody?.actions?.length) {
      throw createHttpError(400, 'Action not specified.');
    }

    switch (requestBody.actions[0].action_id) {
      case 'create_new_category': {
        response.sendStatus(200);

        openCategoriesModal(requestBody.trigger_id);
      }
    }

    return;
  }

  throw createHttpError(400, 'Missing payload data.');
});
