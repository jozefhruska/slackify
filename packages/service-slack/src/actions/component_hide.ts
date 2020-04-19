import { Middleware, SlackActionMiddlewareArgs, BlockButtonAction } from '@slack/bolt';

import { prisma } from '../prisma';
import { compose_app_home_view } from '../views/app_home';
import { app } from '..';

/**
 * Marks a component as unpublished on "component_hide" action.
 */
const component_hide: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
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
      throw new Error('[actions/component_publish]: Component, user or view IDs are not defined.');
    }

    /* Update component data */
    await prisma.component.update({
      where: {
        id: componentId,
      },
      data: {
        published: false,
      },
    });

    /* Compose app home view */
    const appHomeView = await compose_app_home_view(teamId);

    /* Check if view was successfully composed */
    if (!appHomeView) {
      throw new Error('[actions/component_publish]: Unable to compose view.');
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

export default component_hide;
