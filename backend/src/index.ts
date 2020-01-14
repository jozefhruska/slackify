import { ApolloServer } from 'apollo-server';
import { makeExecutableSchema } from 'graphql-tools';

import resolvers from './resolvers';
import * as typeDefs from './schema.graphql';

/* Create a GraphQL schema */
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

/* Create an instance of Apollo Server */
const server = new ApolloServer({ playground: process?.env?.NODE_ENV === 'development', schema });

/* Start the server */
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
