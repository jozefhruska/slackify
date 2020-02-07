/* Events
============================================================================= */
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

/* Event types
============================================================================= */
export type SlackAppHomeOpenedEvent = {
  type: 'app_home_opened';
  user: string;
  channel: string;
  tab: 'home' | 'messages';
};

export type SlackEvent = SlackAppHomeOpenedEvent;

export type SlackEventRequestBody =
  | SlackURLVerificationEventRequestBody
  | SlackEventCallbackRequestBody;

export type SlackHTTPHeaders = {
  'x-slack-signature': string;
  'x-slack-request-timestamp': string;
};
