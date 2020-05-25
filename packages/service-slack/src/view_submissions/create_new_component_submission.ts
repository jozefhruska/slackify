import { SlackViewMiddlewareArgs, ViewSubmitAction, Middleware } from '@slack/bolt';

import { prisma } from '../prisma';
import { compose_app_home_view } from '../views/app_home';
import { app } from '..';
import { User } from '@prisma/client';

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
 * Creates new component and updates the app home view on "create_new_component_submission" view submit action.
 */
const create_new_component_submission: Middleware<SlackViewMiddlewareArgs<
  ViewSubmitAction
>> = async ({ view, body, ack, context }) => {
  try {
    /* Extract user */
    const user = context?.user as User;

    /* Check if user was extracted successfully */
    if (!user) {
      throw new Error('[actions/create_new_component_submission]: Unable to extract user data.');
    }

    /* Extract collection, user and team IDs */
    const collectionId = view?.private_metadata;
    const userId = user.id;
    const teamId = body?.user?.team_id;

    /* Check if user and team IDs are defined */
    if (!collectionId || !userId || !teamId) {
      throw new Error(
        '[view_submission/create_new_component_submission]: Collection, user or team IDs are not defined.'
      );
    }

    /* Find parent collection */
    const collection = await prisma.collection.findOne({
      where: {
        id: collectionId,
      },
      select: {
        id: true,
        type: true,
      },
    });

    /* Check if parent collection was found */
    if (!collection) {
      throw new Error(
        '[view_submission/create_new_component_submission]: Unable to find parent collection.'
      );
    }

    /* Extract field values */
    const values = view?.state.values as SubmissionValues;

    /* Acknowledge Slack action */
    await ack();

    /* Handle creation of different component types */
    switch (collection.type) {
      case 'PLAIN_TEXT': {
        const text = (values as PlainTextSubmissionValues)?.text?.text?.value;

        await prisma.component.create({
          data: {
            type: 'PLAIN_TEXT',
            collection: {
              connect: {
                id: collection.id,
              },
            },
            author: {
              connect: {
                id: userId,
              },
            },
            team: {
              connect: {
                id: teamId,
              },
            },
            plainTextData: {
              create: {
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

        await prisma.component.create({
          data: {
            type: 'ARTICLE',
            collection: {
              connect: {
                id: collection.id,
              },
            },
            author: {
              connect: {
                id: userId,
              },
            },
            team: {
              connect: {
                id: teamId,
              },
            },
            articleData: {
              create: {
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
        const url = (values as LinkSubmissionValues)?.url.url?.value;
        const text = (values as LinkSubmissionValues)?.text.text?.value;

        await prisma.component.create({
          data: {
            type: 'LINK',
            collection: {
              connect: {
                id: collection.id,
              },
            },
            author: {
              connect: {
                id: userId,
              },
            },
            team: {
              connect: {
                id: teamId,
              },
            },
            linkData: {
              create: {
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
    const appHomeView = await compose_app_home_view(teamId, userId, collection.id);

    /* Check if view was successfully composed */
    if (!appHomeView) {
      throw new Error('[view_submission/create_new_component_submission]: Unable to compose view.');
    }

    /* Publish app home view */
    await app.client.views.publish({
      token: context?.botToken,
      user_id: user.slackId,
      view: appHomeView,
    });
  } catch (error) {
    console.error(error);
  }
};

export default create_new_component_submission;
