import { App } from '@slack/bolt';

import { SLACK_SIGNING_SECRET, PORT } from './config';
import { app_home_opened } from './events';
import {
  manage_collections_open,
  create_new_collection_open,
  create_new_component_open,
  app_home_collection_select,
  component_publish,
  component_hide,
  settings_open,
  create_new_component_collection_select,
  collection_overflow,
  update_component_open,
  delete_component,
} from './actions';
import {
  create_new_collection_submission,
  create_new_component_submission,
  update_collection,
  update_component,
} from './view_submissions';
import { prisma } from './prisma';

/* Create a Bolt instance
============================================================================= */
export const app = new App({
  signingSecret: SLACK_SIGNING_SECRET,
  endpoints: {
    events: '/events',
    actions: '/actions',
  },
  authorize: async ({ teamId }) => {
    try {
      /* Get team data */
      const team = await prisma.team.findOne({
        where: {
          id: teamId,
        },
      });

      /* Check if team data were found */
      if (!team) {
        throw new Error('Unable to get team data.');
      }

      return {
        botId: team.botId,
        botToken: team.botToken,
      };
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong. Please try again later.');
    }
  },
});

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
app.action('delete_component', delete_component);
app.action('manage_collections_open', manage_collections_open);
app.action('settings_open', settings_open);
app.action('update_component_open', update_component_open);

/* View submissions
============================================================================= */
app.view('create_new_collection', create_new_collection_submission);
app.view('create_new_component_submission', create_new_component_submission);
app.view('update_collection', update_collection);
app.view('update_component', update_component);

/* Start up
============================================================================= */
(async () => {
  await app.start(PORT || 4000);

  console.log(`[service-slack] ⚡️ Running on http://localhost:${PORT}/.`);
})();
