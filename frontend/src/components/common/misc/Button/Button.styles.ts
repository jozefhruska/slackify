import styled from 'styled-components';
import { width } from 'styled-system';

import { ButtonProps } from './Button';

export const Main = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${({ theme }) => theme.space.s4} ${({ theme }) => theme.space.s5};
  border: none;
  border-radius: ${({ theme }) => theme.radii.small};
  background: ${({ theme, variant }) => (variant ? theme.colors[variant] : theme.colors.gray[8])};
  color: ${({ theme }) => theme.colors.gray[0]};

  ${width}

  &:hover {
    cursor: pointer;
  }
`;
