import { makeSchema } from 'nexus';
import { nexusPrismaPlugin } from 'nexus-prisma';

import * as userTypes from './User';
import * as postTypes from './Post';
import * as queryTypes from './Query';
import * as mutationTypes from './Mutation';
import path = require('path');

export const schema = makeSchema({
  types: { ...userTypes, ...postTypes, ...queryTypes, ...mutationTypes },
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: path.join(__dirname, '../generated/schema.graphql'),
    typegen: path.join(__dirname, '../generated/nexus.ts'),
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('../context'),
        alias: 'Context',
      },
    ],
  },
});
