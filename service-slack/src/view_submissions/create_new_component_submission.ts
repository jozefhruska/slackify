import { SlackViewMiddlewareArgs, ViewSubmitAction, Middleware } from '@slack/bolt';
import { prisma } from '../prisma';
import { PlainTextElement } from '@slack/web-api';
import { compose_app_home_view } from '../utils/views';
import { app } from '..';

/* Local types
============================================================================= */
type CreateNewComponentModalSubmissionState = {
  values: {
    component_title_block: {
      component_title_element: {
        type: 'plain_text_input';
        value: string;
      };
    };
    component_short_block: {
      component_short_element: {
        type: 'plain_text_input';
        value: string;
      };
    };
    component_collection_block: {
      component_collection_element: {
        type: 'static_select';
        selected_option: {
          text: PlainTextElement;
          value: string;
        };
      };
    };
    component_content_block: {
      component_content_element: {
        type: 'plain_text_input';
        value: string;
      };
    };
  };
};

/**
 * Handles the submission event of create new component modal.
 */
const create_new_component_submission: Middleware<SlackViewMiddlewareArgs<
  ViewSubmitAction
>> = async ({ view, body, ack }) => {
  const userId = body?.user?.id;
  const teamId = body.user.team_id;

  /* Extract field values */
  const values = (view?.state as CreateNewComponentModalSubmissionState).values;
  const title = values?.component_title_block?.component_title_element.value;
  const short = values?.component_short_block?.component_short_element.value;
  const collection =
    values?.component_collection_block?.component_collection_element.selected_option.value;
  const content = values?.component_content_block?.component_content_element.value;

  /* Acknowledge Slack action */
  ack();

  try {
    /* Create new collection */
    await prisma.component.create({
      data: {
        title,
        type: 'default',
        short,
        isPublished: false,
        collection: {
          connect: {
            id: collection,
          },
        },
        author: {
          connect: {
            id: userId,
          },
        },
        content,
      },
    });

    if (teamId) {
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
    }
  } catch (error) {
    console.error(error);
  }
};

export default create_new_component_submission;
