import React, { SelectHTMLAttributes } from 'react';

import * as S from './Select.styles';
import { FiChevronDown } from 'react-icons/fi';

/* Props - <Select />
============================================================================= */
type Props = SelectHTMLAttributes<HTMLSelectElement>;

/* <Select />
============================================================================= */
const Select: React.FC<Props> = ({ children, ...props }) => {
  return (
    <S.Wrapper>
      <S.Select {...props}>{children}</S.Select>

      <S.IconWrapper>
        <FiChevronDown />
      </S.IconWrapper>
    </S.Wrapper>
  );
};

export default Select;
