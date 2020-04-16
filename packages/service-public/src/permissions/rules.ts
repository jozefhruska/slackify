import { rule } from 'graphql-shield';
import { Context } from '..';
import { AuthenticationError } from 'apollo-server';

/**
 * Checks if user is authenticated.
 */
export const isTeamFound = rule({ cache: 'contextual' })(
  async (_parent, _args, { team }: Context) => {
    if (team) {
      return true;
    }

    return new AuthenticationError('Incorrect authentication token.');
  }
);
