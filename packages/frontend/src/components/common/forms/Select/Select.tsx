import React, { SelectHTMLAttributes } from 'react';
import { FiChevronDown } from 'react-icons/fi';

import * as S from './Select.styles';
import { SelectLoader } from '../../misc';

/* Props - <Select />
============================================================================= */
type Props = {
  isLoading?: boolean;
} & SelectHTMLAttributes<HTMLSelectElement>;

/* <Select />
============================================================================= */
const Select: React.FC<Props> = ({ disabled, isLoading, children, ...props }) => {
  return (
    <S.Wrapper>
      <S.Select disabled={disabled} {...props}>
        {children}
      </S.Select>

      <S.LoadingWrapper isLoading={isLoading}>
        <SelectLoader />
      </S.LoadingWrapper>

      <S.IconWrapper disabled={disabled}>
        <FiChevronDown />
      </S.IconWrapper>
    </S.Wrapper>
  );
};

export default Select;
