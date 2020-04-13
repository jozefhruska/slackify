import styled from 'styled-components';
import { GridProps, grid, flexbox, FlexboxProps, compose } from 'styled-system';

import { Box, BoxProps } from '..';

/* <Grid />
============================================================================= */
const Grid = styled(Box)<BoxProps & GridProps & FlexboxProps>(compose(grid, flexbox));

/* Default props - <Grid />
============================================================================= */
Grid.defaultProps = {
  display: 'grid',
};

export default Grid;
