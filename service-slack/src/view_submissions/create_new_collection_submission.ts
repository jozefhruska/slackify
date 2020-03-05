import { SlackViewMiddlewareArgs, ViewSubmitAction, Middleware } from '@slack/bolt';

import { prisma } from '../prisma';
import { compose_app_home_view } from '../utils/views';
import { app } from '..';

/* Local types
============================================================================= */
type CreateNewCollectionModalSubmissionState = {
  values: {
    collection_handle_block: {
      collection_handle_element: {
        type: 'plain_text_input';
        value: string;
      };
    };
  };
};

/**
 * Handles the submission event of create new collection modal.
 */
const create_new_collection_submission: Middleware<SlackViewMiddlewareArgs<
  ViewSubmitAction
>> = async ({ view, body, ack }) => {
  const teamId = body?.user?.team_id;

  /* Extract field values */
  const values = (view?.state as CreateNewCollectionModalSubmissionState).values;
  const collectionHandle = values?.collection_handle_block?.collection_handle_element.value;

  /* Check if collection handle is in correct format */
  if (!collectionHandle.match(/^([a-z]|-|_)*$/)) {
    ack({
      response_action: 'errors',
      errors: {
        collection_handle_block:
          "Collection handle must contain only lowercase characters, '_' (underscore) and '–' (dash).",
      },
    });

    return;
  }

  /* Check if there is a collection with the same handle amd team ID */
  try {
    const teamCategories = await prisma.collection.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
    });

    const duplicateCollection = teamCategories.find(({ handle }) => handle === collectionHandle);

    if (duplicateCollection) {
      ack({
        response_action: 'errors',
        errors: {
          collection_handle_block: 'Collection with this handle already exists in your workspace.',
        },
      });

      return;
    }
  } catch (error) {
    console.error(error);
  }

  /* Acknowledge Slack action */
  ack();

  try {
    /* Create new collection */
    await prisma.collection.create({
      data: {
        handle: collectionHandle,
        team: {
          connect: {
            id: teamId,
          },
        },
      },
    });

    /* Update app home view */
    if (teamId) {
      const view = await compose_app_home_view(teamId);

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

export default create_new_collection_submission;
