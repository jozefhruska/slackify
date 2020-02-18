import { SlackViewMiddlewareArgs, ViewSubmitAction, Middleware } from '@slack/bolt';
import { CreateNewCategoryModalSubmissionValues } from '../types/view_submissions';
import { prisma } from '../prisma';

/* Local types
============================================================================= */
type CreateNewCategoryModalSubmissionState = {
  values: {
    category_handle_block: {
      category_handle_input: {
        type: 'plain_text_input';
        value: string;
      };
    };
  };
};

/**
 * Handles the submission event of create new category modal.
 */
const createNewCategoryModalSubmission: Middleware<SlackViewMiddlewareArgs<
  ViewSubmitAction
>> = async ({ view, body, ack }) => {
  const teamId = body?.user?.team_id;

  /* Extract field values */
  const values = (view?.state as CreateNewCategoryModalSubmissionState).values;
  const categoryHandle = values?.category_handle_block?.category_handle_input.value;

  /* Check if category handle is in correct format */
  if (!categoryHandle.match(/^([a-z]|-|_)*$/)) {
    ack({
      response_action: 'errors',
      errors: {
        category_handle_block:
          "Category handle must contain only lowercase characters, '_' (underscore) and '–' (dash).",
      },
    });

    return;
  }

  /* Check if there is a category with the same handle amd team ID */
  try {
    const categories = await prisma.category.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
    });

    if (categories.length) {
      ack({
        response_action: 'errors',
        errors: {
          category_handle_block: 'Category with this handle already exists in your workspace.',
        },
      });

      return;
    }
  } catch (error) {
    console.error(error);
  }

  /* Acknowledge Slack action */
  ack();

  /* Create new category */
  try {
    await prisma.category.create({
      data: {
        handle: categoryHandle,
        team: {
          connect: {
            id: teamId,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default createNewCategoryModalSubmission;
