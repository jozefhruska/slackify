import { Middleware, SlackActionMiddlewareArgs, BlockButtonAction } from '@slack/bolt';

import { prisma } from '../prisma';
import { app } from '..';
import { SLACK_BOT_TOKEN } from '../config';
import { compose_manage_categories_view } from '../utils/views';

const delete_category: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  action,
  body,
  ack,
}) => {
  const categoryId = action?.value;

  /* Check if category ID is defined */
  if (categoryId == undefined) {
    console.error('[delete_category] - Category ID is undefined.');
    return;
  }

  /* Acknowledge Slack action */
  ack();

  /* Delete category */
  try {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  } catch (error) {
    console.error(error);
  }

  /* Update modal view */
  try {
    const view = await compose_manage_categories_view(body?.team.id);

    if (view) {
      await app.client.views.update({
        token: SLACK_BOT_TOKEN,
        view_id: body?.view?.id,
        view,
      });
    }
  } catch (error) {
    console.error(error.data.response_metadata);
  }
};

export default delete_category;
