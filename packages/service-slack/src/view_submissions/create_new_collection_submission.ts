import { SlackViewMiddlewareArgs, ViewSubmitAction, Middleware } from '@slack/bolt';
import { PlainTextElement } from '@slack/web-api';
import { ComponentType } from '@prisma/client';

import { prisma } from '../prisma';
import { compose_app_home_view } from '../views/app_home';
import { app } from '..';

/* Local types
============================================================================= */
type SubmissionState = {
  values: {
    name: {
      name: {
        type: 'plain_text_input';
        value: string;
      };
    };
    description: {
      description: {
        type: 'plain_text_input';
        value: string;
      };
    };
    type: {
      type: {
        type: 'static_select';
        selected_option: {
          text: PlainTextElement;
          value: ComponentType;
        };
      };
    };
  };
};

/**
 * Creates new collection and updates the app home view on "create_new_collection_submission" view submit action.
 */
const create_new_collection_submission: Middleware<SlackViewMiddlewareArgs<
  ViewSubmitAction
>> = async ({ view, body, ack }) => {
  try {
    /* Extract user and team IDs */
    const userId = body?.user?.id;
    const teamId = body?.team?.id;

    /* Check if user and team IDs are defined */
    if (!userId || !teamId) {
      throw new Error(
        '[view_submission/create_new_collection_submission]: User or team IDs are not defined.'
      );
    }

    /* Extract field values */
    const values = (view?.state as SubmissionState).values;
    const name = values?.name?.name.value;
    const description = values?.description?.description.value;
    const type = values?.type?.type?.selected_option.value;

    /* Check if there is a collection with the same name and team ID */
    const teamCollections = await prisma.collection.count({
      where: {
        name,
        team: {
          id: teamId,
        },
      },
    });

    if (teamCollections) {
      await ack({
        response_action: 'errors',
        errors: {
          name: 'There is already a collection with this name in your workspace.',
        },
      });

      return;
    }

    /* Acknowledge Slack action */
    await ack();

    /* Create new collection */
    const collection = await prisma.collection.create({
      data: {
        name,
        type,
        description,
        team: {
          connect: {
            id: teamId,
          },
        },
      },
      select: {
        id: true,
      },
    });

    /* Compose app home view */
    const appHomeView = await compose_app_home_view(teamId, userId, collection.id);

    /* Check if view was successfully composed */
    if (!appHomeView) {
      throw new Error(
        '[view_submission/create_new_collection_submission]: Unable to compose view.'
      );
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

export default create_new_collection_submission;
