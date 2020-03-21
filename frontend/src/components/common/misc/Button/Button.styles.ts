import styled, { css } from 'styled-components';
import { width } from 'styled-system';

import { ButtonProps } from './Button';

export const Overlay = styled.div`
  transition: opacity 0.2s ease-out;
  display: block;
  position: absolute;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.base[60]};
  pointer-events: none;
  opacity: 0;
`;

export const Main = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: ${({ theme }) => theme.space.s3};
  border: none;
  border-radius: ${({ theme }) => theme.radii.small};
  color: ${({ theme }) => theme.colors.base[10]};
  overflow: hidden;

  ${width}

  :disabled {
    ${Overlay} {
      opacity: 0.25;
    }

    svg {
      opacity: 0.6;
    }

    :focus,
    :hover {
      cursor: not-allowed;

      ${Overlay} {
        opacity: 0.25;
      }
    }
  }

  :focus,
  :hover {
    cursor: pointer;
    outline: none;

    ${Overlay} {
      opacity: 0.15;
    }
  }

  svg {
    position: relative;
    z-index: 10;
    pointer-events: none;
  }

  ${({ variant, theme }) => {
    switch (variant) {
      case 'info': {
        return css`
          background: ${theme.colors.info};
          box-shadow: ${theme.shadows.box.medium(theme.colors.info)};
        `;
      }

      case 'success': {
        return css`
          background: ${theme.colors.success};
          box-shadow: ${theme.shadows.box.medium(theme.colors.success)};
        `;
      }

      case 'danger': {
        return css`
          background: ${theme.colors.danger};
          box-shadow: ${theme.shadows.box.medium(theme.colors.danger)};
        `;
      }

      case 'warning': {
        return css`
          background: ${theme.colors.warning};
          box-shadow: ${theme.shadows.box.medium(theme.colors.warning)};
        `;
      }

      default: {
        return css`
          background: ${theme.colors.base[30]};
          box-shadow: ${theme.shadows.box.medium()};
        `;
      }
    }
  }};
`;
