import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

/* Custom configuration
============================================================================= */
addons.setConfig({
  theme: create({
    base: 'dark',

    brandTitle: 'Slackify',
  }),
});
