import React from 'react';
import { boolean, text } from '@storybook/addon-knobs';

import Block from './Block';
import { Box } from '../base';

export default {
  component: Block,
  title: 'Common/Layout/Block',
};

export const normal = () => (
  <Box maxWidth="400px" p="s6">
    <Block title={text('title', 'Title')} isPadded={boolean('isPadded', true)}>
      {text('Content', 'Text')}
    </Block>
  </Box>
);
