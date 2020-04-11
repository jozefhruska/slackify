import {
  SpaceProps,
  TypographyProps,
  ColorProps,
  space,
  typography,
  color,
  compose,
} from 'styled-system';
import styled from 'styled-components';

/* <Heading />
============================================================================= */
const Heading = styled.h1<SpaceProps & TypographyProps & ColorProps>(
  compose(color, space, typography)
);

/* Default props - <Heading />
============================================================================= */
Heading.defaultProps = {
  mt: 0,
  mb: 's4',
  color: 'gray.0',
  letterSpacing: 1.2,
  fontWeight: 700,
};

export default Heading;
