import styled from 'styled-components';
import { FlexboxProps, flexbox } from 'styled-system';

import { Box, BoxProps } from '..';

/* <Flex />
============================================================================= */
const Flex = styled(Box)<BoxProps & FlexboxProps>(flexbox);

/* Default props - <Flex />
============================================================================= */
Flex.defaultProps = {
  display: 'flex',
};

export default Flex;
