import { SlackEvent } from '@slack/bolt';

export type SlackURLVerificationEventRequestBody = {
  type: 'url_verification';
  token: string;
  challenge: string;
};

export type SlackEventCallbackRequestBody = {
  token: string;
  team_id: string;
  api_app_id: string;
  event: SlackEvent;
  type: 'event_callback';
  event_id: string;
  event_time: number;
};

export type SlackEventRequestBody =
  | SlackURLVerificationEventRequestBody
  | SlackEventCallbackRequestBody;

export type SlackHTTPHeaders = {
  'x-slack-signature': string;
  'x-slack-request-timestamp': string;
};
