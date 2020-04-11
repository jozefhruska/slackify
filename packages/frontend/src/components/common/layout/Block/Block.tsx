import React from 'react';

import * as S from './Block.styles';
import { Heading } from '../../typography';

/* Props - <Block />
============================================================================= */
type Props = {
  title?: string;
  isPadded?: boolean;
};

/* <Block />
============================================================================= */
const Block: React.FunctionComponent<Props> = ({ title, isPadded, children }) => {
  return (
    <S.Wrapper>
      {!!title && (
        <S.TitleBar>
          <Heading as="h2" mb={0}>
            {title}
          </Heading>
        </S.TitleBar>
      )}

      <S.Content isPadded={isPadded}>{children}</S.Content>
    </S.Wrapper>
  );
};

/* Default props - <Block />
============================================================================= */
Block.defaultProps = {
  isPadded: true,
};

export default Block;
