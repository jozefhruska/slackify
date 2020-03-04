import { Middleware, SlackActionMiddlewareArgs, BlockButtonAction } from '@slack/bolt';

import { prisma } from '../prisma';
import { compose_app_home_view } from '../utils/views';
import { app } from '..';

/**
 * Handles post publish event.
 */
const post_publish: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  action,
  body,
  ack,
}) => {
  ack();

  const postId = action.value;
  const userId = body.user.id;
  const teamId = body.team.id;

  try {
    const post = await prisma.post.findOne({
      where: {
        id: postId,
      },
    });

    if (post) {
      /* Mark post as published */
      await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          isPublished: true,
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
      throw new Error(`Unable to find a post with id '${postId}'`);
    }
  } catch (error) {
    console.error(error);
  }
};

export default post_publish;
