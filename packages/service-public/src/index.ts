import { ApolloServer, AuthenticationError } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { PrismaClient, Team } from '@prisma/client';

import { schema } from './schema';
import { collectionsMiddleware } from './middleware';
import { PORT } from './config';

/* Create Prisma Client instance */
const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  team: Team;
}

/* Apply GraphQL middleware */
const schemaWithMiddleware = applyMiddleware(schema, collectionsMiddleware);

/* Create Apollo Server instance */
const server = new ApolloServer({
  schema: schemaWithMiddleware,
  playground: true,
  context: async ({ req }) => {
    let authToken = req.headers.authorization;

    /* Check if Authorization header is present */
    if (!authToken) {
      throw new AuthenticationError('Authorization header missing.');
    }

    /* Check if Authorization header is in correct format */
    if (!authToken.match(/Bearer\s[A-Fa-f0-9]{64}/)) {
      throw new AuthenticationError('Authorization header wrong format.');
    }

    /* Cut 'Bearer ' */
    authToken = authToken.replace('Bearer ', '');

    const team = await prisma.team.findOne({
      where: {
        accessToken: authToken,
      },
    });

    /* Check if user was found */
    if (!team) {
      throw new AuthenticationError("Auth token doesn't belong to any team.");
    }

    return { prisma, team };
  },
});

server.listen({ port: PORT || 5100 }).then(({ url }) => {
  console.log(`[service-public] ✅  Running on ${url}.`);
});
