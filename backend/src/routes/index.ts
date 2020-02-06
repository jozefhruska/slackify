import express, { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';
import bodyParser from 'body-parser';

import events from './events';

const router = express.Router();

/* Configure body parser */
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.use('/events', events);

/* Handle HTTP errors */
router.use((error: HttpError, request: Request, response: Response) => {
  response.status(error.status);

  response.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

export default router;
