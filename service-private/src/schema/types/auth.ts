import { objectType } from 'nexus';

/**
 * Sign in mutation output.
 */
export const SignInOutput = objectType({
  name: 'SignInOutput',
  definition(t) {
    t.string('authToken');
    t.field('user', { type: 'User' });
  },
});
