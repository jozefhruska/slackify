import { IMiddleware } from 'graphql-middleware';
import { Context } from '.';

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
