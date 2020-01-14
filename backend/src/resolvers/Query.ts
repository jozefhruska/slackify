import { QueryResolvers } from '../generated/graphql';

export const Query: QueryResolvers = {
  hello: (_, { subject }) => {
    return `Hello, ${subject}! from Server`;
  },
};
