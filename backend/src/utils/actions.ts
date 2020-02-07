/* eslint-disable @typescript-eslint/camelcase */
import Axios from 'axios';
import QueryString = require('qs');
import { SlackActionRequestBody } from '../types/actions';
import { SLACK_BOT_USER_ACCESS_TOKEN } from '../config';

export const openCategoriesModal = async (
  triggerId: SlackActionRequestBody['trigger_id']
): Promise<void> => {
  const modal = {
    type: 'modal',
    title: {
      type: 'plain_text',
      text: 'Categories',
      emoji: true,
    },
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: 'Demo category name',
        },
        accessory: {
          type: 'button',
          text: {
            type: 'plain_text',
            text: 'Delete',
            emoji: false,
          },
          style: 'danger',
          value: 'click_me_123',
        },
      },
    ],
  };

  const args = {
    token: SLACK_BOT_USER_ACCESS_TOKEN,
    trigger_id: triggerId,
    view: JSON.stringify(modal),
  };

  await Axios.post('https://slack.com/api/views.open', QueryString.stringify(args)).then(response =>
    console.log(response)
  );
};
