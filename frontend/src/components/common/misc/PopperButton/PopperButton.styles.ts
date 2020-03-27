import styled, { css } from 'styled-components';
import { PopperProps } from 'react-popper';

const resolvePopperWrapperStyles = (placement: PopperProps['placement']) => {
  switch (placement) {
    case 'left': {
      return css`
        margin-right: ${({ theme }) => theme.space.s4};
      `;
    }

    case 'right': {
      return css`
        margin-left: ${({ theme }) => theme.space.s4};
      `;
    }

    case 'bottom': {
      return css`
        margin-top: ${({ theme }) => theme.space.s4};
      `;
    }

    default:
    case 'top': {
      return css`
        margin-bottom: ${({ theme }) => theme.space.s4};
      `;
    }
  }
};

export const PopperWrapper = styled.div<{ 'data-placement': PopperProps['placement'] }>`
  display: grid;
  grid-gap: ${({ theme }) => theme.space.s3};

  ${props => resolvePopperWrapperStyles(props?.['data-placement'])};
`;
