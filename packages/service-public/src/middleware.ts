import { IMiddleware } from 'graphql-middleware';
import { Context } from '.';
import { Component } from '@prisma/client';

/**
 * Filters collection by a team so user is not able to view data of other teams.
 */
export const collectionsMiddleware: IMiddleware<unknown, Context> = async (
  resolve,
  root,
  args,
  context,
  info
) => {
  let modifiedArgs = args;

  if (!root && info.fieldName === 'collections') {
    modifiedArgs = {
      ...modifiedArgs,
      where: {
        ...modifiedArgs.where,
        teamId: {
          equals: context.team.id,
        },
      },
    };
  }

  return await resolve(root, modifiedArgs, context, info);
};

/**
 * Creates new statistics record for every requested component
 */
export const statsMiddleware: IMiddleware<unknown, Context> = async (
  resolve,
  root,
  args,
  context,
  info
) => {
  const result = await resolve(root, args, context, info);

  if (!result) {
    return result;
  }

  if (info.fieldName === 'component') {
    /* Extract component ID */
    const componentId = result?.id;

    /* Check if component ID was extracted successfully */
    if (!componentId) {
      console.error('[statistics] Unable to extract component ID.');
      return result;
    }

    try {
      await context.prisma.statRecord.create({
        data: {
          component: {
            connect: {
              id: componentId,
            },
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (info.fieldName === 'components') {
    result.forEach(async (component: Component) => {
      /* Extract component ID */
      const componentId = component?.id;

      /* Check if component ID was extracted successfully */
      if (!componentId) {
        console.error('[statistics] Unable to extract component ID.');
        return result;
      }

      try {
        await context.prisma.statRecord.create({
          data: {
            component: {
              connect: {
                id: componentId,
              },
            },
          },
        });
      } catch (error) {
        console.error(error);
      }
    });
  }

  return result;
};
