import { SlackViewMiddlewareArgs, ViewSubmitAction, Middleware } from '@slack/bolt';
import { prisma } from '../prisma';

/* Local types
============================================================================= */
type CreateNewCategoryModalSubmissionState = {
  values: {
    category_handle_block: {
      category_handle_element: {
        type: 'plain_text_input';
        value: string;
      };
    };
  };
};

/**
 * Handles the submission event of create new category modal.
 */
const create_new_category_submission: Middleware<SlackViewMiddlewareArgs<
  ViewSubmitAction
>> = async ({ view, body, ack }) => {
  const teamId = body?.user?.team_id;

  /* Extract field values */
  const values = (view?.state as CreateNewCategoryModalSubmissionState).values;
  const categoryHandle = values?.category_handle_block?.category_handle_element.value;

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
    const teamCategories = await prisma.category.findMany({
      where: {
        team: {
          id: teamId,
        },
      },
    });

    const duplicateCategory = teamCategories.find(({ handle }) => handle === categoryHandle);

    if (duplicateCategory) {
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

export default create_new_category_submission;
