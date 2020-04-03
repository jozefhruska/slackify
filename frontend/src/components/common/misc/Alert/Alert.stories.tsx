import React from 'react';

import { Box } from '../../layout/base';
import Alert from './Alert';

export default {
  component: Alert,
  title: 'Common/Miscellaneous/Alert',
};

export const normal = () => (
  <Box maxWidth="600px" p="s6">
    <Alert type="danger">Content</Alert>
  </Box>
);
