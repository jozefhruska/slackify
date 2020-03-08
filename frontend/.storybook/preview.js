import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withThemesProvider } from 'themeprovider-storybook';
import { setConfig } from 'next/config';

import theme from '../src/theme';
import { GlobalStyles } from '../src/styles';

/* Global decorators
============================================================================= */
addDecorator(story => (
  <>
    <GlobalStyles />
    {story()}
  </>
));
addDecorator(withThemesProvider([{ name: 'Default', ...theme }]));
addDecorator(withKnobs);

/* Mocked Next.js config
============================================================================= */
const { API_URL } = process.env;

setConfig({
  publicRuntimeConfig: {
    API_URL,
  },
});

/* Custom parameters
============================================================================= */
addParameters({
  options: {
    showRoots: true,
  },
});
