import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { FiLogOut } from 'react-icons/fi';

import Button from './Button';
import { Box } from '../../layout/base';

export default {
  component: Button,
  title: 'Common/Miscellaneous/Button',
};

export const normal = () => (
  <Box p="s6">
    <Button disabled={boolean('disabled', false)}>{text('children', 'Button')}</Button>
  </Box>
);

export const icon = () => (
  <Box p="s6">
    <Button icon={<FiLogOut />} disabled={boolean('disabled', false)}>
      {text('children', 'Button')}
    </Button>
  </Box>
);
