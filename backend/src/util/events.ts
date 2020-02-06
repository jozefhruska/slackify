/* eslint-disable @typescript-eslint/camelcase */
import createHttpError from 'http-errors';

import { SlackEventType, SlackAppHomeOpenedEventType } from '../types/events';
import Axios from 'axios';
import { SLACK_BOT_USER_ACCESS_TOKEN } from '../config';
import { Request, Response } from 'express';

export const handleSlackEventType = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const event = request?.body.event as SlackEventType;

  switch (event?.type) {
    case 'app_home_opened': {
      const { tab, user } = event as SlackAppHomeOpenedEventType;

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
                  text: 'A simple stack of blocks for the simple sample Block Kit Home tabsss.',
                },
              },
              {
                type: 'actions',
                elements: [
                  {
                    type: 'button',
                    text: {
                      type: 'plain_text',
                      text: 'Action A',
                      emoji: true,
                    },
                  },
                  {
                    type: 'button',
                    text: {
                      type: 'plain_text',
                      text: 'Action B',
                      emoji: true,
                    },
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
