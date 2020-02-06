import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { schema } from './schema';
import { createContext } from './context';
import { PORT } from './config';

import routes from './routes';

/* Create Apollo Server instance */
const apollo = new ApolloServer({ schema, context: createContext });

/* Connect with Express */
const app = express();
apollo.applyMiddleware({ app, path: '/api' });

app.use('/', routes);

/* Start the Apollo Express Server */
app.listen({ port: PORT }, () =>
  console.log(`🚀  [Slackify] Server ready at http://localhost:4000.`)
);
