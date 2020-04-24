import React, { ReactNode, ButtonHTMLAttributes } from 'react';

import { Box, Flex } from '../../layout/base';
import { WidthProps } from 'styled-system';
import theme from '../../../../theme';
import { ButtonLoader } from '..';

import * as S from './Button.styles';

/* Props - <Button />
============================================================================= */
export type ButtonProps = {
  variant?: keyof typeof theme.colors;
  icon?: ReactNode;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement> &
  WidthProps;

/* <Button />
============================================================================= */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, icon, disabled, isLoading, children, ...props }, ref) => {
    return (
      <S.Main ref={ref} variant={variant} disabled={disabled || isLoading} {...props}>
        {isLoading && (
          <S.LoadingOverlay variant={variant}>
            <ButtonLoader />
          </S.LoadingOverlay>
        )}

        <Flex alignItems="center" position="relative" zIndex={1}>
          {icon && <Box mr={children ? 's3' : 0}>{icon}</Box>}
          {children}
        </Flex>

        <S.HoverOverlay />
      </S.Main>
    );
  }
);

/* Default props - <Button />
============================================================================= */
Button.displayName = 'Button';
Button.defaultProps = {
  type: 'button',
  disabled: false,
  isLoading: false,
};

export default Button;
