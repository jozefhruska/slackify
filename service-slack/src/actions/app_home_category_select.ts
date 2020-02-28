import { SlackActionMiddlewareArgs, Middleware, BlockStaticSelectAction } from '@slack/bolt';

import { compose_app_home_view } from '../utils/views';
import { app } from '..';

/**
 * Handles selection of category on app home.
 */
const app_home_category_select: Middleware<SlackActionMiddlewareArgs<
  BlockStaticSelectAction
>> = async ({ body, action, ack }) => {
  ack();

  const selectedCategory = action.selected_option;

  try {
    if (body?.user?.team_id) {
      const view = await compose_app_home_view(body?.user?.team_id, selectedCategory);

      if (view) {
        /* Publish app home view */
        await app.client.views.publish({
          user_id: body.user.id,
          view,
        });
      } else {
        throw new Error("Unable to compose 'app home' view.");
      }
    } else {
      throw new Error('Team ID is not defined.');
    }
  } catch (error) {
    console.error(error);
  }
};

export default app_home_category_select;
