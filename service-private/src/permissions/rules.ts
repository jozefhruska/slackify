import { rule } from 'graphql-shield';

import { Context } from '..';
import { NexusGenInputs } from '../types/generated/nexus';

/**
 * Checks if user is authenticated.
 */
export const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, { user }: Context) => {
    return user !== undefined;
  }
);

/**
 * Checks if user can manage (update, delete) specific collection.
 */
export const canManageCollection = rule({
  cache: 'strict',
})(
  async (
    _,
    {
      where,
    }: {
      data: NexusGenInputs['CollectionUpdateInput'];
      where: NexusGenInputs['CollectionWhereUniqueInput'];
    },
    { prisma, team }: Context
  ) => {
    /* Check if required parameter is defined */
    if (!where?.id) {
      return new Error('[rules/canManageCollection]: Target collection ID is not defined.');
    }

    /* Get target collection */
    const collection = await prisma.collection.findOne({
      where: {
        id: where?.id,
      },
      select: {
        team: true,
      },
    });

    /* Check if collection was found */
    if (!collection) {
      return new Error('[rules/canManageCollection]: Target collection does not exist.');
    }

    /* Check if user's team owns target collection */
    if (collection.team.id === team?.id) {
      return true;
    }

    return false;
  }
);
