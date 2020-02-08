/* eslint-disable @typescript-eslint/camelcase */
import Axios from 'axios';

import { SLACK_BOT_ACCESS_TOKEN } from '../config';
import { SlackUser } from '../types/auth';

/**
 * Updates Slack app's home tab for a specific user.
 * @param userId ID of user whose home tab is to be updated
 */
export const updateHomeTab = (userId: SlackUser['id']) =>
  Axios.post<void>(
    'https://slack.com/api/views.publish',
    {
      user_id: userId,
      view: {
        type: 'home',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: "*Here's what you can do with Slackify:*",
            },
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '✏️ \tCreate new post',
                  emoji: true,
                },
                style: 'primary',
                value: 'create_post',
              },
              {
                type: 'button',
                action_id: 'create_new_category',
                text: {
                  type: 'plain_text',
                  text: '📂 \tCreate new category',
                  emoji: true,
                },
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '❓\tHelp',
                  emoji: true,
                },
                value: 'help',
              },
            ],
          },
          {
            type: 'context',
            elements: [
              {
                type: 'image',
                image_url: 'https://api.slack.com/img/blocks/bkb_template_images/placeholder.png',
                alt_text: 'placeholder',
              },
            ],
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: '*Posts in your workspace*',
            },
            accessory: {
              type: 'static_select',
              placeholder: {
                type: 'plain_text',
                text: 'Select a category',
                emoji: true,
              },
              options: [
                {
                  text: {
                    type: 'plain_text',
                    text: 'Demo category 1',
                    emoji: true,
                  },
                  value: 'value-0',
                },
                {
                  text: {
                    type: 'plain_text',
                    text: 'Demo category 2',
                    emoji: true,
                  },
                  value: 'value-1',
                },
              ],
            },
          },
          {
            type: 'divider',
          },

          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text:
                '*Demo post title* \n Aliquam cursus nibh sed justo faucibus ultrices. Quisque vitae bibendum metus. Vivamus tincidunt elementum erat, nec gravida erat posuere in.',
            },
          },

          {
            type: 'context',
            elements: [
              {
                type: 'mrkdwn',
                text: 'Submitted by',
              },
              {
                type: 'image',
                image_url: 'https://api.slack.com/img/blocks/bkb_template_images/profile_3.png',
                alt_text: 'Dwight Schrute',
              },
              {
                type: 'mrkdwn',
                text: '*Dwight Schrute*',
              },
            ],
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '👍 \tApprove',
                  emoji: true,
                },
                style: 'primary',
                value: 'approve',
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '👎 \tDecline',
                  emoji: true,
                },
                style: 'danger',
                value: 'decline',
              },
              {
                type: 'button',
                text: {
                  type: 'plain_text',
                  text: '👀 \tView',
                  emoji: true,
                },
                value: 'details',
              },
            ],
          },
        ],
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${SLACK_BOT_ACCESS_TOKEN}`,
      },
    }
  );
