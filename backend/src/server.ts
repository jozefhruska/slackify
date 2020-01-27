import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { schema } from './schema';
import { createContext } from './context';
import { PORT } from './config';

/* Create Apollo Server instance */
const apollo = new ApolloServer({ schema, context: createContext });

/* Connect with Express */
const app = express();
apollo.applyMiddleware({ app, path: '/private' });

/* Start the Apollo Express Server */
app.listen({ port: PORT }, () =>
  console.log(`🚀  [Private] Server ready at http://localhost:4000${apollo.graphqlPath}`)
);
