import { rule } from 'graphql-shield';

export const isAuthenticated = rule({ cache: 'contextual' })(async (_parent, _args, { user }) => {
  return user !== undefined;
});
