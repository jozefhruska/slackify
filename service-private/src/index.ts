import { ApolloServer } from 'apollo-server';

import { schema } from './schema';
import { createContext } from './context';
import { PORT } from './config';

/* Create Apollo Server instance */
const server = new ApolloServer({ schema, context: createContext });

server.listen({ port: PORT || 5000 }).then(({ url }) => {
  console.log(`[service-private] ⛔️  Running on ${url}.`);
});
