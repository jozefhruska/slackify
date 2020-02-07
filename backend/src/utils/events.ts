/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response } from 'express';
import createHttpError from 'http-errors';
import Axios from 'axios';

import { SlackEventType, SlackAppHomeOpenedEventType } from '../types/events';
import { SLACK_BOT_USER_ACCESS_TOKEN } from '../config';

export const handleSlackEventType = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const event = request?.body.event as SlackEventType;

  switch (event?.type) {
    case 'app_home_opened': {
      const { user } = event as SlackAppHomeOpenedEventType;

      await Axios.post(
        'https://slack.com/api/views.publish',
        {
          user_id: user,
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
                    text: {
                      type: 'plain_text',
                      text: '📂 \tCreate new category',
                      emoji: true,
                    },
                    value: 'create_category',
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
                    image_url:
                      'https://api.slack.com/img/blocks/bkb_template_images/placeholder.png',
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
            Authorization: `Bearer ${SLACK_BOT_USER_ACCESS_TOKEN}`,
          },
        }
      );

      /* Confirm Slack event */
      return response.sendStatus(200);
    }

    default: {
      throw createHttpError(500, 'Unknown event type.');
    }
  }
};
