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
 * Handles the submission event of create new collection modal.
 */
const create_new_collection_submission: Middleware<SlackViewMiddlewareArgs<
  ViewSubmitAction
>> = async ({ view, body, ack }) => {
  const teamId = body?.user?.team_id;

  /* Extract field values */
  const values = (view?.state as SubmissionState).values;
  const name = values?.name?.name.value;
  const description = values?.description?.description.value;
  const type = values?.type?.type?.selected_option.value;

  /* Check if there is a collection with the same handle amd team ID */
  try {
    const teamCollections = await prisma.collection.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
      select: {
        name: true,
      },
    });

    const duplicateCollection = teamCollections.find(({ name: catName }) => catName === name);

    if (duplicateCollection) {
      ack({
        response_action: 'errors',
        errors: {
          name: 'There is already a collection with this name in your workspace.',
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
    });

    /* Update app home view */
    if (teamId) {
      const view = await compose_app_home_view(teamId, collection.id);

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
