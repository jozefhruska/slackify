import { App } from '@slack/bolt';
import { WebClient } from '@slack/web-api';

import { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, PORT } from './config';
import { app_home_opened } from './events';
import {
  manage_categories_open,
  create_new_category_open,
  delete_category,
  create_new_post_open,
  app_home_category_select,
} from './actions';
import { create_new_category_submission, create_new_post_submission } from './view_submissions';

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
app.action('create_new_post_open', create_new_post_open);
app.action('delete_category', delete_category);
app.action('app_home_category_select', app_home_category_select);

/* View submissions
============================================================================= */
app.view('create_new_category_modal', create_new_category_submission);
app.view('create_new_post_modal', create_new_post_submission);

/* Start up
============================================================================= */
(async () => {
  await app.start(PORT || 4000);

  console.log(`[service-slack] ⚡️ Running on http://localhost:${PORT}/.`);
})();
