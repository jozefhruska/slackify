import { Middleware, SlackActionMiddlewareArgs, BlockStaticSelectAction } from '@slack/bolt';

import { compose_create_new_component_modal } from '../views/components';
import { app } from '..';

/**
 * Updates the create new component modal when user selects a collection on "create_new_component_collection_select".
 */
const create_new_component_collection_select: Middleware<SlackActionMiddlewareArgs<
  BlockStaticSelectAction
>> = async ({ body, action, ack, context }) => {
  try {
    /* Acknowledge action */
    await ack();

    /* Extract user, team and view IDs */
    const userId = body?.user?.id;
    const teamId = body?.team?.id;
    const viewId = body?.view?.id;

    /* Check if user and team IDs are defined */
    if (!userId || !teamId || !viewId) {
      throw new Error(
        '[actions/create_new_component_collection_select]: User, team or view IDs are not defined.'
      );
    }

    /* Extract selected collection ID */
    const selectedCollectionId = action.selected_option.value;

    /* Compose view */
    const view = await compose_create_new_component_modal(body?.team.id, selectedCollectionId);

    /* Check if view was successfully composed */
    if (!view) {
      throw new Error('[actions/create_new_component_collection_select]: Unable to compose view.');
    }

    /* Update modal view */
    await app.client.views.update({
      token: context?.botToken,
      trigger_id: body.trigger_id,
      view_id: viewId,
      view,
    });
  } catch (error) {
    console.error(error);
  }
};

export default create_new_component_collection_select;
