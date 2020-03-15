import { ApolloServer, AuthenticationError } from 'apollo-server';
import { applyMiddleware } from 'graphql-middleware';
import { PrismaClient, Team, User } from '@prisma/client';
import jwtDecode from 'jwt-decode';

import { schema } from './schema';
import { permissions } from './permissions';
import { PORT } from './config';
import { JWTUser } from './types/auth';

/* Create Prisma Client instance */
const prisma = new PrismaClient();

export interface Context {
  prisma: PrismaClient;
  user: User;
  team: Team;
}

/* Create Apollo Server instance */
const server = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: async ({ req }) => {
    let user;
    let authToken = req.headers.authorization;

    if (authToken) {
      /* Check if Authorization header is in correct format */
      if (!authToken.match(/^Bearer\s[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
        throw new AuthenticationError('Authorization header wrong format.');
      }

      /* Cut 'Bearer ' */
      authToken = authToken.replace('Bearer ', '');

      let decodedToken;
      try {
        decodedToken = jwtDecode<JWTUser>(authToken);
      } catch {
        throw new AuthenticationError('Unable to decode JWT token.');
      }

      user = await prisma.user.findOne({
        where: {
          id: decodedToken.data.id,
        },
        include: {
          team: true,
        },
      });
    }

    return { prisma, user, team: user?.team };
  },
});

server.listen({ port: PORT || 5000 }).then(({ url }) => {
  console.log(`[service-private] ⛔️  Running on ${url}.`);
});
