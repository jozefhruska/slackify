import { rule } from 'graphql-shield';
import { Context } from '..';
import { AuthenticationError, ApolloError, ForbiddenError } from 'apollo-server';

/**
 * Checks if user is authenticated.
 */
export const isTeamFound = rule({ cache: 'contextual' })(
  async (_parent, _args, { team }: Context) => {
    if (team) {
      return true;
    }

    return new AuthenticationError('Incorrect authentication token.');
  }
);

/**
 * Checks if team is owner of component.
 */
export const isComponentOwner = rule({ cache: 'contextual' })(
  async (_parent, { where }, { team, prisma }: Context) => {
    /* Extract component ID */
    const componentId = where?.id;

    /* Check if component ID was extracted successfully */
    if (!componentId) {
      return new ApolloError('Unable to extract component ID.');
    }

    /* Extract team ID */
    const teamId = team?.id;

    /* Check if team ID was extracted successfully */
    if (!teamId) {
      return new ApolloError('Unable to extract team ID.');
    }

    /* Check if team owns this component */
    const component = await prisma.component.findOne({
      where: {
        id: componentId,
      },
      select: {
        teamId: true,
      },
    });

    if (!component) {
      return true;
    }

    if (component?.teamId === teamId) {
      return true;
    }

    return new ForbiddenError("You don't have access to this component.");
  }
);

/**
 * Checks if team is owner of collection.
 */
export const isCollectionOwner = rule({ cache: 'contextual' })(
  async (_parent, { where }, { team, prisma }: Context) => {
    /* Extract collection ID */
    const collectionId = where?.id;

    /* Check if collection ID was extracted successfully */
    if (!collectionId) {
      return new ApolloError('Unable to extract collection ID.');
    }

    /* Extract team ID */
    const teamId = team?.id;

    /* Check if team ID was extracted successfully */
    if (!teamId) {
      return new ApolloError('Unable to extract team ID.');
    }

    /* Check if team owns this collection */
    const collection = await prisma.collection.findOne({
      where: {
        id: collectionId,
      },
      select: {
        teamId: true,
      },
    });

    if (!collection) {
      return true;
    }

    if (collection?.teamId === teamId) {
      return true;
    }

    return new ForbiddenError("You don't have access to this collection.");
  }
);
