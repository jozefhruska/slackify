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

/* <Paragraph />
============================================================================= */
const Paragraph = styled.p<SpaceProps & TypographyProps & ColorProps>(
  compose(
    color,
    space,
    typography,
  ),
);

/* Default props - <Paragraph />
============================================================================= */
Paragraph.defaultProps = {
  mt: 0,
  mb: 's6',
  fontSize: '16px',
};

export default Paragraph;
