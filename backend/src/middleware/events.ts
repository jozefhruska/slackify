import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import crypto from 'crypto';

import { SlackHTTPHeaders } from '../types/events';
import { SLACK_SIGNING_SECRET } from '../config';

export const verifySlackSignature = (
  request: Request,
  response: Response,
  next: NextFunction
): void => {
  const headers = request?.headers as SlackHTTPHeaders;

  /* Check if both signature and timetamp headers are defined */
  if (headers?.['x-slack-signature'] && headers?.['x-slack-request-timestamp']) {
    /* Concatenate signature base string */
    const timestamp = parseInt(headers['x-slack-request-timestamp']);
    const requestBody = JSON.stringify(request?.body);
    const signatureBaseString = 'v0:' + timestamp + ':' + requestBody;

    /* Check if timestamp is not older than five minutes */
    const currentTime = Math.floor(new Date().getTime() / 1000);
    if (Math.abs(currentTime - timestamp) > 300) {
      throw createHttpError(400, 'Incorrect Slack request timestamp.');
    }

    if (typeof SLACK_SIGNING_SECRET === 'string') {
      /* Create a signature hash */
      const hashedSignature =
        'v0=' +
        crypto
          .createHmac('sha256', SLACK_SIGNING_SECRET)
          .update(signatureBaseString, 'utf8')
          .digest('hex');

      if (hashedSignature === headers['x-slack-signature']) {
        next();
      } else {
        throw createHttpError(400, 'Incorrect Slack verification signature.');
      }
    } else {
      process.exit(1);
    }
  } else {
    throw createHttpError(400, 'Undefined Slack verification signature or timestamp.');
  }
};
