import React, { SelectHTMLAttributes } from 'react';

import * as S from './Select.styles';
import { FiChevronDown } from 'react-icons/fi';

/* Props - <Select />
============================================================================= */
type Props = SelectHTMLAttributes<HTMLSelectElement>;

/* <Select />
============================================================================= */
const Select: React.FC<Props> = ({ disabled, children, ...props }) => {
  return (
    <S.Wrapper>
      <S.Select disabled={disabled} {...props}>
        {children}
      </S.Select>

      <S.IconWrapper disabled={disabled}>
        <FiChevronDown />
      </S.IconWrapper>
    </S.Wrapper>
  );
};

export default Select;
