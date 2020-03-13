import { ApolloServer, AuthenticationError } from 'apollo-server';
import { PrismaClient, Team, User } from '@prisma/client';
import jwtDecode from 'jwt-decode';

import { schema } from './schema';
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
  schema,
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

      try {
        user = await prisma.user.findOne({
          where: {
            id: decodedToken.data.id,
          },
          select: {
            id: true,
            name: true,
            email: true,
            accessToken: true,
            image_24: true,
            image_32: true,
            image_48: true,
            image_72: true,
            image_192: true,
            image_512: true,
            team: true,
          },
        });
      } catch (error) {
        console.error(error);
        throw new AuthenticationError('Unable to find the requested user.');
      }

      /* Check if user was found */
      if (!user) {
        throw new AuthenticationError("Requested user doesn't exist.");
      }
    }

    return { prisma, user, team: user?.team };
  },
});

server.listen({ port: PORT || 5000 }).then(({ url }) => {
  console.log(`[service-private] ⛔️  Running on ${url}.`);
});
