import ApolloClient from 'apollo-client';
import { AppApolloCache } from './lib/apollo';

declare module 'next' {
  export interface NextPageContext {
    apolloClient?: ApolloClient<AppApolloCache>;
  }
}
