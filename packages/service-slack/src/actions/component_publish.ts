import { Middleware, SlackActionMiddlewareArgs, BlockButtonAction } from '@slack/bolt';

import { prisma } from '../prisma';
import { compose_app_home_view } from '../views/app_home';
import { app } from '..';

/**
 * Handles component publish event.
 */
const component_publish: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  action,
  body,
  ack,
}) => {
  ack();

  const componentId = action.value;
  const userId = body.user.id;
  const teamId = body.team.id;

  try {
    const component = await prisma.component.findOne({
      where: {
        id: componentId,
      },
    });

    if (component) {
      /* Mark component as published */
      await prisma.component.update({
        where: {
          id: componentId,
        },
        data: {
          published: true,
        },
      });

      const appHomeView = await compose_app_home_view(teamId);

      if (appHomeView) {
        /* Publish app home view */
        await app.client.views.publish({
          user_id: userId,
          view: appHomeView,
        });
      } else {
        throw new Error("Unable to compose 'app home' view.");
      }
    } else {
      throw new Error(`Unable to find a component with id '${componentId}'`);
    }
  } catch (error) {
    console.error(error);
  }
};

export default component_publish;
