import React from 'react';
import { select, text, boolean } from '@storybook/addon-knobs';
import { FiLogOut } from 'react-icons/fi';

import Button from './Button';
import { Box } from '../../layout/base';

const variantOptions = {
  Info: 'info',
  Success: 'success',
  Danger: 'danger',
  Warning: 'warning',
  None: undefined,
};

export default {
  component: Button,
  title: 'Common/Miscellaneous/Button',
};

export const normal = () => (
  <Box p="s6">
    <Button
      variant={select<any>('variant', variantOptions, 'info')}
      disabled={boolean('disabled', false)}
    >
      {text('children', 'Button')}
    </Button>
  </Box>
);

export const icon = () => (
  <Box p="s6">
    <Button
      icon={<FiLogOut />}
      variant={select<any>('variant', variantOptions, 'info')}
      disabled={boolean('disabled', false)}
    >
      {text('children', 'Button')}
    </Button>
  </Box>
);
