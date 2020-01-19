import { ApolloServer } from 'apollo-server';
import { schema } from './schema';
import { createContext } from './context';

const port = process.env.PORT ? process.env.PORT : 4000;

new ApolloServer({ schema, context: createContext }).listen({ port }, () =>
  console.log(`🚀  Server ready at: http://localhost:${port} ⭐️`)
);
