import { makeSchema } from '@nexus/schema';
import { nexusPrismaPlugin } from 'nexus-prisma';
import path from 'path';

import * as mutationTypes from './mutations';
import * as queryTypes from './queries';
import * as otherTypes from './types';

export const schema = makeSchema({
  types: { ...mutationTypes, ...queryTypes, ...otherTypes },
  plugins: [
    nexusPrismaPlugin({
      shouldGenerateArtifacts: true,
    }),
  ],
  outputs: {
    schema: path.join(__dirname, '../types/generated/schema.graphql'),
    typegen: path.join(__dirname, '../types/generated/nexus.ts'),
  },
  shouldGenerateArtifacts: true,
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
