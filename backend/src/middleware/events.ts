import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import rawBody from 'raw-body';
import crypto from 'crypto';
import tsscmp from 'tsscmp';

import { SlackHTTPHeaders } from '../types/events';
import { SLACK_SIGNING_SECRET } from '../config';

export const verifySlackSignature = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const headers = request?.headers as SlackHTTPHeaders;

  /* Check if both signature and timestamp headers are defined */
  if (headers?.['x-slack-signature'] && headers?.['x-slack-request-timestamp']) {
    const requestTimestamp = Number(headers['x-slack-request-timestamp']);
    const requestSignature = request.headers['x-slack-signature'] as string;

    /* Get request raw body */
    const requestRawBody = (await rawBody(request)).toString();

    /* Check if timestamp is not older than five minutes */
    if (requestTimestamp < Math.floor(Date.now() / 1000) - 60 * 5) {
      throw createHttpError(400, 'Incorrect Slack request timestamp.');
    }

    /* Create HMAC */
    const hmac = crypto.createHmac('sha256', SLACK_SIGNING_SECRET as string);

    /* Create a signature hash */
    const [version, hash] = requestSignature.split('=');
    const baseString = `${version}:${requestTimestamp}:${requestRawBody}`;
    hmac.update(baseString, 'utf8');

    /* Compare signatures */
    if (!tsscmp(hash, hmac.digest('hex'))) {
      throw createHttpError(400, 'Incorrect Slack verification signature.');
    }

    next();
  } else {
    throw createHttpError(400, 'Undefined Slack verification signature or timestamp.');
  }
};
