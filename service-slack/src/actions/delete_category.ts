import { Middleware, SlackActionMiddlewareArgs, BlockButtonAction } from '@slack/bolt';
import { prisma } from '../prisma';

const delete_category: Middleware<SlackActionMiddlewareArgs<BlockButtonAction>> = async ({
  action,
  ack,
}) => {
  const categoryId = action?.value;

  /* Check if category ID is defined */
  if (categoryId == undefined) {
    console.error('[delete_category] - Category ID is undefined.');
    return;
  }

  /* Acknowledge Slack action */
  ack();

  /* Delete category */
  try {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default delete_category;
