import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { schema } from './schema';
import { createContext } from './context';

/* Get port number from environment variables */
const port = process.env.PORT ? process.env.PORT : 4000;

/* Create Apollo Server instace */
const apollo = new ApolloServer({ schema, context: createContext });

/* Connect with Express */
const app = express();
apollo.applyMiddleware({ app, path: '/private' });

/* Start the Apollo Express Server */
app.listen({ port }, () =>
  console.log(`🚀  [Private] Server ready at http://localhost:4000${apollo.graphqlPath}`)
);
