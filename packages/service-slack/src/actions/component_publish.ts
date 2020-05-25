import { Middleware, SlackActionMiddlewareArgs, BlockButtonAction } from '@slack/bolt';
import { User } from '@prisma/client';

import { prisma } from '../prisma';
import { compose_app_home_view } from '../views/app_home';
import { app } from '..';

/**
 * Marks a component as published on "component_hide" action.
 */
const component_publish: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  action,
  body,
  ack,
  context,
}) => {
  try {
    /* Acknowledge action */
    await ack();

    /* Extract user */
    const user = context?.user as User;

    /* Check if user was extracted successfully */
    if (!user) {
      throw new Error('[actions/component_publish]: Unable to extract user data.');
    }

    /* Extract component, user and view IDs */
    const componentId = action?.value;
    const userId = user.id;
    const teamId = body?.team?.id;

    /* Check if component, user and view IDs are defined */
    if (!componentId || !userId || !teamId) {
      throw new Error('[actions/component_publish]: Component, user or view IDs are not defined.');
    }

    /* Update component data */
    const updatedComponent = await prisma.component.update({
      where: {
        id: componentId,
      },
      data: {
        published: true,
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
      updatedComponent?.collection?.id
    );

    /* Check if view was successfully composed */
    if (!appHomeView) {
      throw new Error('[actions/component_publish]: Unable to compose view.');
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

export default component_publish;
