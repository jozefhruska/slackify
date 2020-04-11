/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Middleware, SlackActionMiddlewareArgs, BlockButtonAction } from '@slack/bolt';

import { prisma } from '../prisma';
import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';
import { compose_manage_collections_view } from '../utils/views';

const delete_collection: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  action,
  body,
  ack,
}) => {
  const collectionId = action?.value;

  /* Check if collection ID is defined */
  if (collectionId == undefined) {
    console.error('[delete_collection] - Collection ID is undefined.');
    return;
  }

  /* Acknowledge Slack action */
  ack();

  /* Delete collection */
  try {
    await prisma.collection.delete({
      where: {
        id: collectionId,
      },
    });
  } catch (error) {
    console.error(error);
  }

  /* Update modal view */
  try {
    const view = await compose_manage_collections_view(body?.team.id);

    if (view) {
      await app.client.views.update({
        token: SLACK_BOT_TOKEN,
        //@ts-ignore
        view_id: body?.view?.id,
        view,
      });
    }
  } catch (error) {
    console.error(error.data.response_metadata);
  }
};

export default delete_collection;
