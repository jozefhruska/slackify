import { ViewSubmitAction, Middleware, SlackViewMiddlewareArgs } from '@slack/bolt';

import { prisma } from '../prisma';
import { compose_manage_collections_view } from '../utils/views';
import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';

/* Local types
============================================================================= */
type SubmissionValues = {
  name: {
    name: {
      type: 'plain_text_input';
      value: string;
    };
  };
  description: {
    description: {
      type: 'plain_text_input';
      value: string;
    };
  };
};

type PrivateMetadata = {
  collectionId: string;
  manageCollectionsViewId: string;
};

/**
 * Updates collection and manage collections view on "update_collection" view submit action.
 */
const update_collection: Middleware<SlackViewMiddlewareArgs<ViewSubmitAction>> = async ({
  view,
  body,
  ack,
}) => {
  try {
    /* Extract private metadata, user and team IDs */
    const privateMetadata: PrivateMetadata = JSON.parse(view?.private_metadata);
    const userId = body?.user?.id;
    const teamId = body?.user?.team_id;

    /* Check if private metadata, user and team IDs are defined */
    if (!privateMetadata || !userId || !teamId) {
      throw new Error(
        '[view_submission/update_collection]: Private metadata, user or team IDs are not defined.'
      );
    }

    /* Extract field values */
    const values = view?.state.values as SubmissionValues;
    const name = values?.name?.name.value;
    const description = values?.description?.description.value;

    /* Acknowledge Slack action */
    await ack();

    /* Update collection data */
    await prisma.collection.update({
      where: {
        id: privateMetadata.collectionId,
      },
      data: {
        name,
        description,
      },
    });

    /* Compose modal view */
    const modalView = await compose_manage_collections_view(body?.team.id, userId);

    /* Check if view was successfully composed */
    if (!modalView) {
      throw new Error('[view_submission/update_collection]: Unable to compose view.');
    }

    /* Update modal */
    await app.client.views.update({
      token: SLACK_BOT_TOKEN,
      view_id: privateMetadata.manageCollectionsViewId,
      view: modalView,
    });
  } catch (error) {
    console.error(error);
  }
};

export default update_collection;
