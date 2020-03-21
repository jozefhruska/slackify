import { Middleware, SlackActionMiddlewareArgs, BlockStaticSelectAction } from '@slack/bolt';

import { compose_create_new_component_modal } from '../views/components';
import { SLACK_BOT_TOKEN } from '../config';
import { app } from '..';

/**
 * Handles 'create_new_component_collection_select' action.
 */
const create_new_component_collection_select: Middleware<SlackActionMiddlewareArgs<
  BlockStaticSelectAction
>> = async ({ body, action, ack }) => {
  /* Acknowledge action */
  ack();

  /* Extract user and team IDs */
  const userId = body?.user?.id;
  const teamId = body?.team?.id;

  /* Check if user and team IDs are defined */
  if (!userId || !teamId) {
    console.error(
      new Error('[actions/create_new_component_collection_select]: User or team ID undefined.')
    );
    return;
  }

  /* Extract selected collection ID */
  const selectedCollectionId = action.selected_option.value;

  /* Compose view */
  const view = await compose_create_new_component_modal(body?.team.id, selectedCollectionId);

  /* Check if view was successfully composed */
  if (!view) {
    console.error(
      new Error('[actions/create_new_component_collection_select]: Unable to compose view.')
    );
    return;
  }

  /* Extract view ID */
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const viewId = body.view?.id;

  /* Check if view ID is defined */
  if (!viewId) {
    console.error(
      new Error('[actions/create_new_component_collection_select]: View ID undefined.')
    );
    return;
  }

  try {
    /* Update view */
    await app.client.views.update({
      view_id: viewId,
      token: SLACK_BOT_TOKEN,
      trigger_id: body.trigger_id,
      view,
    });
  } catch (error) {
    console.error(error);
  }
};

export default create_new_component_collection_select;
