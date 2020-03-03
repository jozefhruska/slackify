import { SlackViewMiddlewareArgs, ViewSubmitAction, Middleware } from '@slack/bolt';
import { prisma } from '../prisma';
import { PlainTextElement } from '@slack/web-api';
import { compose_app_home_view } from '../utils/views';
import { app } from '..';

/* Local types
============================================================================= */
type CreateNewPostModalSubmissionState = {
  values: {
    post_title_block: {
      post_title_element: {
        type: 'plain_text_input';
        value: string;
      };
    };
    post_short_block: {
      post_short_element: {
        type: 'plain_text_input';
        value: string;
      };
    };
    post_category_block: {
      post_category_element: {
        type: 'static_select';
        selected_option: {
          text: PlainTextElement;
          value: string;
        };
      };
    };
    post_content_block: {
      post_content_element: {
        type: 'plain_text_input';
        value: string;
      };
    };
  };
};

/**
 * Handles the submission event of create new post modal.
 */
const create_new_post_submission: Middleware<SlackViewMiddlewareArgs<ViewSubmitAction>> = async ({
  view,
  body,
  ack,
}) => {
  const userId = body?.user?.id;
  const teamId = body.user.team_id;

  /* Extract field values */
  const values = (view?.state as CreateNewPostModalSubmissionState).values;
  const title = values?.post_title_block?.post_title_element.value;
  const short = values?.post_short_block?.post_short_element.value;
  const category = values?.post_category_block?.post_category_element.selected_option.value;
  const content = values?.post_content_block?.post_content_element.value;

  /* Acknowledge Slack action */
  ack();

  try {
    /* Create new category */
    await prisma.post.create({
      data: {
        title,
        type: 'default',
        short,
        isPublished: true,
        category: {
          connect: {
            id: category,
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

export default create_new_post_submission;
