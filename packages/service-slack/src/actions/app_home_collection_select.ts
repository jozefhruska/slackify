import { SlackActionMiddlewareArgs, Middleware, BlockStaticSelectAction } from '@slack/bolt';

import { compose_app_home_view } from '../views/app_home';
import { User } from '@prisma/client';
import { app } from '..';

/**
 * Updates the app home view with selected collection on "app_home_collection_select" action.
 */
const app_home_collection_select: Middleware<SlackActionMiddlewareArgs<
  BlockStaticSelectAction
>> = async ({ body, action, ack, context }) => {
  try {
    /* Acknowledge action */
    await ack();

    /* Extract user */
    const user = context?.user as User;

    /* Check if user was extracted successfully */
    if (!user) {
      throw new Error('[actions/app_home_collection_select]: Unable to extract user data.');
    }

    /* Extract selected collection, user and team IDs */
    const selectedCollection = action.selected_option;
    const userId = user.id;
    const teamId = body?.team?.id;

    /* Check if selected collection, user and team IDs are defined */
    if (!selectedCollection || !userId || !teamId) {
      throw new Error(
        '[actions/app_home_collection_select]: Selected collection, user or team IDs are not defined.'
      );
    }

    /* Compose view */
    const view = await compose_app_home_view(teamId, userId, selectedCollection.value);

    /* Check if view was successfully composed */
    if (!view) {
      throw new Error('[actions/app_home_collection_select]: Unable to compose view.');
    }

    /* Publish app home view */
    await app.client.views.publish({
      token: context?.botToken,
      user_id: user.slackId,
      view,
    });
  } catch (error) {
    console.error(error);
  }
};

export default app_home_collection_select;
