import { Middleware, SlackActionMiddlewareArgs, BlockButtonAction } from '@slack/bolt';

import { prisma } from '../prisma';
import { compose_app_home_view } from '../views/app_home';
import { app } from '..';

/**
 * Delete component on "delete_component" action.
 */
const delete_component: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  action,
  body,
  ack,
}) => {
  try {
    /* Acknowledge action */
    await ack();

    /* Extract component, user and view IDs */
    const componentId = action?.value;
    const userId = body?.user?.id;
    const teamId = body?.team?.id;

    /* Check if component, user and view IDs are defined */
    if (!componentId || !userId || !teamId) {
      throw new Error('[actions/delete_component]: Component, user or view IDs are not defined.');
    }

    /* Delete component */
    const deletedComponent = await prisma.component.delete({
      where: {
        id: componentId,
      },
      select: {
        collection: {
          select: {
            id: true,
          },
        },
      },
    });

    /* Compose app home view */
    const appHomeView = await compose_app_home_view(
      teamId,
      userId,
      deletedComponent?.collection?.id
    );

    /* Check if view was successfully composed */
    if (!appHomeView) {
      throw new Error('[actions/delete_component]: Unable to compose view.');
    }

    /* Publish app home view */
    await app.client.views.publish({
      user_id: userId,
      view: appHomeView,
    });
  } catch (error) {
    console.error(error);
  }
};

export default delete_component;
