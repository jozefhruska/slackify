import React from 'react';
import { Flex } from '../base';
import { Heading } from '../../typography';

/* Props - <PageSubHeader />
============================================================================= */
type Props = {
  heading: string;
};

/* <PageSubHeader />
============================================================================= */
const PageSubHeader: React.FC<Props> = ({ heading, children }) => {
  return (
    <Flex alignItems="center" justifyContent="space-between" mb="s6">
      <Heading as="h2" mb={0}>
        {heading}
      </Heading>

      <Flex alignItems="center" justifyContent="space-between">
        {children}
      </Flex>
    </Flex>
  );
};

export default PageSubHeader;
