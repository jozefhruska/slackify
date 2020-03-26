import React, { ReactNode, ButtonHTMLAttributes } from 'react';

import { Box } from '../../layout/base';
import { WidthProps } from 'styled-system';
import theme from '../../../../theme';

import * as S from './Button.styles';

/* Props - <Button />
============================================================================= */
export type ButtonProps = {
  variant?: keyof typeof theme.colors;
  icon?: ReactNode;
  isDisabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  WidthProps;

/* <Button />
============================================================================= */
const Button: React.FunctionComponent<ButtonProps> = ({ icon, isDisabled, children, ...props }) => {
  return (
    <S.Main disabled={isDisabled} {...props}>
      {icon && <Box mr={children ? 's3' : 0}>{icon}</Box>}
      {children}
    </S.Main>
  );
};

/* Default props - <Button />
============================================================================= */
Button.defaultProps = {
  type: 'button',
  isDisabled: false,
};

export default Button;
