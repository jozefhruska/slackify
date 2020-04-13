import React from 'react';
// import { action } from '@storybook/addon-actions';
import { text } from '@storybook/addon-knobs';
// import { FiEdit, FiPlus } from 'react-icons/fi';

import PageHeader from './PageHeader';
import { Box } from '../base';

export default {
  component: PageHeader,
  title: 'Common/Layout/PageHeader',
};

export const normal = () => (
  <Box p="s6">
    <PageHeader
      heading={text('heading', 'Component')}
      breadcrumbs={[
        {
          text: 'Components',
          link: {
            href: '/',
          },
        },
        {
          text: 'Component',
        },
      ]}
      // primaryButton={{
      //   text: 'Create new component',
      //   icon: <FiPlus />,
      //   onClick: action('Primary button click'),
      // }}
      // secondaryButton={{
      //   text: 'Edit component',
      //   icon: <FiEdit />,
      //   onClick: action('Secondary button click'),
      // }}
    />
  </Box>
);
