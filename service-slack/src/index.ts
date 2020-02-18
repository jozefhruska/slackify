import { App } from '@slack/bolt';
import { WebClient } from '@slack/web-api';

import { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, PORT } from './config';
import { app_home_opened } from './events';
import { manage_categories_open, create_new_category_open } from './actions';

/* Create a Bolt instance
============================================================================= */
export const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  endpoints: {
    events: '/events',
    actions: '/actions',
  },
});

// Re-initialize the WebClient
app.client = new WebClient(process.env.SLACK_BOT_TOKEN);

/* Events
============================================================================= */
app.event('app_home_opened', app_home_opened);

/* Actions
============================================================================= */
app.action('manage_categories_open', manage_categories_open);
app.action('create_new_category_open', create_new_category_open);

/* Start up
============================================================================= */
(async () => {
  // Start your app
  await app.start(PORT || 4000);

  console.log(`[service-slack] ⚡️ Running on port ${PORT}.`);
})();
