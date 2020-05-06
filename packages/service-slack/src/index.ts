import { App } from '@slack/bolt';
import { WebClient } from '@slack/web-api';

import { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET, PORT } from './config';
import { app_home_opened } from './events';
import {
  manage_collections_open,
  create_new_collection_open,
  delete_collection,
  create_new_component_open,
  app_home_collection_select,
  component_publish,
  component_hide,
  settings_open,
  create_new_component_collection_select,
  collection_overflow,
} from './actions';
import {
  create_new_collection_submission,
  create_new_component_submission,
  update_collection,
} from './view_submissions';

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
app.action('app_home_collection_select', app_home_collection_select);
app.action('collection_overflow', collection_overflow);
app.action('component_hide', component_hide);
app.action('component_publish', component_publish);
app.action('create_new_collection_open', create_new_collection_open);
app.action('create_new_component_collection_select', create_new_component_collection_select);
app.action('create_new_component_open', create_new_component_open);
app.action('delete_collection', delete_collection);
app.action('manage_collections_open', manage_collections_open);
app.action('settings_open', settings_open);

/* View submissions
============================================================================= */
app.view('create_new_collection', create_new_collection_submission);
app.view('create_new_component_submission', create_new_component_submission);
app.view('update_collection', update_collection);

/* Start up
============================================================================= */
(async () => {
  await app.start(PORT || 4000);

  console.log(`[service-slack] ⚡️ Running on http://localhost:${PORT}/.`);
})();
