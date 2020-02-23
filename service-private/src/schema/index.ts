import { makeSchema } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';

import * as queryTypes from './Query';
import * as teamTypes from './Team';

const path = require('path');

export const schema = makeSchema({
  types: { ...teamTypes, ...queryTypes },
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
        source: path.join(__dirname, '../context.ts'),
        alias: 'Context',
      },
    ],
  },
});
