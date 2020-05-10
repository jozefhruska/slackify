import { SlackViewMiddlewareArgs, ViewSubmitAction, Middleware } from '@slack/bolt';

import { prisma } from '../prisma';
import { compose_app_home_view } from '../views/app_home';
import { app } from '..';

/* Local types
============================================================================= */
type PlainTextSubmissionValues = {
  text: {
    text: {
      type: 'plain_text_input';
      value: string;
    };
  };
};

type ArticleSubmissionValues = {
  title: {
    title: {
      type: 'plain_text_input';
      value: string;
    };
  };
  lead: {
    lead: {
      type: 'plain_text_input';
      value: string;
    };
  };
  content: {
    content: {
      type: 'plain_text_input';
      value: string;
    };
  };
};

type LinkSubmissionValues = {
  text: {
    text: {
      type: 'plain_text_input';
      value: string;
    };
  };
  url: {
    url: {
      type: 'plain_text_input';
      value: string;
    };
  };
};

type SubmissionValues = PlainTextSubmissionValues | ArticleSubmissionValues | LinkSubmissionValues;

/**
 * Updates component and app home view on "update_component" view submit action.
 */
const update_component: Middleware<SlackViewMiddlewareArgs<ViewSubmitAction>> = async ({
  view,
  body,
  ack,
  context,
}) => {
  try {
    /* Extract required data */
    const componentId = view?.private_metadata;
    const userId = body?.user?.id;
    const teamId = body?.user?.team_id;

    /* Check if extraction of required data was successful */
    if (!componentId || !userId || !teamId) {
      throw new Error('[view_submission/update_component]: Unable to extract required data.');
    }

    /* Extract field values */
    const values = view?.state.values as SubmissionValues;

    /* Acknowledge Slack action */
    await ack();

    /* Get component which should be updated */
    const component = await prisma.component.findOne({
      where: {
        id: componentId,
      },
      select: {
        type: true,
        collection: {
          select: {
            id: true,
          },
        },
      },
    });

    /* Check if component was found */
    if (!component) {
      throw new Error('[view_submission/update_component]: Unable to find component to update.');
    }

    /* Handle update of different component types */
    switch (component.type) {
      case 'PLAIN_TEXT': {
        const text = (values as PlainTextSubmissionValues)?.text?.text?.value;

        await prisma.component.update({
          where: {
            id: componentId,
          },
          data: {
            plainTextData: {
              update: {
                text,
              },
            },
          },
        });

        break;
      }

      case 'ARTICLE': {
        const title = (values as ArticleSubmissionValues)?.title?.title?.value;
        const lead = (values as ArticleSubmissionValues)?.lead?.lead?.value;
        const content = (values as ArticleSubmissionValues)?.content?.content?.value;

        await prisma.component.update({
          where: {
            id: componentId,
          },
          data: {
            articleData: {
              update: {
                title,
                lead,
                content,
              },
            },
          },
        });

        break;
      }

      case 'LINK': {
        const url = (values as LinkSubmissionValues)?.url?.url?.value;
        const text = (values as LinkSubmissionValues)?.text?.text?.value;

        await prisma.component.update({
          where: {
            id: componentId,
          },
          data: {
            linkData: {
              update: {
                url,
                text,
              },
            },
          },
        });

        break;
      }
    }

    /* Compose app home view */
    const appHomeView = await compose_app_home_view(teamId, userId, component.collection.id);

    /* Check if view was successfully composed */
    if (!appHomeView) {
      throw new Error('[view_submission/update_component]: Unable to compose view.');
    }

    /* Publish app home view */
    await app.client.views.publish({
      token: context?.botToken,
      user_id: userId,
      view: appHomeView,
    });
  } catch (error) {
    console.error(error);
  }
};

export default update_component;
