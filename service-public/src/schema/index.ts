import { makeSchema } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';
import path from 'path';

import Query from './Query';
import Team from './Team';
import Collection from './Collection';
import Post from './Post';

export const schema = makeSchema({
  types: { Query, Team, Collection, Post },
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: path.join(__dirname, '../generated/schema.graphql'),
    typegen: path.join(__dirname, '../generated/nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: path.join(__dirname, '../index.ts'),
        alias: 'Context',
      },
    ],
  },
});
