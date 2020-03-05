import { ApolloServer, AuthenticationError } from 'apollo-server';
import { PrismaClient, Team } from '@prisma/client';

import { schema } from './schema';
import { PORT } from './config';

/* Create Prisma Client instance */
const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  team: Team;
}

/* Create Apollo Server instance */
const server = new ApolloServer({
  schema,
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

    return { prisma, team };
  },
});

server.listen({ port: PORT || 5100 }).then(({ url }) => {
  console.log(`[service-public] ✅  Running on ${url}.`);
});
