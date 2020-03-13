import { ApolloClient } from '@apollo/client';
import { AppCache } from '../../api';

declare module 'next' {
  export interface NextPageContext {
    apolloClient: ApolloClient<AppCache>;
  }
}
