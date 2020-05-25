import { SlackActionMiddlewareArgs, Middleware, BlockOverflowAction } from '@slack/bolt';
import { User } from '@prisma/client';

import { app } from '..';
import { prisma } from '../prisma';
import { compose_manage_collections_view } from '../utils/views';
import { compose_update_collection_modal } from '../views/collections';
import { compose_app_home_view } from '../views/app_home';

/* Local types
============================================================================= */
type OptionPayload = {
  id: string;
  option: 'publish' | 'hide' | 'edit' | 'delete';
};

/**
 * Handles different events on "create_new_component_open" action.
 */
const collection_overflow: Middleware<SlackActionMiddlewareArgs<BlockOverflowAction>> = async ({
  body,
  ack,
  context,
}) => {
  try {
    /* Acknowledge Slack action */
    await ack();

    /* Extract user */
    const user = context?.user as User;

    /* Check if user was extracted successfully */
    if (!user) {
      throw new Error('[actions/collection_overflow]: Unable to extract user data.');
    }

    /* Extract selected option, view, user and team IDs */
    const selectedOption: OptionPayload = JSON.parse(body?.actions[0].selected_option?.value);
    const viewId = body?.view?.id;
    const userId = user.id;
    const teamId = body?.team?.id;

    /* Check if selected option, view, user and team IDs are defined */
    if (!selectedOption || !viewId || !userId || !teamId) {
      throw new Error(
        '[actions/collection_overflow]: Selected option, view, user or team IDs are not defined.'
      );
    }

    /* Resolve specific options */
    switch (selectedOption.option) {
      case 'publish': {
        /* Update collection data */
        await prisma.collection.update({
          where: {
            id: selectedOption?.id,
          },
          data: {
            published: true,
          },
        });

        break;
      }

      case 'hide': {
        /* Update collection data */
        await prisma.collection.update({
          where: {
            id: selectedOption?.id,
          },
          data: {
            published: false,
          },
        });

        break;
      }

      case 'edit': {
        /* Compose modal view */
        const view = await compose_update_collection_modal(selectedOption.id, viewId);

        /* Check if view was successfully composed */
        if (!view) {
          throw new Error('[actions/collection_overflow]: Unable to compose view.');
        }

        /* Push new modal view */
        await app.client.views.push({
          token: context?.botToken,
          trigger_id: body.trigger_id,
          view,
        });

        break;
      }

      case 'delete': {
        /* Delete all child components */
        await prisma.component.deleteMany({
          where: {
            collection: {
              id: {
                equals: selectedOption.id,
              },
            },
          },
        });

        /* Delete collection */
        await prisma.collection.delete({
          where: {
            id: selectedOption.id,
          },
        });

        break;
      }

      default: {
        throw new Error('[actions/collection_overflow]: Unknown option type.');
      }
    }

    /* Compose modal view */
    const view = await compose_manage_collections_view(body?.team.id, userId);

    /* Check if view was successfully composed */
    if (!view) {
      throw new Error('[actions/collection_overflow]: Unable to compose view.');
    }

    /* Update modal */
    await app.client.views.update({
      token: context?.botToken,
      view_id: viewId,
      view,
    });

    /* Compose app home view */
    const appHomeView = await compose_app_home_view(teamId, userId);

    /* Check if view was successfully composed */
    if (!appHomeView) {
      throw new Error('[actions/collection_overflow]: Unable to compose view.');
    }

    /* Publish app home view */
    await app.client.views.publish({
      token: context?.botToken,
      user_id: user.slackId,
      view: appHomeView,
    });
  } catch (error) {
    console.error(error);
  }
};

export default collection_overflow;
