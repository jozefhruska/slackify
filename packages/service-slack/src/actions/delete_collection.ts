import { Middleware, SlackActionMiddlewareArgs, BlockButtonAction } from '@slack/bolt';

import { prisma } from '../prisma';
import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';
import { compose_manage_collections_view } from '../utils/views';

/**
 * Deletes a collection and updates the delete collection modal view on "delete_collection" action.
 */
const delete_collection: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  action,
  body,
  ack,
}) => {
  const collectionId = action?.value;
  const viewId = body?.view?.id;

  /* Check if collection and view IDs are defined */
  if (!collectionId || !viewId) {
    throw '[actions/delete_collection] Collection or view IDs are not defined.';
  }

  try {
    /* Acknowledge Slack action */
    await ack();

    /* Delete collection */
    await prisma.collection.delete({
      where: {
        id: collectionId,
      },
    });

    /* Compose modal view */
    const view = await compose_manage_collections_view(body?.team.id);

    /* Check if view was successfully composed */
    if (!view) {
      throw new Error('[actions/delete_collection]: Unable to compose view.');
    }

    /* Update modal view */
    await app.client.views.update({
      token: SLACK_BOT_TOKEN,
      view_id: viewId,
      view,
    });
  } catch (error) {
    console.error(error);
  }
};

export default delete_collection;
