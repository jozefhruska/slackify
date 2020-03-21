import { SlackViewMiddlewareArgs, ViewSubmitAction, Middleware } from '@slack/bolt';
import { Collection } from '@prisma/client';

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
 * Handles the submission event of 'create new component' modal.
 */
const create_new_component_submission: Middleware<SlackViewMiddlewareArgs<
  ViewSubmitAction
>> = async ({ view, body, ack }) => {
  const userId = body?.user?.id;
  const teamId = body.user.team_id;

  /* Find parent collection */
  const collectionId = view.private_metadata;
  const collection = await prisma.collection.findOne({
    where: {
      id: collectionId,
    },
  });

  /* Extract field values */
  const values = view?.state.values as SubmissionValues;

  /* Acknowledge Slack action */
  ack();

  if (collection) {
    /* Handle different component types */
    switch (collection.type) {
      case 'PLAIN_TEXT': {
        const text = (values as PlainTextSubmissionValues)?.text?.text?.value;

        if (text) {
          try {
            await prisma.component.create({
              data: {
                type: 'PLAIN_TEXT',
                collection: {
                  connect: {
                    id: collectionId,
                  },
                },
                author: {
                  connect: {
                    id: userId,
                  },
                },
                plainTextData: {
                  create: {
                    text,
                  },
                },
              },
            });
          } catch (error) {
            console.error(error);
          }
        }

        break;
      }

      case 'ARTICLE': {
        const title = (values as ArticleSubmissionValues)?.title?.title?.value;
        const lead = (values as ArticleSubmissionValues)?.lead?.lead?.value;
        const content = (values as ArticleSubmissionValues)?.content?.content?.value;

        if (title && content) {
          try {
            await prisma.component.create({
              data: {
                type: 'ARTICLE',
                collection: {
                  connect: {
                    id: collectionId,
                  },
                },
                author: {
                  connect: {
                    id: userId,
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
          } catch (error) {
            console.error(error);
          }
        }

        break;
      }

      case 'LINK': {
        const url = (values as LinkSubmissionValues)?.url.url?.value;
        const text = (values as LinkSubmissionValues)?.text.text?.value;

        if (url) {
          try {
            await prisma.component.create({
              data: {
                type: 'LINK',
                collection: {
                  connect: {
                    id: collectionId,
                  },
                },
                author: {
                  connect: {
                    id: userId,
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
          } catch (error) {
            console.error(error);
          }
        }

        break;
      }
    }
  }

  try {
    /* Update app home view */
    if (teamId) {
      const view = await compose_app_home_view(teamId, collectionId);

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

export default create_new_component_submission;
