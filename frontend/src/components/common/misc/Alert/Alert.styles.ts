import styled, { css } from 'styled-components';

import { AlertProps } from './Alert';
import { margin } from 'styled-system';

const getTypeColor = ({ type }: AlertProps) => {
  switch (type) {
    case 'success':
      return css`
        background: ${({ theme }) => theme.colors.brand};
      `;
    case 'danger':
      return css`
        background: ${({ theme }) => theme.colors.danger};
      `;
    case 'warning':
      return css`
        background: ${({ theme }) => theme.colors.warning};
      `;
    case 'info':
    default:
      return css`
        background: ${({ theme }) => theme.colors.info};
      `;
  }
};

export const Wrapper = styled.div<Pick<AlertProps, 'type'>>`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.space.s4} ${({ theme }) => theme.space.s6};
  background: ${({ theme }) => theme.colors.gray[0]};
  color: ${({ theme }) => theme.colors.gray[1]};
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;

  ${getTypeColor}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
  }

  ${margin}
`;

export const Icon = styled.div<Pick<AlertProps, 'type'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  min-width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${getTypeColor};
  color: ${({ theme }) => theme.colors.gray[0]};
`;
