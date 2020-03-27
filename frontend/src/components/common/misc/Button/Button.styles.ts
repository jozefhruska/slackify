import styled from 'styled-components';
import { width } from 'styled-system';

import { ButtonProps } from './Button';

export const Main = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${({ theme }) => theme.space.s3} ${({ theme }) => theme.space.s4};
  border: none;
  border-radius: ${({ theme }) => theme.radii.small};
  background: ${({ theme, variant }) => (variant ? theme.colors[variant] : theme.colors.gray[6])};
  color: ${({ theme }) => theme.colors.gray[0]};
  overflow: hidden;

  ${width}

  &:hover {
    cursor: pointer;
  }
`;

export const LoadingOverlay = styled.div<Pick<ButtonProps, 'variant'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme, variant }) => (variant ? theme.colors[variant] : theme.colors.gray[8])};
`;
