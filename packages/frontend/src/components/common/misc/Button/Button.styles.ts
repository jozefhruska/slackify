import styled, { css } from 'styled-components';
import { width } from 'styled-system';

import { ButtonProps } from './Button';

export const HoverOverlay = styled.div<Pick<ButtonProps, 'variant'>>`
  transition: opacity 0.2s ease-out;
  position: absolute;
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.gray[10] + '33'};
`;

export const LoadingOverlay = styled.div<Pick<ButtonProps, 'variant'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme, variant }) => (variant ? theme.colors[variant] : theme.colors.gray[6])};
`;

export const Main = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 44px;
  padding: ${({ theme }) => theme.space.s3} ${({ theme }) => theme.space.s4};
  border: none;
  border-radius: ${({ theme }) => theme.radii.medium};
  background: ${({ theme, variant }) => (variant ? theme.colors[variant] : theme.colors.gray[6])};
  color: ${({ theme }) => theme.colors.gray[0]};
  overflow: hidden;
  cursor: pointer;

  ${width}

  ${({ disabled }) =>
    disabled &&
    css`
      cursor: not-allowed;
      ${HoverOverlay} {
        opacity: 1;
      }
    `};

  &:focus,
  &:hover {
    outline: none;

    ${HoverOverlay} {
      opacity: 1;
    }
  }
`;
