import { ApolloServer, AuthenticationError } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { PrismaClient, Team } from '@prisma/client';

import { schema } from './schema';
import { teamIdMiddleware, statsMiddleware } from './middleware';
import { permissions } from './permissions';
import { PORT } from './config';

/* Create Prisma Client instance */
const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  team: Team;
  authToken: string;
}

/* Apply GraphQL middleware */
const schemaWithMiddleware = applyMiddleware(
  schema,
  permissions,
  teamIdMiddleware,
  statsMiddleware
);

/* Create Apollo Server instance */
const server = new ApolloServer({
  schema: schemaWithMiddleware,
  introspection: true,
  playground: true,
  context: async ({ req }) => {
    let authToken = req.headers.authorization;

    /* Check if Authorization header is present */
    if (!authToken) {
      throw new AuthenticationError('Authorization header missing.');
    }

    /* Cut 'Bearer ' */
    authToken = authToken.replace('Bearer ', '');

    const team = await prisma.team.findOne({
      where: {
        accessToken: authToken,
      },
    });

    return { prisma, team, authToken };
  },
});

server.listen({ port: PORT || 5100 }).then(({ url }) => {
  console.log(`[service-public] ✅  Running on ${url}.`);
});
