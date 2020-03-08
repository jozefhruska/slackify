import React, { ReactNode, ButtonHTMLAttributes } from 'react';

import { Box } from '../../layout/base';

import * as S from './Button.styles';

/* Props - <Button />
============================================================================= */
export type ButtonProps = {
  variant?: 'info' | 'success' | 'danger' | 'warning';
  icon?: ReactNode;
  isDisabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

/* <Button />
============================================================================= */
const Button: React.FunctionComponent<ButtonProps> = ({ icon, isDisabled, children, ...props }) => {
  return (
    <S.Main disabled={isDisabled} {...props}>
      {icon && <Box mr={children ? 's2' : 0}>{icon}</Box>}
      {children}

      <S.Overlay />
    </S.Main>
  );
};

/* Default props - <Button />
============================================================================= */
Button.defaultProps = {
  isDisabled: false,
};

export default Button;
