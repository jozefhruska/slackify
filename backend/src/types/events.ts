/* Events
============================================================================= */
export type SlackURLVerificationEvent = {
  type: 'url_verification';
  token: string;
  challenge: string;
};

export type SlackEventCallbackEvent = {
  token: string;
  team_id: string;
  api_app_id: string;
  event: SlackEventType;
  type: 'event_callback';
  event_id: string;
  event_time: number;
};

/* Event types
============================================================================= */
export type SlackAppHomeOpenedEventType = {
  type: 'app_home_opened';
  user: string;
  channel: string;
  tab: 'home' | 'messages';
};

export type SlackEventType = SlackAppHomeOpenedEventType;

export type SlackEvent = SlackURLVerificationEvent | SlackEventCallbackEvent;

export type SlackHTTPHeaders = {
  'x-slack-signature': string;
  'x-slack-request-timestamp': string;
};
