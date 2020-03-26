import styled from 'styled-components';
import { GridProps, grid, flexbox, FlexboxProps } from 'styled-system';

import { Box, BoxProps } from '..';

/* <Grid />
============================================================================= */
const Grid = styled(Box)<BoxProps & GridProps & FlexboxProps>`
  display: grid;

  ${flexbox}
  ${grid}
`;

export default Grid;
