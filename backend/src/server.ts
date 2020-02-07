import { ApolloServer } from 'apollo-server-express';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { HttpError } from 'http-errors';

import { schema } from './schema';
import { createContext } from './context';
import { PORT } from './config';

import routes from './routes';

/* Create Apollo Server instance */
const apollo = new ApolloServer({ schema, context: createContext });

/* Connect with Express */
const app = express();
apollo.applyMiddleware({ app, path: '/api' });

/* Configure body parser */
const rawBodyBuffer = (
  request: Request,
  response: Response,
  buffer: Buffer,
  encoding: string
): void => {
  if (buffer?.length) {
    request.rawBody = buffer.toString(encoding || 'utf8');
  }
};

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

/* Root route */
app.use('/', routes);

/* Handle HTTP errors */
app.use((error: HttpError, request: Request, response: Response) => {
  response.status(error.status);

  response.json({
    status: error.status,
    message: error.message,
    stack: error.stack,
  });
});

/* Start the Apollo Express Server */
app.listen({ port: PORT }, () =>
  console.log(`🚀  [Slackify] Server ready at http://localhost:4000.`)
);
